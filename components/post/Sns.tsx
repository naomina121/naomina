import { siteConfig } from '@/site.config';
import { ContentBottomProps } from '@/types/types';
import { getSelect, getText } from '@/utils/property';
import React, { FC } from 'react';
import {
  TwitterShareButton,
  FacebookShareButton,
  HatenaShareButton,
  TwitterIcon,
  FacebookIcon,
  HatenaIcon,
} from 'react-share';

const Sns: FC<ContentBottomProps> = (page) => {
  const snsUrl =
    siteConfig.siteUrl +
    'study/' +
    getSelect(page.page.properties.category.select) +
    '/' +
    getText(page.page.properties.slug.rich_text);

  const snsTitle = getText(page.page.properties.name.title);

  return (
    <div className="flex flex-wrap justify-between">
      <div className="sns-button twitter">
        <TwitterShareButton url={snsUrl} title={snsTitle}>
          <TwitterIcon size={45} round={false} />
          <span className="xl:hidden">Twitter</span>
        </TwitterShareButton>
      </div>
      <div className="sns-button facebook">
        <FacebookShareButton url={snsUrl} quote={snsTitle}>
          <FacebookIcon size={45} round={false} />
          <span className="xl:hidden">FaceBook</span>
        </FacebookShareButton>
      </div>
      <div className="sns-button hatena">
        <HatenaShareButton url={snsUrl} title={snsTitle}>
          <HatenaIcon size={45} round={false} />
          <span className="xl:hidden">Hatena</span>
        </HatenaShareButton>
      </div>
    </div>
  );
};

export default Sns;
