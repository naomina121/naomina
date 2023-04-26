import React, { FC, useEffect, useState } from 'react';
import prism from 'prismjs';
import 'clipboard';
import 'prism-themes/themes/prism-dracula.css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-git';
import 'prismjs/components/prism-powershell';

import 'prismjs/plugins/toolbar/prism-toolbar.min.css';
import 'prismjs/plugins/toolbar/prism-toolbar.min';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min';
import 'prismjs/plugins/show-language/prism-show-language';

import parse, { domToReact } from 'html-react-parser';
import BlogCard from './BlogCard';
import tocbot from 'tocbot';
import { NotionTypes, RichTextTyeps } from '@/types/notion';

//特殊文字をエスケープ
const entityify = (function () {
  const characte: any = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    '\n': '<br>',
  };
  return function (t2: string): string {
    return t2.replace(/[<>&"]/g, function (c) {
      return characte[c];
    });
  };
})();

interface FetchRequest {
  url: string;
  options: object;
}

async function fetchAsync(request: FetchRequest) {
  return await fetch(request.url, request.options);
}

type Props = {
  blocks: NotionTypes[];
};

const Html: FC<Props> = ({ blocks }) => {
  const [html, setHtml] = useState(
    parse(
      '<p>只今、記事の読み込み中です。恐れ入りますが今しばらくお待ちください</p>'
    )
  );

  const NotionToHtml = async (blocks: NotionTypes[]) => {
    //ブログに反映させたいブロックブロックのオブジェクトを決める
    const NotionTypeArray: string[] = [
      'heading_2',
      'heading_3',
      'image',
      'paragraph',
      'code',
      'bulleted_list_item',
      'numbered_list_item',
      'quote',
    ];

    // rech_text以下の装飾のスタイリングの追加 typeがtext以外はスキップ。
    const RichTextStyling = (contents: RichTextTyeps | undefined) => {
      const Styling: string[] = [];
      const style = {
        bold: 'font-bold ',
        strikethrough: 's',
        underline: 'underline decoration-1',
      };
      if (contents === undefined) {
        return [];
      }
      contents.map((content, i) => {
        const text = entityify(content.plain_text);
        const link = content.text?.link;
        if (text === ' ') {
          return [];
        }
        if (content.type === 'text') {
          if (content.href !== null) {
            if (content.annotations) {
              if (content.annotations.strikethrough) {
                Styling.push(
                  `<a href="${content.href}" target="target_blank" class="${
                    content.annotations.bold ? style.bold : ''
                  }${
                    content.annotations.underline ? style.underline : ''
                  }" ><s>${text}</s></a>`
                );
              } else {
                Styling.push(
                  `<a href="${content.href}" target="target_blank">${text}</a>`
                );
              }
            }
          } else {
            if (content.annotations) {
              if (content.annotations.strikethrough) {
                Styling.push(
                  `<span class="${content.annotations.bold ? style.bold : ''}${
                    content.annotations.underline ? style.underline : ''
                  }" ><s>${text}</s></span>`
                );
              } else if (content.annotations.code) {
                Styling.push(`<code>${text}</code>`);
              } else if (link) {
                Styling.push(`<a href="${link.url})${text}</a>`);
              } else if (
                content.annotations.bold ||
                content.annotations.underline
              ) {
                Styling.push(
                  `<span class="${content.annotations.bold ? style.bold : ''}${
                    content.annotations.underline ? style.underline : ''
                  }">${text}</span>`
                );
              } else {
                Styling.push(`${text}`);
              }
            } else {
              Styling.push(`${text}`);
            }
          }

          return Styling;
        }
      });
      const Join = Styling.join('');
      return Join;
    };

    //ブロックタイプをHTMLに変換する
    const NotionBlockToTag = (block: NotionTypes) => {
      if (block.type == 'heading_2') {
        return `<h2 id="${RichTextStyling(
          block.heading_2?.rich_text
        )}">${RichTextStyling(block.heading_2?.rich_text)}</h2>`;
      }
      if (block.type === 'heading_3') {
        return `<h3 id="${RichTextStyling(
          block.heading_3?.rich_text
        )}">${RichTextStyling(block.heading_3?.rich_text)}</h3>`;
      }
      if (block.type === 'paragraph') {
        if (!RichTextStyling(block.paragraph?.rich_text)) {
          return;
        }
        return `<p>${RichTextStyling(block.paragraph?.rich_text)}</p>`;
      }
      if (block.type === 'bulleted_list_item') {
        return `<li>${RichTextStyling(
          block.bulleted_list_item?.rich_text
        )}</li>`;
      }
      if (block.type === 'numbered_list_item') {
        return `<li>${RichTextStyling(
          block.numbered_list_item?.rich_text
        )}</li>`;
      }

      if (block.type === 'image') {
        const src = block.image?.file
          ? block.image?.file?.url
          : block.image?.external?.url;
        const alt = block.image?.caption ? block.image?.caption : '';
        return `<img src="${src}" alt="${alt}" />`;
      }
      if (block.type === 'quote') {
        return `<blockquote>${RichTextStyling(
          block.quote?.rich_text
        )}</blockquote>`;
      }
      if (block.type === 'code') {
        const NotionCodeLanguage = {
          html: 'html',
          markup: 'markup',
          css: 'css',
          javascript: 'javascript',
          abap: 'git',
          arduino: 'json',
          elm: 'ts',
          powershell: 'powershell',
          plean_text: 'plean_text',
        };

        const NotionLanguage = (findLang: string, obj: any) => {
          const result = [];
          if (obj[findLang]) {
            result.push(obj[findLang]);
          } else {
            result.push('plean_text');
          }
          return result;
        };

        const searchLang = block.code?.language
          ? block.code.language
          : 'plean_text';
        const lang = NotionLanguage(searchLang, NotionCodeLanguage);

        return `<pre class="line-numbers"><code class="language-${
          lang[0]
        }" data-caption="${block.code?.caption}">${RichTextStyling(
          block.code?.rich_text
        )}</code></pre>`;
      }
    };

    //最終的にblocksをHTMLに変換する関数
    const NotionBlocksToHtml = (blocks: NotionTypes[]) => {
      const BlocksFilter = blocks.filter((block) => {
        return NotionTypeArray.find((value) => value === block.type);
      });

      const HtmlArray: any[] = [];
      let UlArray: any[] = [];
      let OlArray: any[] = [];

      BlocksFilter.map((block, index) => {
        const add = NotionBlockToTag(block);

        if (block.type === 'bulleted_list_item') {
          if (UlArray.length === 0) {
            UlArray.push('<ul>');
            UlArray.push(add);
          } else {
            UlArray.push(add);
          }
        }

        if (block.type === 'numbered_list_item') {
          if (OlArray.length === 0) {
            OlArray.push('<ol>');
            OlArray.push(add);
          } else {
            OlArray.push(add);
          }
        }

        if (block.type !== 'numbered_list_item' && OlArray.length > 0) {
          OlArray.push('</ol>');
          const ol = ([...OlArray] = OlArray);
          const ol_string = ol.join('');
          HtmlArray.push(ol_string);
          OlArray = [];
        } else if (block.type !== 'bulleted_list_item' && UlArray.length > 0) {
          UlArray.push('</ul>');
          const ul = ([...UlArray] = UlArray);
          const ul_string = ul.join('');
          HtmlArray.push(ul_string);
          UlArray = [];
        } else if (index === BlocksFilter.length - 1) {
          if (OlArray.length > 0) {
            OlArray.push('</ol>');
            const ol = ([...OlArray] = OlArray);
            const ol_string = ol.join('');
            HtmlArray.push(ol_string);
            OlArray = [];
          } else if (UlArray.length > 0) {
            UlArray.push('</ul>');
            const ul = ([...UlArray] = UlArray);
            const ul_string = ul.join('');
            HtmlArray.push(ul_string);
            UlArray = [];
          }
        } else if (
          block.type !== 'numbered_list_item' &&
          block.type !== 'bulleted_list_item'
        ) {
          HtmlArray.push(add);
        }

        return HtmlArray;
      });

      // if(HtmlArray[length-1].match( /^<li>/g )){
      //   HtmlArray.push('</ul>');
      //   HtmlArray.push('</ol>');

      // }

      const html = HtmlArray.join(' ');
      return html;
    };

    const NotionHtml = NotionBlocksToHtml(blocks);

    const before = parse(NotionHtml);

    setHtml(before);

    const res = await fetchAsync({
      url: '../../api/notion-to-html',
      options: {
        method: 'POST',
        body: JSON.stringify({ blocks }),
      },
    });
    if (res.status === 200) {
      const responce = await res.json();
      const cardDatas = responce.cardDatas;

      const replace = (node: any) => {
        if (node.name === 'a') {
          if (node.parent.children.length === 1 && node.parent.name !== 'li') {
            const indexOfUrl = cardDatas.findIndex((card: any) => {
              return card.url.indexOf(node.attribs?.href) != -1;
            });
            const cardData = cardDatas[indexOfUrl]
              ? cardDatas[indexOfUrl]
              : null;

            if (cardData === null) {
              return;
            }

            //内部リンクか外部リンク化判定
            const blank =
              cardData.url.indexOf(process.env.API_DOMAIN as String) === -1;
            const blankProp = blank
              ? {
                  target: '_blank',
                  rel: 'noopener nofollow',
                }
              : {};
            if (cardData.title && cardData.image) {
              return <BlogCard cardData={cardData} blankProp={blankProp} />;
            }
            return (
              <a href={cardData.url} {...blankProp}>
                {domToReact(node.children)}
              </a>
            );
          }
          return (
            <a {...node.attribs} target="_blank">
              {domToReact(node.children)}
            </a>
          );
        }
      };

      const change = parse(NotionHtml, { replace });

      setHtml(change);
      return;
    }
  };

  useEffect(() => {
    NotionToHtml(blocks);
  }, []);

  useEffect(() => {
    prism.highlightAll();
    tocbot.init({
      tocSelector: '.toc, .main-toc',
      contentSelector: '.context',
      headingSelector: 'h2, h3',
    });
    return () => tocbot.destroy();
  }, [html]);

  return <>{html}</>;
};

export default Html;
