import { TopProps } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const About: FC<TopProps> = ({ item }) => {
  return (
    <div id="about" ref={item}>
      <div className="bg-about p-40 pt-20 text-white relative h-full max-h-smart">
        <p className="text-white w-full text-5xl text-center mb-20 font-['Montserrat',sans-serif] relative">
          ABOUT
        </p>
        <div className="flex max-w-7xl my-0 mx-auto justify-around">
          <div className="w-full mr-10 max-w-lg">
            <p className="text-white">
              {/* <span className="text-amber-400 inline-block mr-5 text-xl">
                    ★
                  </span>
                  ITの知識をしっかり身につけ、楽しみながら学んでいく */}
            </p>
            <p className="text-white mb-10 text-3xl font-semibold">
              学習した事を即座に
              <span className="text-amber-400">アウトプット</span>
            </p>
            <p className="text-white">
              初めまして、未経験でエンジニアを目指しているナオと申します。
            </p>
            <p className="text-white">
              学習の際に、Notionでまとめたものをそのままブログに発信できたらという思いで、このサイトを作成しました！
            </p>
            <p className="text-white">
              人目に触れることにより、サボりがちな自分の癖を無くしていこうと思います！
            </p>
            <Link
              href="#"
              className="block mt-10 font-bold mx-0 p-2 py-4 max-w-xs text-center bg-amber-500 text-bas"
            >
              アウトプットはこちら
            </Link>
          </div>
          <div className="border-solid border-4 border-sky-500">
            <Image
              alt="pcで操作している人"
              src="/img/about.jpg"
              width="1280"
              height="853"
              className="
                max-w-2xl w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
