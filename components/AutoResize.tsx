'use client';
import { useEffect } from 'react';

export default function AutoResize() {
  useEffect(() => {
    const parentOrigin = process.env.NEXT_PUBLIC_PARENT_ORIGIN || '*';
    const post = () => {
      const height = document.documentElement.scrollHeight;
      console.log('AutoResize: Sending height message:', height);
      window.parent.postMessage({ type: 'agent:height', height }, parentOrigin);
    };
    const ro = new ResizeObserver(() => {
      console.log('AutoResize: ResizeObserver triggered');
      post();
    });
    ro.observe(document.documentElement);
    post();
    return () => ro.disconnect();
  }, []);
  return null;
}
