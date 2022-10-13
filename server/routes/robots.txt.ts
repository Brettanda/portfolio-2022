function render(rules: any[]) {
  return rules.map(rule => `${rule.key}: ${String(rule.value).trim()}`).join('\n')
}

export default defineEventHandler(async (event) => {
  event.res.setHeader('Content-Type', 'text/plain')
  const content = [
    { key: 'User-agent', value: '*' },
    { key: 'Disallow', value: '' },
    { key: 'Sitemap', value: `https://brettanda.ca${event.req.originalUrl}` }
  ]
  return render(content)
})
