import { IndexProps } from '@/types/types';
import { getForumla, getSelect } from '@/utils/property';
import Link from 'next/link';
import React, { FC } from 'react';

const CategoryMenu: FC<IndexProps> = ({ pages }) => {
	const categories = pages.map((page) =>
		getSelect(page.properties.category.select)
	);

	const array = new Set(categories);
	const uniqueCategories = Array.from(array);
	return (
		<div className="mt-[78px] xl:hidden w-full bg-gray-800">
			<ul className="w-full max-w-6xl mx-auto py-2 xl:px-10 flex">
				{uniqueCategories.includes('study-recording') && (
					<li className="mr-4">
						<Link
							className="text-gray-400 duration-500 hover:text-gray-200 text-base md:text-sm"
							href="/study/study-recording"
						>
							学習経過記録
						</Link>
					</li>
				)}
				{uniqueCategories.includes('it') && (
					<li className="mr-4">
						<Link
							className="text-gray-400 duration-500 hover:text-gray-200 md:text-sm text-base"
							href="/study/it"
						>
							IT知識
						</Link>
					</li>
				)}
				{uniqueCategories.includes('server') && (
					<li className="mr-4">
						<Link
							className="text-gray-400 duration-500 hover:text-gray-200 md:text-sm text-base"
							href="/study/sickness"
						>
							病気
						</Link>
					</li>
				)}
				{uniqueCategories.includes('security') && (
					<li className="mr-4">
						<Link
							className="text-gray-400 duration-500 hover:text-gray-200  md:text-sm text-base"
							href="/study/transcription"
						>
							文字起こし
						</Link>
					</li>
				)}
				{uniqueCategories.includes('programming') && (
					<li className="mr-4">
						<Link
							className="text-gray-400 duration-500 hover:text-gray-200 text-base md:text-sm"
							href="/study/programming"
						>
							プログラミング
						</Link>
					</li>
				)}
				{uniqueCategories.includes('design') && (
					<li className="mr-4">
						<Link
							className="text-gray-400 duration-500 hover:text-gray-200 text-base md:text-sm"
							href="/study/design"
						>
							デザイン
						</Link>
					</li>
				)}
				{uniqueCategories.includes('health') && (
					<li className="mr-4">
						<Link
							className="text-gray-400 duration-500 hover:text-gray-200 text-base md:text-sm"
							href="/study/health"
						>
							健康
						</Link>
					</li>
				)}
				{uniqueCategories.includes('others') && (
					<li>
						<Link
							className="text-gray-400 duration-500 hover:text-gray-200 text-base md:text-sm"
							href="/study/others"
						>
							その他
						</Link>
					</li>
				)}
			</ul>
		</div>
	);
};

export default CategoryMenu;

<ul className="w-full max-w-6xl mx-auto py-2 xl:px-10 flex">
	<li className="mr-4">
		<Link
			className="text-gray-400 duration-500 hover:text-gray-200 md:text-sm text-base"
			href="/study/it"
		>
			IT知識
		</Link>
	</li>
	<li className="mr-4">
		<Link
			className="text-gray-400 duration-500 hover:text-gray-200 md:text-sm text-base"
			href="/study/server"
		>
			サーバー
		</Link>
	</li>
	<li className="mr-4">
		<Link
			className="text-gray-400 duration-500 hover:text-gray-200  md:text-sm text-base"
			href="/study/security"
		>
			セキュリティ
		</Link>
	</li>
	<li className="mr-4">
		<Link
			className="text-gray-400 duration-500 hover:text-gray-200 text-base md:text-sm"
			href="/study/programming"
		>
			プログラミング
		</Link>
	</li>
	<li className="mr-4">
		<Link
			className="text-gray-400 duration-500 hover:text-gray-200 text-base md:text-sm"
			href="/study/linux"
		>
			Linux
		</Link>
	</li>
	<li className="mr-4">
		<Link
			className="text-gray-400 duration-500 hover:text-gray-200 text-base md:text-sm"
			href="/study/design"
		>
			デザイン
		</Link>
	</li>
	<li className="mr-4">
		<Link
			className="text-gray-400 duration-500 hover:text-gray-200 text-base md:text-sm"
			href="/study/health"
		>
			健康
		</Link>
	</li>
	<li>
		<Link
			className="text-gray-400 duration-500 hover:text-gray-200 text-base md:text-sm"
			href="/study/others"
		>
			その他
		</Link>
	</li>
</ul>;
