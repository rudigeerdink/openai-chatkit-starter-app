import { ColorScheme, StartScreenPrompt, ThemeOption } from "@openai/chatkit";

export const WORKFLOW_ID =
  process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

export const STARTER_PROMPTS: StartScreenPrompt[] = [
  {
    label: "What can you do?",
    prompt: "What can you do?",
    icon: "circle-question",
  },
];

export const PLACEHOLDER_INPUT = "Ask anything...";

export const GREETING = "How can I help you today?";

export const getThemeConfig = (theme: ColorScheme): ThemeOption => ({
  color: {
    grayscale: {
      hue: 0, // Neutral grayscale to match the site
      tint: 0,
      shade: theme === "dark" ? 0 : 0,
    },
    accent: {
      primary: theme === "dark" ? "#ffffff" : "#1a1a1a", // Match the site's button color
      level: 1,
    },
  },
  radius: "soft", // Match the site's 0.5rem border radius
  // Add other theme options here
  // chatkit.studio/playground to explore config options
});
