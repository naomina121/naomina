import { useMediaQuery } from 'react-responsive';
import Breadcrumb from '@/components/Breadcrumb';
import Layout from '@/components/Layout';
import { ArticleProps, Params } from '@/types/types';
import { fetchBlocksByPageId, fetchPages } from '@/utils/notion';
import {
	getSelect,
	getDate,
	getMultiSelect,
	getText,
	getUpdate,
	getForumla,
} from '@/utils/property';

import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import React, { FC, useEffect } from 'react';
import CategoryMenu from '@/components/CategoryMenu';
import dateToTime from '@/hooks/dateToTime';
import Link from 'next/link';
import Sns from '@/components/post/Sns';
import Toc from '@/components/post/Toc';
import Seo from '@/components/Seo';
import { siteConfig } from '@/site.config';
import MainToc from '@/components/post/MainToc';
import SearchButton from '@/components/SearchButtopn';
import Author from '@/components/post/Author';
import Html from '@/components/post/Html';
import { useRouter } from 'next/router';
import useConfirm from '@/hooks/use-confirm';

interface FetchRequest {
	url: string;
	options: object;
}

async function fetchAsync(request: FetchRequest) {
	return await fetch(request.url, request.options);
}

export const getStaticProps: GetStaticProps = async (ctx) => {
	const { slug } = ctx.params as Params;
	const { results: slugContent } = await fetchPages({ slug: slug });
	const { results: contents } = await fetchPages({});
	if (!slugContent.length) {
		return {
			notFound: true,
		};
	}
	const pages = contents;
	const page = slugContent[0];
	const pageId = page.id;
	const { results: blocks } = await fetchBlocksByPageId(pageId);

	return {
		props: {
			page: page,
			blocks: blocks,
			pages: pages,
		},
		revalidate: 60 * 60 * 24,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking',
	};
};

