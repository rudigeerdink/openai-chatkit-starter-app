import type { NextConfig } from "next";

const ALLOWED = process.env.ALLOWED_FRAME_ANCESTORS || '';
const frameAncestors = ALLOWED.split(/\s+/).filter(Boolean).join(' ');
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://cdn.platform.openai.com",
  "style-src 'self' 'unsafe-inline' https://cdn.platform.openai.com",
  "img-src 'self' data: https:",
  "connect-src 'self' https://api.openai.com https://cdn.platform.openai.com",
  "font-src 'self' https:",
  `frame-ancestors ${frameAncestors || 'https:'}`,
  "base-uri 'self'",
  "form-action 'self'"
].join('; ');

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
    };
    return config;
  },
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'Content-Security-Policy', value: csp },
        // Do not set X-Frame-Options when using frame-ancestors
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'microphone=(self), camera=(self), clipboard-read=(self), clipboard-write=(self)' },
        // Optional: remove if you want the child URL indexed
        { key: 'X-Robots-Tag', value: 'noindex' }
      ]
    }];
  }
};

export default nextConfig;
