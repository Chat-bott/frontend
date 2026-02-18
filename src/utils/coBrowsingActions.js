export const scrollToSection = (sectionId) => {
  const id = String(sectionId || "").trim();
  const element = document.getElementById(id);

  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    return { success: true, message: `Scrolled to ${id} section` };
  }

  return { success: false, message: `Section ${id} not found` };
};
export const scrollPage = (direction) => {
  const dir = String(direction || "").toLowerCase().trim();

  const doc = document.documentElement;
  const body = document.body;

  const maxScrollHeight = Math.max(
    doc.scrollHeight,
    body.scrollHeight,
    doc.offsetHeight,
    body.offsetHeight
  );

  if (dir === "up" || dir === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return { success: true, message: "Scrolled to top" };
  }

  if (dir === "down" || dir === "bottom") {
    window.scrollTo({ top: maxScrollHeight, behavior: "smooth" });
    return { success: true, message: "Scrolled to bottom" };
  }

  return { success: false, message: `Invalid scroll direction: ${direction}` };
};
export const scrollToProject = (projectTitle) => {
  const wanted = String(projectTitle || "").toLowerCase().trim();
  if (!wanted) return { success: false, message: "Project title is empty" };

  const cards = Array.from(document.querySelectorAll(".project-card"));
  for (const card of cards) {
    const titleEl = card.querySelector(".project-title");
    const title = String(titleEl?.textContent || "").toLowerCase().trim();

    if (title && (title === wanted || title.includes(wanted) || wanted.includes(title))) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      return { success: true, message: `Scrolled to project: ${titleEl?.textContent || projectTitle}` };
    }
  }

  return { success: false, message: `Project not found: ${projectTitle}` };
};

export const clickElement = (selector) => {
  const element = document.querySelector(selector);

  if (element) {
    element.click();
    return { success: true, message: `Clicked element: ${selector}` };
  }

  return { success: false, message: `Element not found: ${selector}` };
};
export const fillInput = (fieldOrSelector, value) => {
  const field = String(fieldOrSelector || "").trim();
  const val = value ?? "";

  const setNativeValue = (el, v) => {
    const proto = Object.getPrototypeOf(el);
    const desc =
      Object.getOwnPropertyDescriptor(proto, "value") ||
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value") ||
      Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value");

    if (desc?.set) desc.set.call(el, v);
    else el.value = v;

    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  };

  const findByField = (f) => {
    if (f.startsWith("#") || f.startsWith(".") || f.startsWith("["))
      return document.querySelector(f);
    return (
      document.querySelector(`[data-cobrowse-field="${CSS.escape(f)}"]`) ||
      document.getElementById(f) ||
      document.querySelector(`[name="${CSS.escape(f)}"]`) ||
      Array.from(document.querySelectorAll("label")).reduce((acc, label) => {
        if (acc) return acc;
        const t = (label.textContent || "").toLowerCase().trim();
        if (!t.includes(f.toLowerCase())) return null;

        const forId = label.getAttribute("for");
        if (forId) return document.getElementById(forId);
        return label.querySelector("input, textarea");
      }, null) ||
      Array.from(document.querySelectorAll("input, textarea")).find((el) => {
        const ph = (el.getAttribute("placeholder") || "").toLowerCase();
        return ph.includes(f.toLowerCase());
      }) ||
      null
    );
  };

  const el = findByField(field);

  if (!el) {
    return { success: false, message: `Input not found for: ${field}` };
  }

  el.focus();
  setNativeValue(el, String(val));
  el.blur();

  return { success: true, message: `Filled ${field}` };
};
