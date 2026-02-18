export const extractPageContent = () => {
  const content = {
    sections: [],
    projects: [],
    contact: null,
    about: null,
    search: { exists: false },
  };
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    const sectionId = section.id;
    const sectionTitle =
      section.querySelector(".section-title")?.textContent || "";
    const sectionText = Array.from(
      section.querySelectorAll("p, h1, h2, h3, h4, h5, h6")
    )
      .map((el) => el.textContent.trim())
      .filter((text) => text.length > 0)
      .join(" ");

    content.sections.push({
      id: sectionId,
      title: sectionTitle,
      text: sectionText,
    });
  });
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    const title = card.querySelector(".project-title")?.textContent || "";
    const description =
      card.querySelector(".project-description")?.textContent || "";
    const tech = Array.from(card.querySelectorAll(".tech-tag")).map((el) =>
      el.textContent.trim()
    );
    const date = card.querySelector(".project-date")?.textContent || "";

    content.projects.push({
      id: index + 1,
      title,
      description,
      tech,
      date,
    });
  });
  const contactSection = document.getElementById("contact");
  if (contactSection) {
    const contactItems = Array.from(
      contactSection.querySelectorAll(".contact-item")
    ).map((el) => el.textContent.trim());
    content.contact = { items: contactItems };
  }
  const aboutSection = document.getElementById("about");
  if (aboutSection) {
    const skills = Array.from(aboutSection.querySelectorAll(".skill-tag")).map(
      (el) => el.textContent.trim()
    );
    content.about = { skills };
  }
  const searchEl =
    document.querySelector('[data-cobrowse-field="search"]') ||
    document.getElementById("search") ||
    document.querySelector('input[name="search"]');

  if (searchEl) {
    content.search = {
      exists: true,
      placeholder: searchEl.getAttribute("placeholder") || "",
    };
  }

  return content;
};

export const getVisibleText = () => {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  const texts = [];
  let node = walker.nextNode();
  while (node) {
    const text = node.textContent.trim();
    if (text.length > 10 && !isHidden(node.parentElement)) {
      texts.push(text);
    }
    node = walker.nextNode();
  }

  return texts.join(" ");
};

const isHidden = (element) => {
  if (!element) return false;
  const style = window.getComputedStyle(element);
  return (
    style.display === "none" ||
    style.visibility === "hidden" ||
    style.opacity === "0"
  );
};
