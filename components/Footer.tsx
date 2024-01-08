import { siteConfig } from '@/site.config';
import Link from 'next/link';
import React from 'react';
import 'remixicon/fonts/remixicon.css';

const Footer = () => {
	const now = new Date();
	const year = now.getFullYear();
	return (
		<footer className="py-4 bg-gray-900">
			<div className="max-w-6xl xl:px-5 w-full my-5 py-5 mx-auto border-solid border-b-[1px] lg:border-none border-gray-700">
				<nav>
					<ul className="footer-menu flex lg:flex-col lg:items-start items-center footer-menu">
						<li>
							<Link className="text-gray-300 mr-5 text-base" href="/">
								ホーム
							</Link>
						</li>
						<li>
							<Link className="text-gray-300 mr-5 text-base" href="/#about">
								当サイトについて
							</Link>
						</li>
						<li>
							<Link className="text-gray-300 mr-5 text-base" href="/#skils">
								現在のスキル
							</Link>
						</li>
						<li>
							<Link className="text-gray-300 mr-5 text-base" href="/study">
								学習記録
							</Link>
						</li>
						<li>
							<Link className="text-gray-300 mr-5 text-base" href="/#contact">
								お問い合わせ
							</Link>
						</li>
						<li>
							<Link className="text-gray-300 text-base mr-5" href="/news">
								お知らせ一覧
							</Link>
						</li>
						<li>
							<Link className="text-gray-400 text-sm" href="/privacy">
								プライバシーポリシー
							</Link>
						</li>
					</ul>
				</nav>
			</div>
			<div className="max-w-6xl xl:px-5 w-full my-5 py-5 mx-auto">
				<div className="text-3xl font-['Montserrat',sans-serif] font-black text-white flex-end">
					<span className="font-['Montserrat',sans-serif] text-amber-400 pr-2">
						NAO
					</span>
					BLOG
				</div>
				<div className="flex my-6">
					<Link href={siteConfig.twitterUrl} target="_blank">
						<i className="rounded-full p-2 w-[36px] h-[36px] bg-gray-700 ri-twitter-x-fill text-gray-300 text-2xl mr-4 hover:text-white hover:bg-[#xF3E6;]"></i>
					</Link>
					<Link href={siteConfig.githubUrl} target="_blank">
						<i className="rounded-full p-2 w-[40px] h-[40px] bg-gray-700 ri-github-fill text-gray-300 text-2xl hover:text-white hover:bg-[#2dba4e]"></i>
					</Link>
				</div>
			</div>
			<small className="text-white/80 block xl:px-5 w-full mx-auto max-w-6xl">
				© {year} {siteConfig.title}
			</small>
		</footer>
	);
};

export default Footer;