const Article: FC<ArticleProps> = ({ page, blocks, pages }) => {
	const router = useRouter();
	const isBreakPoint = useMediaQuery({ query: `(max-width:1320px)` });
	const url = `../../../api/image/${getSelect(
		page.properties.category.select
	)}/${getText(page.properties.slug.rich_text)}/?slug=${getText(
		page.properties.slug.rich_text
	)}&cat=${getSelect(page.properties.category.select)}`;

	const ogpUrl = `${siteConfig.siteUrl}api/image/${getSelect(
		page.properties.category.select
	)}/${getText(page.properties.slug.rich_text)}/?slug=${getText(
		page.properties.slug.rich_text
	)}&cat=${getSelect(page.properties.category.select)}`;

	const slug = getText(page.properties.slug.rich_text);
	const lastUpDate = getUpdate(page.properties.update.last_edited_time);

	const isExpired = (blocks: Array<any>): boolean => {
		const now = Date.now();

		const imageArray = blocks.filter(
			(block) => block.type === 'image' && block.image.file.expiry_time
		);

		const newFindArry = imageArray.find((block) => {
			const image = block.image.file.expiry_time;
			return Date.parse(image) < now;
		});

		if (newFindArry === undefined) {
			return false;
		}
		return true;
	};

	const { fc } = useConfirm();
	const { cmp } = useConfirm();
	const { confirm } = fc;

	useEffect(() => {
		(async function () {
			try {
				if (!isExpired(blocks)) {
					const diffRes = await fetchAsync({
						url: `../../../api/diff`,
						options: {
							method: 'POST',
							body: JSON.stringify({
								slug: slug,
								lastUpDate: lastUpDate,
							}),
						},
					});
					if (diffRes.status !== 200) {
						throw new Error('diffRes:status:' + diffRes.status);
					}
				}

				const res = await fetchAsync({
					url: `../../../api/isr/req?path=${`/study/${getSelect(
						page.properties.category.select
					)}/${getText(page.properties.slug.rich_text)}`}`,
					options: {
						method: 'GET',
					},
				});
				if (res.status !== 200) {
					throw new Error('res:status:' + res.status);
				}
				const options = {
					html: true,
					alert: true,
				};

				await confirm({ ...options })
					.then(() => {
						cmp.resolve = () => {};
						router.reload();
						return true;
					})
					.catch(() => {
						cmp.reject = () => {};
						return true;
					});
			} catch (err) {
				console.error(err);
			}
		})();
	}, []);

	const dataUpdate = dateToTime(
		getUpdate(page.properties.update.last_edited_time),
		'YYYY-MM-DD'
	);

	const datePublished = dateToTime(
		getDate(page.properties.published.date),
		'YYYY-MM-DD'
	);

	const update = dateToTime(
		getUpdate(page.properties.update.last_edited_time),
		'YYYY年MM月DD日'
	);

	const published = dateToTime(
		getDate(page.properties.published.date),
		'YYYY年MM月DD日'
	);

	return (
		<Layout>
			<Seo
				pageTitle={getText(page.properties.name.title)}
				pageDescription={getText(page.properties.description.rich_text)}
				pageImg={ogpUrl}
				pageImgWidth={1152}
				pageImgHeight={622}
				pagePath={`${siteConfig.siteUrl}study/${getSelect(
					page.properties.category.select
				)}/${getText(page.properties.slug.rich_text)}`}
			/>
			<CategoryMenu pages={pages} />
			<div className="xl:pt-[98px] xl:px-5 w-full bg-gray-200">
				<div className="w-full max-w-6xl xl:max-w-4xl mx-auto md:py-5 md:pt-0 flex justify-between py-10">
					<div className=" bg-white xl:max-w-6xl xl:mx-auto w-full max-w-3xl shadow-md post rounded-md">
						<div className="p-10 xl:p-5 xl:pb-0 pt-7 pb-0">
							<div className="flex items-center justify-between meta md:flex-col md:items-start">
								{/* time */}
								<div className="flex items-center justify-start xl:mb-2">
									<i className="text-gray-500 text-sm ri-time-line lg:text-xs"></i>
									<time
										className="text-sm text-gray-500 lg:text-xs"
										itemProp="datepublished"
										dateTime={datePublished}
									>
										{published}
									</time>
									<i className="text-gray-500 lg:text-xs ml-2 text-sm ri-history-line"></i>
									<time
										className="text-gray-500 lg:text-xs text-sm"
										itemProp="modified"
										dateTime={dataUpdate}
									>
										{update}
									</time>
								</div>
								{/* category */}
								<div className="flex justify-start">
									<p className="m-0 p-0 flex">
										<span
											className={
												getSelect(page.properties.category.select) +
												' text-xs p-1 border-[1px] px-2 xl:text-[12px] text-white rounded-sm'
											}
										>
											{getForumla(page.properties.isJaCategory.formula)}
										</span>
									</p>
									{/* tag */}
									<p className="m-0 p-0 ml-2 flex">
										{getMultiSelect(page.properties.tags.multi_select).map(
											(tag: string, index: number) => (
												<Link
													key={index}
													className="text-xs p-1 px-2 m-0 rounded-sm text-gray-400 font-medium mr-2 xl:text-[12px] hover:text-gray-600  border-[1px]
                          border-gray-400 align-middle"
													href={`/tag/${tag}`}
												>{`#${tag} `}</Link>
											)
										)}
									</p>
								</div>
							</div>
							<h1 className="mt-3 mb-5 w-full text-3xl xl:mb-3 xl:text-xl md:text-[18px]">
								{getText(page.properties.name.title)}
							</h1>
						</div>
						<Image
							src={url}
							width="768"
							height="360"
							alt={getText(page.properties.name.title)}
							className="object-cover w-full mb-10 xl:mb-0"
						/>
						<div className="p-10 xl:p-5 py-0 context">
							{isBreakPoint ? <MainToc /> : <></>}
							<Html blocks={blocks} />
						</div>
						<div className="my-10 xl:px-5 px-10 xl:mb-0">
							<Sns page={page} />
							<Author />
						</div>
					</div>
					<div className="xl:hidden aside w-full max-w-xs">
						<SearchButton pages={pages} />
						{/* 目次 */}
						<Toc />
					</div>
				</div>
			</div>
			<Breadcrumb
				breadList={`study/${getSelect(
					page.properties.category.select
				)}/${getText(page.properties.slug.rich_text)}`}
				breadListJs={`学習記録/${getForumla(
					page.properties.isJaCategory.formula
				)}/${getText(page.properties.name.title)}`}
			/>
		</Layout>
	);
};

export default Article;
