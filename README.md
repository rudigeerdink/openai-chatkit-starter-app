# ChatKit Starter Template

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![NextJS](https://img.shields.io/badge/Built_with-NextJS-blue)
![OpenAI API](https://img.shields.io/badge/Powered_by-OpenAI_API-orange)

This repository is the simplest way to bootstrap a [ChatKit](http://openai.github.io/chatkit-js/) application. It ships with a minimal Next.js UI, the ChatKit web component, and a ready-to-use session endpoint so you can experiment with OpenAI-hosted workflows built using [Agent Builder](https://platform.openai.com/agent-builder).

## What You Get

- Next.js app with `<openai-chatkit>` web component and theming controls
- API endpoint for creating a session at [`app/api/create-session/route.ts`](app/api/create-session/route.ts)
- Config file for starter prompts, theme, placeholder text, and greeting message

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create your environment file

Copy the example file and fill in the required values:

```bash
cp .env.example .env.local
```

You can get your workflow id from the [Agent Builder](https://platform.openai.com/agent-builder) interface, after clicking "Publish":

<img src="./public/docs/workflow.jpg" width=500 />

You can get your OpenAI API key from the [OpenAI API Keys](https://platform.openai.com/api-keys) page.

### 3. Configure ChatKit credentials

Update `.env.local` with the variables that match your setup.

- `OPENAI_API_KEY` — This must be an API key created **within the same org & project as your Agent Builder**. If you already have a different `OPENAI_API_KEY` env variable set in your terminal session, that one will take precedence over the key in `.env.local` one (this is how a Next.js app works). So, **please run `unset OPENAI_API_KEY` (`set OPENAI_API_KEY=` for Windows OS) beforehand**.
- `NEXT_PUBLIC_CHATKIT_WORKFLOW_ID` — This is the ID of the workflow you created in [Agent Builder](https://platform.openai.com/agent-builder), which starts with `wf_...`
- (optional) `CHATKIT_API_BASE` - This is a customizable base URL for the ChatKit API endpoint

### 4. Configure iframe embedding (optional)

If you want to embed this app in an iframe, configure these additional environment variables:

- `ALLOWED_FRAME_ANCESTORS` — Space-separated list of allowed parent origins that can embed this app in an iframe (e.g., `https://yourdomain.com https://*.yourdomain.com`)
- `NEXT_PUBLIC_PARENT_ORIGIN` — The exact parent origin for auto-resize functionality (e.g., `https://yourdomain.com`)

**Preview deployments**: If you need to embed preview deployments, include `https://*.vercel.app` in `ALLOWED_FRAME_ANCESTORS`. Otherwise, the app will only allow framing in production.

> Note: if your workflow is using a model requiring organization verification, such as GPT-5, make sure you verify your organization first. Visit your [organization settings](https://platform.openai.com/settings/organization/general) and click on "Verify Organization".

### 5. Run the app

```bash
npm run dev
```

Visit `http://localhost:3000` and start chatting. Use the prompts on the start screen to verify your workflow connection, then customize the UI or prompt list in [`lib/config.ts`](lib/config.ts) and [`components/ChatKitPanel.tsx`](components/ChatKitPanel.tsx).

### 6. Deploy your app

```bash
npm run build
```

Before deploying your app, you need to verify the domain by adding it to the [Domain allowlist](https://platform.openai.com/settings/organization/security/domain-allowlist) on your dashboard.

## Iframe Embedding

This app is configured to be embeddable in iframes with proper security headers:

- **Content Security Policy (CSP)**: Configured with `frame-ancestors` directive based on `ALLOWED_FRAME_ANCESTORS` environment variable
- **Security Headers**: Includes Referrer-Policy, Permissions-Policy, and X-Robots-Tag headers
- **Auto-resize**: Automatically adjusts iframe height based on content (requires `NEXT_PUBLIC_PARENT_ORIGIN`)

### Parent Integration

To integrate with the parent page, listen for height messages:

```javascript
window.addEventListener('message', (event) => {
  if (event.data.type === 'agent:height') {
    // Resize iframe to match content height
    iframe.style.height = event.data.height + 'px';
  }
});
```

### Responsive Iframe Embedding

The app is designed to be responsive and works well on all screen sizes:

**Basic iframe (fixed height):**
```html
<iframe 
  src="https://your-chatkit-app.vercel.app" 
  width="100%" 
  height="600px"
  frameborder="0"
  style="border-radius: 0.5rem; border: 1px solid #e5e5e5;">
</iframe>
```

**Responsive iframe with auto-resize:**
```html
<iframe 
  id="chatkit-iframe"
  src="https://your-chatkit-app.vercel.app" 
  width="100%" 
  height="500px"
  frameborder="0"
  style="border-radius: 0.5rem; border: 1px solid #e5e5e5; min-height: 400px;">
</iframe>

<script>
window.addEventListener('message', (event) => {
  if (event.data.type === 'agent:height') {
    const iframe = document.getElementById('chatkit-iframe');
    iframe.style.height = Math.max(400, event.data.height) + 'px';
  }
});
</script>
```

**Mobile-optimized CSS:**
```css
.chatkit-container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .chatkit-container iframe {
    height: 500px !important; /* Shorter on mobile */
    border-radius: 0.25rem;
  }
}

@media (min-width: 769px) {
  .chatkit-container iframe {
    height: 600px !important; /* Taller on desktop */
  }
}
```

## Customization Tips

- Adjust starter prompts, greeting text, [chatkit theme](https://chatkit.studio/playground), and placeholder copy in [`lib/config.ts`](lib/config.ts).
- Update the event handlers inside [`components/.tsx`](components/ChatKitPanel.tsx) to integrate with your product analytics or storage.

## References

- [ChatKit JavaScript Library](http://openai.github.io/chatkit-js/)
- [Advanced Self-Hosting Examples](https://github.com/openai/openai-chatkit-advanced-samples)
