import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import { asSitemapCollection } from '@nuxtjs/sitemap/content'

export default defineContentConfig({
  collections: {
    content: defineCollection(
      asSitemapCollection({
        type: 'page',
        source: '**/*.md',
        schema: z.object({
          draft: z.boolean().optional(),
          image: z.string().optional(),
          category: z.string().optional(),
        })
      })
    ),
  }
})
