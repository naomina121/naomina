import Head from 'next/head';
import Link from 'next/link';
import { NextPage } from 'next';
import { siteConfig } from '@/site.config';
import { FC } from 'react';

interface MetaData {
	pageTitle?: string;
	pageDescription?: string;
	pagePath?: string;
	pageImg?: string;
	pageImgWidth?: number;
	pageImgHeight?: number;
}

const Seo: FC<MetaData> = ({
	pageTitle,
	pageDescription,
	pagePath,
	pageImg,
	pageImgWidth,
	pageImgHeight,
}) => {
	const defaultTitle = siteConfig.title;
	const defaultDescription = pageTitle + 'のページです';

	const title = pageTitle ? `${pageTitle} | ${defaultTitle}` : defaultTitle;
	const description = pageDescription ? pageDescription : defaultDescription;
	const url = pagePath;
	const imgUrl = pageImg;
	const imgWidth = pageImgWidth ? pageImgWidth : 1280;
	const imgHeight = pageImgHeight ? pageImgHeight : 640;

	return (
		<Head>
			<title>{title}</title>
			<meta name="viewport" content="width=device-width,initial-scale=1.0" />
			<meta name="description" content={description} />
			<meta property="og:url" content={url} />
			<meta property="og:title" content={title} />
			<meta property="og:site_name" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:type" content="website" />
			<meta property="og:image" content={imgUrl} />
			<meta property="og:image:width" content={String(imgWidth)} />
			<meta property="og:image:height" content={String(imgHeight)} />
			<link rel="manifest" href="/manifest.json" />
			<link rel="apple-touch-icon" href="/icon.png"></link>
			<meta name="theme-color" content="#fbbf24" />
			<meta name="twitter:card" content="summary_large_image" />
			<link rel="preconnect" href="https://fonts.gstatic.com" />
			<link rel="canonical" href={url} />
		</Head>
	);
};

export default Seo;
