# Troubleshooting Guide

## Common Issues and Solutions

### "I apologize, but I encountered an error. Please check your API configuration."

This error can occur for several reasons. Follow these steps to diagnose:

#### 1. **Check API Key Configuration**

- Ensure your `.env` file exists in the root directory (same level as `package.json`)
- Verify the API key is set correctly:
  ```env
  REACT_APP_GEMINI_API_KEY=your_actual_api_key_here
  ```
- **Important**: After adding/updating `.env`, you MUST restart the development server:
  ```bash
  # Stop the server (Ctrl+C)
  # Then restart:
  npm start
  ```

#### 2. **Verify API Key is Valid**

- Get a free API key from: https://makersuite.google.com/app/apikey
- Make sure the API key starts with `AIza...`
- Check that the API key hasn't been revoked or expired

#### 3. **Check Browser Console**

Open browser DevTools (F12) and check the Console tab for detailed error messages:
- Look for specific error codes (403, 429, etc.)
- Check for network errors
- Look for API-related error messages

#### 4. **Common Error Messages**

**"API key not configured"**
- Solution: Add `REACT_APP_GEMINI_API_KEY` to your `.env` file and restart the server

**"API quota exceeded" or "429"**
- Solution: You've hit the rate limit. Wait a few minutes and try again, or check your API usage

**"403" or "permission denied"**
- Solution: Your API key might be invalid or doesn't have the right permissions. Generate a new key

**"Network error"**
- Solution: Check your internet connection and try again

#### 5. **Verify Environment Variable is Loaded**

Add this temporary debug code to `src/services/geminiService.js` (remove after debugging):
```javascript
console.log('API Key loaded:', API_KEY ? 'Yes (length: ' + API_KEY.length + ')' : 'No');
```

#### 6. **Test API Key Directly**

You can test your API key using curl:
```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
```

Replace `YOUR_API_KEY` with your actual key.

#### 7. **Check Model Availability**

The code tries `gemini-1.5-flash` first, then falls back to `gemini-pro`. If both fail:
- Check Google AI Studio for available models
- Update the model name in `src/services/geminiService.js` if needed

#### 8. **Clear Cache and Restart**

Sometimes React caches can cause issues:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear React cache
npm start -- --reset-cache
```

## Still Having Issues?

1. Check the browser console for the full error message
2. Verify your API key at https://makersuite.google.com/app/apikey
3. Ensure you've restarted the dev server after adding `.env`
4. Try generating a new API key
5. Check if there are any CORS or network issues

## Getting Help

If you're still stuck, check:
- The error message in the browser console
- Your `.env` file configuration
- Whether the dev server was restarted after adding the API key
- Your API key status at Google AI Studio
