import { getUpdate } from '@/utils/property';
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPages } from '@/utils/notion';
import { PageType } from '@/types/types';

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
    const { slug, lastUpDate } = JSON.parse(req.body);

    const { results } = await fetchPages({
      slug: slug,
    });
    const datas: PageType[] | any = results;
    const data = datas[0];
    const diffLastUpDate = getUpdate(data.properties.update.last_edited_time);
    if (lastUpDate === diffLastUpDate) {
      res.status(201);
      res.end();
    }
    res.status(200);
    res.end();
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.end();
  }
}
