import { NextApiRequest, NextApiResponse } from 'next';
import got from 'got';
import { fetchPages } from '@/utils/notion';
import { getCover } from '@/utils/property';
import { PageType } from '@/types/types';
import { siteConfig } from '@/site.config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.statusCode = 400;
    res.end();
    return;
  }

  const { slug: slugs, cat: category } = req.query;

  if (!slugs) {
    res.statusCode = 400;
    res.end();
    return;
  }

  if (!category) {
    res.statusCode = 400;
    res.end();
    return;
  }

  const cat = category.toString();
  const slug = slugs.toString();

  try {
    const { results } = await fetchPages({ slug: slug });
    const pages: PageType[] | any = results;
    const page: PageType = pages[0];
    if (!page) {
      throw new Error(`post not found. slug: ${slug}`);
    }

    const ogpImage = getCover(page.cover);

    if (!ogpImage) {
      res.statusCode = 404;
      res.end();
    }

    const { rawBody: image, headers: headers } = await got(ogpImage);

    res.setHeader('Content-Type', headers['content-type'] || '');
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=86400, max-age=86400, stale-while-revalidate=86400'
    );
    res.write(image);
    res.statusCode = 200;
    res.end();
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.end();
  }
}
