import Image from 'next/image';
import React from 'react';

const Author = () => {
	return (
		<div className="border-[1px] p-4 border-gray-300 my-10 xl:my-5">
			<h2 className="border-b-[1px] border-gray-300">この記事を書いた人</h2>
			<div className="mt-4 flex items-center justify-between xl:flex-col">
				<Image
					src="/img/author.jpg"
					alt="ナオ"
					width="125"
					height="125"
					className="rounded-full sm:max-w-sm"
				/>
				<div className="w-full p-4">
					<h3>ナオ</h3>
					<p>プログラミングが好きで、寝食を忘れてしまう普通の人です。</p>
					<p>
						現在は、自分の健康や生活をより良くするために、情報発信していければと思います。
					</p>
				</div>
			</div>
		</div>
	);
};

export default Author;
