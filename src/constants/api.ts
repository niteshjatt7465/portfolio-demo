/**
 * Production: call Render directly (Vercel /api proxy returns 404 on this project).
 * Development: Vite proxies /api → localhost:5000
 */
export const CONTACT_API_URL = import.meta.env.DEV
  ? '/api/contact'
  : 'https://portfolio-demo-gvdr.onrender.com/api/contact'
