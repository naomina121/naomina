

// 完全一致 最初出現のみ取得
export const getSearchBlocks = (
  blocks: Array<any>,
  keyword: string
): boolean => {
  let p = blocks.filter((block) => (block.paragraph ? block.paragraph : {}));

  let p2 = p.map((block) => (block.paragraph ? block.paragraph.rich_text : {}));

  let h2 = blocks.filter((block) =>
    block.heading_2 ? block.heading_2.rich_text : {}
  );

  let h2_2 = h2.map((block) =>
    block.heading_2 ? block.heading_2.rich_text : {}
  );

  let h3 = blocks.filter((block) =>
    block.heading_3 ? block.heading_3.rich_text : {}
  );

  let h3_2 = h3.map((block) =>
    block.heading_3 ? block.heading_3.rich_text : {}
  );

  let pleanText = p2.concat(h2_2).concat(h3_2);

  let clean = pleanText.filter((v) => v.length > 0);

  let plean = [];

  for (let c of clean) {
    if (c.length == 1) {
      if (c[0].plain_text) {
        plean.push(c[0].plain_text);
      }
    } else if (c.length > 0) {
      for (let i = 0; i < c.length; i++) {
        if (c[i].plain_text) {
          plean.push(c[i].plain_text);
        }
      }
    } else {
      continue;
    }
  }

  let text = plean.toString();
  if (text.includes(keyword)) {
    return true;
  } else {
    return false;
  }
};
