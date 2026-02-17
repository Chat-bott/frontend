import { extractPageContent } from "../utils/contentExtractor";
import { scrollToSection, scrollPage, fillInput } from "../utils/coBrowsingActions";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

// ✅ Robust multi-field parser (no greedy capture)
// Supports: name, email, message, search
const parseFill = (text) => {
  const t = String(text || "").trim();
  if (!t) return [];

  const out = [];

  // 1) Pattern: "fill name as Ved fill email as ved@gmail.com fill search as react"
  // Also supports: add/set + optional "field" + separators.
  const re =
    /\b(?:fill|add|set)\s+(name|email|message|search)\s*(?:field)?\s*(?:as|to|=)?\s*/gi;

  const hits = [];
  let m;

  while ((m = re.exec(t)) !== null) {
    hits.push({
      field: String(m[1] || "").toLowerCase(),
      matchIndex: m.index, // where this "fill <field>" starts
      valueStart: re.lastIndex, // where the value starts
    });
  }

  for (let i = 0; i < hits.length; i++) {
    const start = hits[i].valueStart;
    const end = i + 1 < hits.length ? hits[i + 1].matchIndex : t.length;

    let value = t.slice(start, end).trim();

    // clean separators like "," ":" "-"
    value = value.replace(/^[,:-]\s*/, "");
    value = value.replace(/[,\s]+$/, "");

    if (value) out.push({ field: hits[i].field, value });
  }

  // 2) Pattern: "fill contact form: name=Ved, email=..., message=..."
  // Also allow "fill form:" etc.
  if (/\bfill\s+(?:contact\s+)?form\b/i.test(t)) {
    const n = t.match(/\bname\s*=\s*([^,]+)/i);
    const e = t.match(/\bemail\s*=\s*([^,]+)/i);
    const msg = t.match(/\bmessage\s*=\s*([\s\S]+)/i);
    const s = t.match(/\bsearch\s*=\s*([^,]+)/i);

    if (n?.[1]) out.push({ field: "name", value: n[1].trim() });
    if (e?.[1]) out.push({ field: "email", value: e[1].trim() });
    if (msg?.[1]) out.push({ field: "message", value: msg[1].trim() });
    if (s?.[1]) out.push({ field: "search", value: s[1].trim() });
  }

  // 3) Pattern: "add my name Neeraj to name field ..."
  const addMyName = t.match(/\badd\s+my\s+name\s+(.+?)\s+to\s+name\b/i);
  if (addMyName?.[1]) out.push({ field: "name", value: addMyName[1].trim() });

  // Deduplicate (last wins)
  const final = {};
  for (const x of out) final[x.field] = x.value;

  return Object.entries(final).map(([field, value]) => ({ field, value }));
};

export const sendMessage = async (userMessage, conversationHistory = []) => {
  try {
    const pageContent = extractPageContent();

    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: userMessage,
        conversationHistory,
        pageContent,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const actionResults = [];

    // 1) Execute actions returned by backend (Gemini)
    if (Array.isArray(data.actions) && data.actions.length > 0) {
      for (const action of data.actions) {
        switch (action.type) {
          case "scroll_to_section": {
            actionResults.push(scrollToSection(action?.data?.sectionId));
            break;
          }
          case "scroll_page": {
            actionResults.push(scrollPage(action?.data?.direction));
            break;
          }
          case "fill_input": {
            const field = action?.data?.field;
            const selector = action?.data?.selector;
            const value = action?.data?.value ?? "";
            actionResults.push(fillInput(selector || field, value));
            break;
          }
          default:
            console.warn("Unknown action type:", action.type);
            break;
        }
      }
    }

    // 2) Frontend fallback (works even if Gemini lies like “no search bar”)
    const lower = String(userMessage || "").toLowerCase().trim();

    // Scroll intents
    const wantUp = lower === "up" || lower.includes("scroll up") || lower.includes("go up");
    const wantDown =
      lower === "down" || lower.includes("scroll down") || lower.includes("go down");
    const wantTop =
      lower === "top" || lower.includes("scroll to top") || lower.includes("go to top");
    const wantBottom =
      lower === "bottom" ||
      lower.includes("scroll to bottom") ||
      lower.includes("go to bottom");

    if (wantUp) actionResults.push(scrollPage("up"));
    if (wantDown) actionResults.push(scrollPage("down"));
    if (wantTop) actionResults.push(scrollPage("top"));
    if (wantBottom) actionResults.push(scrollPage("bottom"));

    // Scroll to section
    for (const section of ["projects", "contact", "about", "home"]) {
      if (
        lower.includes(`scroll to ${section}`) ||
        lower.includes(`go to ${section}`) ||
        lower.includes(`navigate to ${section}`)
      ) {
        actionResults.push(scrollToSection(section));
        break;
      }
    }

    // Fill fields (name/email/message/search)
    const fills = parseFill(userMessage);
    for (const f of fills) {
      actionResults.push(fillInput(f.field, f.value));
    }

    return { text: data.text, actions: actionResults };
  } catch (error) {
    console.error("API Error:", error);
    return {
      text: `Error: ${error?.message || "Unknown error"}`,
      actions: [],
    };
  }
};

export const sendMessageWithActions = sendMessage;
