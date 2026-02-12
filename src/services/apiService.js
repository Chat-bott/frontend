import { extractPageContent } from '../utils/contentExtractor';
import {
  scrollToSection,
  fillInput,
  highlightByText,
  clickByText
} from '../utils/coBrowsingActions';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export const sendMessage = async (userMessage, conversationHistory = []) => {
  try {
    const pageContent = extractPageContent();
    
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        conversationHistory,
        pageContent
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    const actionResults = [];
    
    if (data.actions && data.actions.length > 0) {
      for (const action of data.actions) {
        switch (action.type) {
          case 'scroll_to_section':
            const scrollResult = scrollToSection(action.data.sectionId);
            actionResults.push(scrollResult);
            break;
          case 'highlight':
            const highlightResult = highlightByText(action.data.text);
            if (highlightResult.success) {
              actionResults.push(highlightResult);
            }
            break;
          case 'click':
            const clickResult = clickByText(action.data.text);
            if (clickResult.success) {
              actionResults.push(clickResult);
            }
            break;
          case 'fill':
            const fillResult = fillInput(action.data.selector, action.data.value);
            actionResults.push(fillResult);
            break;
          default:
            console.warn('Unknown action type:', action.type);
            break;
        }
      }
    }

    if (actionResults.length === 0) {
      const lowerMessage = userMessage.toLowerCase();
      if (lowerMessage.includes('go to') || lowerMessage.includes('navigate to') || 
          lowerMessage.includes('show me') || lowerMessage.includes('take me to') ||
          lowerMessage.includes('scroll to')) {
        for (const section of ['projects', 'contact', 'about', 'home']) {
          if (lowerMessage.includes(section)) {
            const result = scrollToSection(section);
            actionResults.push(result);
            break;
          }
        }
      }
      if (lowerMessage.includes('highlight') || lowerMessage.includes('point out') || 
          lowerMessage.includes('show me the') || lowerMessage.includes('find')) {
        for (const project of pageContent.projects) {
          const projectLower = project.title.toLowerCase();
          if (lowerMessage.includes(projectLower) || 
              (lowerMessage.includes('recent') && project.date === '2024') ||
              (lowerMessage.includes('first') && project.id === 1) ||
              (lowerMessage.includes('last') && project.id === pageContent.projects.length)) {
            const result = highlightByText(project.title);
            actionResults.push(result);
            break;
          }
        }
        if (actionResults.length === 0) {
          for (const section of pageContent.sections) {
            if (lowerMessage.includes(section.id)) {
              const result = scrollToSection(section.id);
              actionResults.push(result);
              break;
            }
          }
        }
      }
      if (lowerMessage.includes('fill') || lowerMessage.includes('enter') || lowerMessage.includes('type')) {
        const nameMatch = lowerMessage.match(/name[:\s]+([^,.]+)/i);
        const emailMatch = lowerMessage.match(/email[:\s]+([^,.]+)/i);
        const messageMatch = lowerMessage.match(/message[:\s]+(.+)/i);
        
        if (nameMatch) {
          const result = fillInput('#name', nameMatch[1].trim());
          actionResults.push(result);
        }
        if (emailMatch) {
          const result = fillInput('#email', emailMatch[1].trim());
          actionResults.push(result);
        }
        if (messageMatch) {
          const result = fillInput('#message', messageMatch[1].trim());
          actionResults.push(result);
        }
      }
      if (lowerMessage.includes('click') || lowerMessage.includes('press')) {
        const buttonTexts = ['view details', 'send message', 'get in touch', 'view my work'];
        for (const text of buttonTexts) {
          if (lowerMessage.includes(text)) {
            const result = clickByText(text);
            if (result.success) {
              actionResults.push(result);
              break;
            }
          }
        }
      }
    }

    return {
      text: data.text,
      actions: actionResults
    };
  } catch (error) {
    console.error('API Error:', error);
    let errorMessage = 'I apologize, but I encountered an error. ';
    
    if (error.message?.includes('fetch')) {
      errorMessage += 'Unable to connect to the server. Please check if the backend is running.';
    } else if (error.message?.includes('500')) {
      errorMessage += 'Server error. Please try again later.';
    } else {
      errorMessage += `Error: ${error.message || 'Unknown error'}. Please check your connection.`;
    }
    
    return {
      text: errorMessage,
      actions: []
    };
  }
};

export const sendMessageWithActions = sendMessage;
