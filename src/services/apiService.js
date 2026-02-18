import { extractPageContent } from "../utils/contentExtractor";
import { scrollToSection, scrollPage, fillInput } from "../utils/coBrowsingActions";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";
const parseFill = (text) => {
  const t = String(text || "").trim();
  if (!t) return [];

  const out = [];
  const re =
    /\b(?:fill|add|set)\s+(name|email|message|search)\s*(?:field)?\s*(?:as|to|=)?\s*/gi;

  const hits = [];
  let m;

  while ((m = re.exec(t)) !== null) {
    hits.push({
      field: String(m[1] || "").toLowerCase(),
      matchIndex: m.index, 
      valueStart: re.lastIndex,
    });
  }

  for (let i = 0; i < hits.length; i++) {
    const start = hits[i].valueStart;
    const end = i + 1 < hits.length ? hits[i + 1].matchIndex : t.length;

    let value = t.slice(start, end).trim();
    value = value.replace(/^[,:-]\s*/, "");
    value = value.replace(/[,\s]+$/, "");

    if (value) out.push({ field: hits[i].field, value });
  }
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
  const addMyName = t.match(/\badd\s+my\s+name\s+(.+?)\s+to\s+name\b/i);
  if (addMyName?.[1]) out.push({ field: "name", value: addMyName[1].trim() });
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
    const lower = String(userMessage || "").toLowerCase().trim();
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
