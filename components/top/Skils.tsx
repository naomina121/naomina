import { showSlils, skilsOptions } from '@/hooks/top/skils';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { TopProps } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useRef } from 'react';

const Skils: FC<TopProps> = ({ item }) => {
	const s1 = useRef<HTMLDivElement>(null);
	const s2 = useRef<HTMLDivElement>(null);
	const s3 = useRef<HTMLDivElement>(null);
	const s4 = useRef<HTMLDivElement>(null);
	const s5 = useRef<HTMLDivElement>(null);
	const s6 = useRef<HTMLDivElement>(null);
	const s7 = useRef<HTMLDivElement>(null);
	const s8 = useRef<HTMLDivElement>(null);

	useIntersectionObserver(
		[s1, s2, s3, s4, s5, s6, s7, s8],
		showSlils,
		skilsOptions
	);
	return (
		<div
			id="skils"
			ref={item}
			className="overlay xl:py-10 xl:px-5 p-20 pt-5 text-white relative h-full"
		>
			<Image
				alt="パソコンとスマホの画面を確認しながら仕事をしている人"
				src="/img/skil.jpg"
				width="1280"
				height="853"
				className="absolute top-0 left-0 min-w-full object-cover min-h-full"
			/>

			{/* skilsのテキスト */}

			<div className="relative min-w-full min-h-full z-20 top-0 left-1/2 translate-x-[-50%] w-full">
				<div className="flex flex-col items-center text-white z-20 justify-start relative md:mt-0 my-20 xl:my-6">
					<p className="text-white w-full text-5xl text-center xl:pb-10 xl:mb-6 md:mb-0 mb-20 px-16 font-['Montserrat',sans-serif] relative">
						<span className="anime-title skil">
							<b>SKILS</b>
						</span>
					</p>
					<p className="skil-text text-white text-xl">
						現在のスキルとしては、ReactやTypeScriptなども学びながらコードを書いています。
					</p>
					<p className="skil-text text-white text-xl">
						制作実績に関しては、「
						<Link
							className="underline text-blue-400 font-bold hover:opacity-80 hover:no-underline"
							href="/work"
						>
							WORK
						</Link>
						」のページにてご確認いただけます。
					</p>
					<p className="skil-text text-white text-xl">
						また、
						<span className="text-amber-400 font-bold pr-2">
							役立つアプリ開発などがあれば積極的に取り組みたいという考えです。
						</span>
					</p>
				</div>
				{/* progressbar */}
				<div className="progress-container">
					<div
						ref={s1}
						className="progress-item"
						data-percent="60"
						data-duration="2200"
						data-stroke-width="8"
						data-stroke-color="#00ccff"
						data-start-position="default"
					>
						<div className="progress-item__inner">
							<svg className="progress-svg" viewBox="0 0 100 100">
								<circle
									className="progress-background"
									cx="50"
									cy="50"
									r="45"
								></circle>
								<circle
									className="progress-bar"
									cx="50"
									cy="50"
									r="45"
								></circle>
							</svg>
							<div className="progress-text">
								<span className="progress-value">0</span>
								<span className="progress-unit">%</span>
							</div>
						</div>
						<div className="progress-title">React</div>
					</div>
					<div
						ref={s2}
						className="progress-item"
						data-percent="40"
						data-duration="2200"
						data-stroke-width="8"
						data-stroke-color="#adff00"
						data-start-position="default"
					>
						<div className="progress-item__inner">
							<svg className="progress-svg" viewBox="0 0 100 100">
								<circle
									className="progress-background"
									cx="50"
									cy="50"
									r="45"
								></circle>
								<circle
									className="progress-bar"
									cx="50"
									cy="50"
									r="45"
								></circle>
							</svg>
							<div className="progress-text">
								<span className="progress-value">0</span>
								<span className="progress-unit">%</span>
							</div>
						</div>
						<div className="progress-title">TypeScript</div>
					</div>
					<div
						ref={s3}
						className="progress-item"
						data-percent="50"
						data-duration="2200"
						data-stroke-width="8"
						data-stroke-color="#5b86dd"
						data-start-position="default"
					>
						<div className="progress-item__inner">
							<svg className="progress-svg" viewBox="0 0 100 100">
								<circle
									className="progress-background"
									cx="50"
									cy="50"
									r="45"
								></circle>
								<circle
									className="progress-bar"
									cx="50"
									cy="50"
									r="45"
								></circle>
							</svg>
							<div className="progress-text">
								<span className="progress-value">0</span>
								<span className="progress-unit">%</span>
							</div>
						</div>
						<div className="progress-title">PHP</div>
					</div>
					<div
						ref={s4}
						className="progress-item"
						data-percent="40"
						data-duration="2200"
						data-stroke-width="8"
						data-stroke-color="#dda060"
						data-start-position="default"
					>
						<div className="progress-item__inner">
							<svg className="progress-svg" viewBox="0 0 100 100">
								<circle
									className="progress-background"
									cx="50"
									cy="50"
									r="45"
								></circle>
								<circle
									className="progress-bar"
									cx="50"
									cy="50"
									r="45"
								></circle>
							</svg>
							<div className="progress-text">
								<span className="progress-value">0</span>
								<span className="progress-unit">%</span>
							</div>
						</div>
						<div className="progress-title">SQL</div>
					</div>
					<div
						ref={s5}
						className="progress-item"
						data-percent="40"
						data-duration="2200"
						data-stroke-width="8"
						data-stroke-color="#dd5bcc"
						data-start-position="default"
					>
						<div className="progress-item__inner">
							<svg className="progress-svg" viewBox="0 0 100 100">
								<circle
									className="progress-background"
									cx="50"
									cy="50"
									r="45"
								></circle>
								<circle
									className="progress-bar"
									cx="50"
									cy="50"
									r="45"
								></circle>
							</svg>
							<div className="progress-text">
								<span className="progress-value">0</span>
								<span className="progress-unit">%</span>
							</div>
						</div>
						<div className="progress-title">Python</div>
					</div>
					<div
						ref={s6}
						className="progress-item"
						data-percent="40"
						data-duration="2200"
						data-stroke-width="8"
						data-stroke-color="#51b936"
						data-start-position="default"
					>
						<div className="progress-item__inner">
							<svg className="progress-svg" viewBox="0 0 100 100">
								<circle
									className="progress-background"
									cx="50"
									cy="50"
									r="45"
								></circle>
								<circle
									className="progress-bar"
									cx="50"
									cy="50"
									r="45"
								></circle>
							</svg>
							<div className="progress-text">
								<span className="progress-value">0</span>
								<span className="progress-unit">%</span>
							</div>
						</div>
						<div className="progress-title">Linux</div>
					</div>
					<div
						ref={s7}
						className="progress-item"
						data-percent="40"
						data-duration="2200"
						data-stroke-width="8"
						data-stroke-color="#56cbbc"
						data-start-position="default"
					>
						<div className="progress-item__inner">
							<svg className="progress-svg" viewBox="0 0 100 100">
								<circle
									className="progress-background"
									cx="50"
									cy="50"
									r="45"
								></circle>
								<circle
									className="progress-bar"
									cx="50"
									cy="50"
									r="45"
								></circle>
							</svg>
							<div className="progress-text">
								<span className="progress-value">0</span>
								<span className="progress-unit">%</span>
							</div>
						</div>
						<div className="progress-title">SCSS</div>
					</div>
					<div
						ref={s8}
						className="progress-item"
						data-percent="60"
						data-duration="2200"
						data-stroke-width="8"
						data-stroke-color="#dd5b5b"
						data-start-position="default"
					>
						<div className="progress-item__inner">
							<svg className="progress-svg" viewBox="0 0 100 100">
								<circle
									className="progress-background"
									cx="50"
									cy="50"
									r="45"
								></circle>
								<circle
									className="progress-bar"
									cx="50"
									cy="50"
									r="45"
								></circle>
							</svg>
							<div className="progress-text">
								<span className="progress-value">0</span>
								<span className="progress-unit">%</span>
							</div>
						</div>
						<div className="progress-title">Typing</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Skils;
