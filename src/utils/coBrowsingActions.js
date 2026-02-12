export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    return { success: true, message: `Scrolled to ${sectionId} section` };
  }
  return { success: false, message: `Section ${sectionId} not found` };
};

export const scrollPage = (direction, amount = 500) => {
  const scrollAmount = direction === 'down' ? amount : -amount;
  window.scrollBy({
    top: scrollAmount,
    behavior: 'smooth'
  });
  return { success: true, message: `Scrolled ${direction} by ${amount}px` };
};

export const clickElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    element.click();
    return { success: true, message: `Clicked element: ${selector}` };
  }
  return { success: false, message: `Element not found: ${selector}` };
};

export const highlightElement = (selector, duration = 3000) => {
  const element = document.querySelector(selector);
  if (element) {
    element.classList.add('highlighted');
    setTimeout(() => {
      element.classList.remove('highlighted');
    }, duration);
    return { success: true, message: `Highlighted element: ${selector}` };
  }
  return { success: false, message: `Element not found: ${selector}` };
};

export const fillInput = (selector, value) => {
  const element = document.querySelector(selector);
  if (element && (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA')) {
    element.value = value;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    return { success: true, message: `Filled input ${selector} with: ${value}` };
  }
  return { success: false, message: `Input element not found: ${selector}` };
};

export const findElementByText = (text, elementType = null) => {
  const elements = elementType 
    ? document.querySelectorAll(elementType)
    : document.querySelectorAll('*');
  
  for (const el of elements) {
    if (el.textContent && el.textContent.toLowerCase().includes(text.toLowerCase())) {
      return el;
    }
  }
  return null;
};

export const highlightByText = (text, elementType = null) => {
  const element = findElementByText(text, elementType);
  if (element) {
    element.classList.add('highlighted');
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      element.classList.remove('highlighted');
    }, 3000);
    return { success: true, message: `Highlighted element containing: ${text}` };
  }
  return { success: false, message: `No element found containing: ${text}` };
};

export const clickByText = (text, elementType = null) => {
  const element = findElementByText(text, elementType);
  if (element) {
    element.click();
    return { success: true, message: `Clicked element containing: ${text}` };
  }
  return { success: false, message: `No clickable element found containing: ${text}` };
};
