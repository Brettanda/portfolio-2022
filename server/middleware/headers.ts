export default defineEventHandler((event) => {
  event.res.setHeader("X-Frame-Options", "DENY")
  event.res.setHeader("X-XSS-Protection", "1; mode=block")
  event.res.setHeader("X-Content-Type-Options", "nosniff")
  event.res.setHeader("X-Robots-Tag", "noindex")
  event.res.setHeader("Cache-Control", "max-age=3600")
  event.res.removeHeader("X-Powered-By")


  const url = event.req.originalUrl;
  if (url === "/projects" || url === "/projects/") {
    event.res.setHeader("X-Robots-Tag", "noindex")
  }
})