# LD Sidecar Setup Guide

This guide will help you set up LD Sidecar visual A/B testing in your gpt-search-simplified-test project.

## Prerequisites

- LaunchDarkly account with a project
- Chrome browser
- Access to your LaunchDarkly dashboard

## Step 1: Environment Setup

1. Create a `.env.local` file in your project root with the following variables:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
   LAUNCH_DARKLY_SDK_KEY=your_launchdarkly_sdk_key_here
   NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_SIDE_ID=your_launchdarkly_client_side_id_here
   ```

2. Get your LaunchDarkly Client-side ID:
   - Go to your LaunchDarkly dashboard
   - Navigate to Account Settings > Projects > [Your Project] > Environments
   - Copy the Client-side ID for your environment

## Step 2: Install Chrome Extension

1. Navigate to the `sidecar-ld/extension/dist` folder in your project
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the `extension/dist` folder
5. The LD Sidecar Editor extension should now appear in your extensions list

## Step 3: Create LaunchDarkly Flag

1. In your LaunchDarkly dashboard, create a new flag
2. Set the flag key to: `sidecar_search_experiments`
3. Set the flag type to "JSON"
4. Create a variation with the example configuration from `sidecar-flag-example.json`
5. Enable the flag for your desired segments

## Step 4: Test the Integration

1. Start your Next.js development server:
   ```bash
   npm run dev
   ```

2. Open your website in Chrome with the extension installed
3. Click the LD Sidecar extension icon
4. You should see the visual editor interface
5. Try selecting elements and creating operations
6. Copy the generated JSON and paste it into your LaunchDarkly flag variation

## Example Flag Configuration

Use the `sidecar-flag-example.json` file as a starting point. This example includes:

- **Text changes**: Updates the main heading
- **Style changes**: Adds background color and styling to search container
- **Class additions**: Adds enhanced styling to the search button
- **Goal tracking**: Tracks pageviews and button clicks
- **Anti-flicker**: Prevents layout shift during experiment loading

## Troubleshooting

### Script Not Loading
- Check that `ld-sidecar.min.js` exists in the `public/` folder
- Verify the script tag is properly added to `layout.tsx`
- Check browser console for any JavaScript errors

### Extension Not Working
- Ensure the extension is loaded in Chrome
- Check that you're on the correct domain
- Verify the extension has permission to access the page

### Flag Not Evaluating
- Confirm the flag key matches exactly: `sidecar_search_experiments`
- Check that the flag is enabled in LaunchDarkly
- Verify your Client-side ID is correct
- Check browser console for LaunchDarkly connection errors

### Changes Not Applying
- Ensure the JSON configuration is valid
- Check that selectors match elements on your page
- Verify URL targeting rules include your current page
- Check browser console for any operation errors

## Advanced Configuration

### URL Targeting
```json
{
  "url": {
    "include": ["*/search*", "*/products*"],
    "exclude": ["*/admin/*", "*/api/*"]
  }
}
```

### Multiple Operations
```json
{
  "ops": [
    {
      "type": "text",
      "sel": "h1",
      "value": "New Heading",
      "name": "Update heading"
    },
    {
      "type": "style.set",
      "sel": ".container",
      "value": "background-color: blue;",
      "name": "Change background"
    }
  ]
}
```

### Goal Tracking
```json
{
  "goals": [
    {
      "type": "pageview",
      "event": "experiment_page_viewed"
    },
    {
      "type": "click",
      "sel": ".cta-button",
      "event": "cta_clicked"
    }
  ]
}
```

## Support

For issues with the LD Sidecar integration, check:
1. Browser console for JavaScript errors
2. LaunchDarkly dashboard for flag evaluation
3. Network tab for script loading issues
4. Extension popup for any error messages
