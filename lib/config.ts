import { ColorScheme, StartScreenPrompt, ThemeOption } from "@openai/chatkit";

export const WORKFLOW_ID =
  process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

export const STARTER_PROMPTS: StartScreenPrompt[] = [
  {
    label: "Have a look at this KvK document",
    prompt: "Provide some additional information on the process",
    icon: "circle-question",
  },
  {
    label: "What is a KvK registration report?",
    prompt: "What is a KvK registration report and what information does it contain?",
    icon: "document",
  },
];

export const PLACEHOLDER_INPUT = "Upload your document...";

export const GREETING = "This workflows asssesses whether a document is a KvK 'bericht van registratie'";

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
