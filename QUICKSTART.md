# Quick Start Guide

## Setup in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure API Key
Create a `.env` file in the root directory:
```env
REACT_APP_GEMINI_API_KEY=your_api_key_here
```

Get your free API key from: https://makersuite.google.com/app/apikey

**⚠️ Important**: After creating/updating the `.env` file, you MUST restart the development server for changes to take effect!

### 3. Start Development Server
```bash
npm start
```

If you already have the server running, stop it (Ctrl+C) and restart it after adding the API key.

The app will open at `http://localhost:3000`

## Testing the Chatbot

Once the app is running:

1. Click the chat button (💬) in the bottom-right corner
2. Try these example queries:
   - "What projects are showcased here?"
   - "Go to the projects section"
   - "Highlight the E-Commerce Platform project"
   - "Show me the contact form"
   - "Fill the contact form with name: John, email: john@example.com, message: Hello"

## Troubleshooting

**Chatbot not responding or showing API errors?**
- ✅ Check that your `.env` file exists and has the correct API key
- ✅ **Restart the development server** after adding/updating `.env` (this is crucial!)
- ✅ Verify the API key is valid at https://makersuite.google.com/app/apikey
- ✅ Check browser console (F12) for detailed error messages
- ✅ See `TROUBLESHOOTING.md` for more detailed help

**Actions not working?**
- Make sure JavaScript is enabled
- Check browser console for any errors
- Try refreshing the page

## Next Steps

- Customize the portfolio content in the component files
- Modify styling in the CSS files
- Add more co-browsing actions in `src/utils/coBrowsingActions.js`
- Deploy to Vercel, Netlify, or GitHub Pages (see README.md)
