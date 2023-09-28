import { getCover, getText } from '@/utils/property';
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPages } from '@/utils/notion';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: `${req.method} requests are not allowed（許可されていないリクエストです）`,
    });
  }

  try {
    const { page } = JSON.parse(req.body);

    const { results } = await fetchPages({
      slug: getText(page.properties.slug.rich_text),
    });

    const imgPages: any[] = results ? results : [];

    const p = imgPages[0];

    const src = getCover(p.cover) ? getCover(page.cover) : '/img/noimg.jpg';

    res.status(200).json({ imageData: src });
    res.end();
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.end();
  }
}
