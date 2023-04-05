import { Client } from '@notionhq/client';
// Initializing a client (https://www.npmjs.com/package/@notionhq/client)
export const notion = new Client({
  auth: process.env.NOTION_KEY as string,
});

const DATABASE_ID = process.env.NOTIION_DATABASE_ID as string;

export const fetchPages = async ({
  slug,
  tag,
  category,
}: {
  slug?: string;
  tag?: string;
  category?: string;
}) => {
  const and: any = [
    {
      property: 'isPublic',
      checkbox: {
        equals: true,
      },
    },
    {
      property: 'slug',
      rich_text: {
        is_not_empty: true,
      },
    },
  ];

  if (slug) {
    and.push({
      property: 'slug',
      rich_text: {
        equals: slug,
      },
    });
  }

  if (tag) {
    and.push({
      property: 'tags',
      multi_select: {
        contains: tag,
      },
    });
  }

  if (category) {
    and.push({
      property: 'category',
      select: {
        equals: category,
        name: {
          equals: category,
        },
      },
    });
  }

  return await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      and: and,
    },
    sorts: [
      {
        property: 'published',
        direction: 'descending',
      },
    ],
  });
};

export const fetchBlocksByPageId = async (pageId: string) => {
  const data = [];
  let cursor = undefined;
  while (true) {
    const { results, next_cursor }: any = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
    });
    data.push(...results);
    if (!next_cursor) break;
    cursor = next_cursor;
  }
  return { results: data };
};
