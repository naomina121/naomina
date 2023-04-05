import { TopProps } from '@/types/types';
import Link from 'next/link';
import React, { FC, useState } from 'react';

const FirstView: FC<TopProps> = ({ item }) => {
  //ニュースの部分
  const [openMenu, setOpenMenu] = useState(false);
  const menuFunction = () => {
    setOpenMenu(!openMenu);
  };
  return (
    <div id="home" ref={item} className="relative h-full max-h-smart">
      <div className="relative w-full max-h-smart overflow-hidden overlay">
        <video
          src={require('@/public/movie/header_movie.mp4')}
          className="absolute top-0 left-0 min-w-full	max-h-smart object-cover"
          muted
          autoPlay
          loop
          playsInline
        />
      </div>
      {/* firstview_text */}
      <div
        className="absolute min-w-full min-h-full translate-y-[-50%] z-20 top-1/2
          left-1/2 translate-x-[-50%] w-full"
      >
        <div className="max-h-smart flex flex-col items-center text-white z-20 justify-center relative">
          <p className="xl:relative xl:top-10 text-white sub-title">
            <span>未経験からエンジニアを目指すための個人学習記録サイト</span>
          </p>
          <p className="text-white xl:top-10 xl:relative title font-['Montserrat',sans-serif] font-black">
            <span className="w-full flex">
              <span className="text-amber-400 pr-2">RECORD</span>
              <span className="flex w-full ml-2">OF THE STUDY</span>
            </span>
          </p>
        </div>
        {/* firstview_bottom */}
        <div
          className={
            openMenu
              ? 'max-h-[9rem] h-full absolute overflow-y-hidden bottom-0 left-0 z-30 bg-gray-800/80 w-full text-white flex justify-around items-center transition-animation'
              : 'absolute overflow-y-hidden bottom-0 left-0 h-[50px] z-30 bg-gray-800/80 w-full text-white flex justify-around items-center lg:hidden'
          }
        >
          <div
            className={
              openMenu
                ? 'max-w-screen-xl m-auto bottom-0 relative flex justify-between items-center w-full'
                : 'max-w-screen-xl m-auto relative flex justify-between items-center w-full'
            }
          >
            <div className="w-full h-full">
              <ul className="flex items-center justify-center flex-col max-h-[45px] w-full">
                <li className="w-full relative flex justify-start  max-w-6xl px-10">
                  <span
                    className="inline-block text-sm
                      py-[16px] px-4 w-[87.56px] h-full bg-gray-900 text-center"
                  >
                    NEWS
                  </span>
                  <div
                    className={
                      openMenu
                        ? 'flex items-center border-b-2 pb-2 border-gray-700 max-w-[70%] w-full'
                        : 'flex items-center max-w-[70%] w-full pt-1'
                    }
                  >
                    <span className="text-base ml-8 mr-8">2023年5月1日</span>
                    <span className="bg-gray-600 mr-8 px-4 py-1 inline-block text-sm rounded">
                      お知らせ
                    </span>
                    <span className="decoration-solid inline-block z-20 relative text-base">
                      サイト公開しました！
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* <button
            className={openMenu ? 'open arrow' : 'arrow'}
            onClick={() => menuFunction()}
          ></button> */}
        </div>
      </div>
    </div>
  );
};

export default FirstView;
