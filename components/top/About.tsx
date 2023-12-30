import { siteConfig } from '@/site.config';
import { TopProps } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const About: FC<TopProps> = ({ item }) => {
	return (
		<div id="about" ref={item}>
			<div className="bg-about py-40 pt-24 text-white relative h-full max-h-smart">
				<p className="text-white w-full text-5xl text-center md:mb-10 mb-20 font-['Montserrat',sans-serif] relative">
					<span className="anime-title">
						<b>ABOUT</b>
					</span>
				</p>
				<div className="flex about-box max-w-6xl my-0 mx-auto justify-between">
					<div className="w-full max-w-lg">
						<p className="about-sub-title font-['Montserrat',sans-serif] text-white mb-10 font-semibold">
							<span className="tracking-wide font-black text-amber-400 mr-3">
								NAO
							</span>
							<span>BLOG</span>
							<span className="ml-4">について</span>
						</p>
						<p className="text-white skil-text leading-8">
							当サイトは、趣味であるプログラミングの知識をまとめているサイトです。
						</p>
						<p className="text-white skil-text leading-8 my-5">
							ちなみにこのサイトは、Next.js、TypeScript、NotionAPIを利用して、
							<span className="font-bold text-amber-400">
								Notionで書いた記事がサイトに反映される
							</span>
							ようにしています。
						</p>

						<p className="text-white skil-text leading-8">
							全くReactやNext.js触ったことがないので、改善の点もあるかと思いますが
							<Link
								href={siteConfig.githubUrl + '/naomina'}
								className="font-black text-xl text-sky-300 border-dotted border-b-2 my-5 mx-3 border-sky-300 hover:border-none"
								target="_blank"
							>
								GitHub
							</Link>
							にてソースコードを公開していますので、ご興味のある方は、ご覧くださいませ。
						</p>

						<Link
							href="/study"
							className="block mt-10 font-bold mx-0 py-4 max-w-xs text-center text-bas bg-gradient-to-r from-amber-500
              transition duration-0 ease-in-out to-yellow-500 hover:from-green-400 hover:to-blue-500 hover:duration-700 xl:text-base xl:mx-auto"
						>
							ブログはこちら
						</Link>
					</div>
					<div className="border-solid border-4 border-sky-500">
						<Image
							alt="pcで操作している人"
							src="/img/about.jpg"
							width="1280"
							height="853"
							className="
                max-w-lg w-full h-full object-cover"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
