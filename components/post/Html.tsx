import { Blocks } from '@notion-stuff/v4-types';
import React, { FC, useEffect, useState } from 'react';
import prism from 'prismjs';
import 'clipboard';
import 'prism-themes/themes/prism-dracula.css';
import { NotionBlocksHtmlParser } from '@notion-stuff/blocks-html-parser';
import parse, { domToReact } from 'html-react-parser';
import BlogCard from './BlogCard';
import tocbot from 'tocbot';

interface FetchRequest {
  url: string;
  options: object;
}

async function fetchAsync(request: FetchRequest) {
  return await fetch(request.url, request.options);
}

type Props = {
  blocks: Blocks;
};

const Html: FC<Props> = ({ blocks }) => {
  const [html, setHtml] = useState(
    parse(
      '<p>只今、記事の読み込み中です。恐れ入りますが今しばらくお待ちください</p>'
    )
  );

  const SyntaxHighlighter = (code: any, language: string) => {
    require('prismjs/plugins/toolbar/prism-toolbar.min.css');
    require('prismjs/plugins/toolbar/prism-toolbar.min');
    require('prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min');
    require('prismjs/plugins/show-language/prism-show-language');

    return code;
  };

  const NotionToHtml = async (blocks: Blocks) => {
    const CustomNotion = NotionBlocksHtmlParser.getInstance({
      mdParserOptions: {
        imageAsFigure: true,
        emptyParagraphToNonBreakingSpace: true,
      },
      mdToHtmlOptions: {
        pedantic: false,
        gfm: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false,
        langPrefix: 'language-',
      },
      mdHighlightingOptions(code, lang, callback: any) {
        callback = SyntaxHighlighter;
        const language = lang;
        return callback(code, language);
      },
    });

    const notionToHtml = CustomNotion.parse(blocks);

    const before = parse(notionToHtml);

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
              <a href={cardData.url} {...blankProp} data-nemui="nemui">
                {domToReact(node.children)}
              </a>
            );
          }
          return (
            <a {...node.attribs} target="_blank" data-nemukunai="nemukunaiyou">
              {domToReact(node.children)}
            </a>
          );
        }
      };

      const change = parse(notionToHtml, { replace });

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
