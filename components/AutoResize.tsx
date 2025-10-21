'use client';
import { useEffect } from 'react';

export default function AutoResize() {
  useEffect(() => {
    const parentOrigin = process.env.NEXT_PUBLIC_PARENT_ORIGIN || '*';
    const post = () => window.parent.postMessage({ type: 'agent:height', height: document.documentElement.scrollHeight }, parentOrigin);
    const ro = new ResizeObserver(() => post());
    ro.observe(document.documentElement);
    post();
    return () => ro.disconnect();
  }, []);
  return null;
}
