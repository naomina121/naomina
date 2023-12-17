import { FirstViewProps } from '@/types/types';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import React, { FC, useState } from 'react';
import { GetServerSideProps } from 'next';
import { fetchNewsPages } from '@/utils/notion';
import { getDate, getForumla, getSelect, getText } from '@/utils/property';
import Link from 'next/link';
import dateToTime from '@/hooks/dateToTime';

const FirstView: FC<FirstViewProps> = ({ item, pages }) => {
	const isBreakPoint = useMediaQuery({ query: `(max-width:1320px)` });
	//ニュースの部分
	const [openMenu, setOpenMenu] = useState(false);
	const menuFunction = () => {
		setOpenMenu(!openMenu);
	};
	return (
		<div id="home" ref={item} className="relative h-full max-h-smart">
			<div className="relative w-full max-h-smart overflow-hidden overlay">
				{isBreakPoint ? (
					<Image
						alt="タイピング入力をしている人"
						width="1152"
						height="622"
						src="/img/top.jpg"
						className="hidden xl:block absolute top-0 left-0 min-w-full	max-h-smart object-cover"
					/>
				) : (
					<video
						src={require('@/public/movie/header_movie.mp4')}
						className="absolute top-0 left-0 min-w-full	max-h-smart object-cover xl:hidden"
						muted
						autoPlay
						loop
						playsInline
					/>
				)}
			</div>
			{/* firstview_text */}
			<div
				className="absolute min-w-full min-h-full translate-y-[-50%] top-1/2
          left-1/2 translate-x-[-50%] w-full"
			>
				<div className="max-h-smart max-w-6xl mx-auto flex flex-col items-center text-white justify-center relative">
					<p className="xl:relative text-white sub-title">
						<span>プログラミングなどを、挑戦する個人的学習記録</span>
					</p>
					<p className="text-white  title font-['Montserrat',sans-serif] font-black">
						<span className="w-full flex">
							<span className="text-amber-400 md:pr-0 pr-2 ">RECORD</span>
							<span className="flex w-full ml-2">OF THE STUDY</span>
						</span>
					</p>
					<Link
						href="/study"
						className="study-link relative top-12 md:top-5 w-80 text-center py-4 xl:py-3 rounded-full font-base z-40 bg-gray-800 hover:bg-gradient-to-t hover:from-amber-600
              transition duration-1 ease-in-out hover:to-yellow-500 text-white/90"
					>
						学習記録を見る
					</Link>
				</div>
				{/* firstview_bottom */}
				<div className="w-full h-full overflow-y-hidden md:overflow-x-auto absolute top-0 left-0">
					<div
						className={
							openMenu
								? 'absolute w-full bg-gray-800/80 text-gray-300 bottom-0'
								: 'absolute min-w-max w-full bg-gray-800/80 text-gray-300 bottom-[-100px]'
						}
					>
						<div className="max-w-6xl md:max-w-full mx-auto w-full justify-between flex">
							<div className="max-w-5xl md:max-w-full w-full flex">
								<ul className="w-full flex flex-col justify-between">
									{pages.map((page, index) => (
										<li key={index} className="flex w-full justify-between">
											<span className="mr-10 md:mr-5 md:text-[12px] flex justify-center text-base items-center bg-gray-900 w-[100px] md:max-w-[50px] md:w-full md:px-4">
												{index === 0 ? (
													<span className="py-3">News</span>
												) : (
													<span className="py-3">&nbsp;</span>
												)}
											</span>
											<div className="w-full flex items-center justify-start">
												<time
													itemProp="datepublished"
													dateTime={dateToTime(
														getDate(page.properties.published.date),
														'YYYY-MM-DD'
													)}
													className="text-base mr-10 md:mr-5 md:text-[12px] text-ellipsis whitespace-nowrap"
												>
													{dateToTime(
														getDate(page.properties.published.date),
														'YYYY年MM月DD日'
													)}
												</time>
												<Link
													href={
														'/news/' +
														getSelect(page.properties.category.select)
													}
													className={
														getSelect(page.properties.category.select) +
														' text-base text-center rounded w-[150px] py-[2px] mr-10 text-ellipsis whitespace-nowrap md:text-[10px] md:mr-5 md:w-[90px]'
													}
												>
													{getForumla(page.properties.isJaCategory.formula)}
												</Link>
												<Link
													href={
														'/news/' +
														getSelect(page.properties.category.select) +
														'/' +
														getForumla(page.properties.newsSlug.formula)
													}
													className="md:text-[12px] text-base hover:opacity-80 underline hover:no-underline text-ellipsis whitespace-nowrap"
												>
													{getText(page.properties.name.title)}
												</Link>
											</div>
										</li>
									))}
								</ul>
							</div>
							<button
								className={openMenu ? 'open arrow' : 'arrow md:hidden'}
								onClick={() => menuFunction()}
							></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FirstView;
