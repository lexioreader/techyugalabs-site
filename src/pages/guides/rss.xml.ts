import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE_NAME, SITE_DESCRIPTION, AUTHOR } from '~/consts';

export async function GET(context: APIContext) {
  const guides = (await getCollection('guides', (g) => !g.data.draft)).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );

  return rss({
    title: `${SITE_NAME} Guides`,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items: guides.map((g) => ({
      title: g.data.title,
      description: g.data.description,
      pubDate: g.data.pubDate,
      link: `/guides/${g.id}/`,
      categories: [g.data.category, ...g.data.tags],
      author: g.data.author ?? AUTHOR.name,
    })),
    customData: `<language>en-us</language>`,
    stylesheet: '/rss-styles.xsl',
  });
}
