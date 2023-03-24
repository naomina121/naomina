import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
const Home: NextPage = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuFunction = () => {
    setOpenMenu(!openMenu);
  };
  return (
    <div id="home">
      <header>
        <div className="fixed top-0 left-0 w-full z-30 bg-gray-900 h-[78px] leading-[1.5]">
          <div className="max-w-screen-xl flex h-full justify-between items-center flex-end m-auto">
            <h1 className="text-white flex-end">
              <span className="text-amber-400 pr-2">NAO</span>BLOG
            </h1>
            <nav className="flex items-center max-w-xl w-full">
              <ul className="flex list-none w-full items-center text-lg font-['Montserrat',sans-serif] font-medium justify-around">
                <li className="p-2 current header-menu-hover">
                  <Link className="text-white" href="#home">
                    HOME
                  </Link>
                </li>
                <li className="p-2 header-menu-hover">
                  <Link className="text-white" href="#about">
                    ABOUT
                  </Link>
                </li>
                <li className="p-2 header-menu-hover">
                  <Link className="text-white" href="#about">
                    SKILS
                  </Link>
                </li>
                <li className="p-2 header-menu-hover">
                  <Link className="text-white" href="#contact">
                    CONTACT
                  </Link>
                </li>
                <li className="p-2 header-menu-hover">
                  <Link className="text-white" href="/blog">
                    BLOG
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="top-[78px] relative">
        {/* firstview */}
        <div className="relative h-full max-h-smart">
          <div className="relative w-full max-h-smart m-t-[-100px] overflow-hidden overlay">
            <video
              src={require('./movie/header_movie.mp4')}
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
              <p className="text-white text-4xl">
                未経験からエンジニアを目指すための個人学習記録サイト
              </p>
              <br />
              <p className="text-white text-8xl font-['Montserrat',sans-serif] font-black">
                <span className="text-amber-400 pr-2">RECORD</span> OF THE STUDY
              </p>
            </div>
            {/* firstview_bottom */}
            <div
              className={
                openMenu
                  ? 'max-h-[9rem] h-full absolute overflow-y-hidden bottom-0 left-0 z-30 bg-gray-800/80 w-full text-white flex justify-around items-center transition-animation'
                  : 'absolute overflow-y-hidden bottom-0 left-0 h-[50px] z-30 bg-gray-800/80 w-full text-white flex justify-around items-center'
              }
            >
              <div
                className={
                  openMenu
                    ? 'max-w-screen-xl m-auto bottom-0 relative flex justify-between items-center w-full'
                    : 'max-w-screen-xl m-auto bottom-[-45px] relative flex justify-between items-center w-full'
                }
              >
                <div className="w-full h-full">
                  <ul className="flex items-center justify-center flex-col max-h-[45px] w-full">
                    <li className="w-full relative flex items-center justify-start">
                      <span
                        className="inline-block text-sm
                      h-full py-[16px] px-4 w-[87.56px] h-[50px] bg-gray-900 text-center"
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
                        <span className="text-base ml-8 mr-8">
                          2023年3月23日
                        </span>
                        <span className="bg-gray-600 mr-8 px-4 py-1 mt-1 inline-block text-sm rounded">
                          お知らせ
                        </span>
                        <Link
                          href="#"
                          className="decoration-solid	underline hover:no-underline inline-block cursor-pointer z-20 relative text-base"
                        >
                          HP新リニューアルしました1
                        </Link>
                      </div>
                    </li>
                    <li className="w-full flex items-center justify-start">
                      <span
                        className="inline-block
                      py-[10px] w-[87.56px] h-[48px] px-4 bg-gray-900"
                      ></span>
                      <div className=" max-w-[70%] w-full flex items-center border-b-2 pb-2 border-gray-700">
                        <span className="text-base ml-8 mr-8">
                          2023年3月23日
                        </span>
                        <span className="bg-gray-600 mr-8 py-1 px-4 text-sm rounded">
                          お知らせ
                        </span>
                        <Link
                          href="#"
                          className="decoration-solid	underline hover:no-underline inline-block cursor-pointer z-20 relative text-base"
                        >
                          HP新リニューアルしました2
                        </Link>
                      </div>
                    </li>
                    <li className="w-full flex items-center justify-start">
                      <span
                        className="inline-block
                       w-[87.56px] h-[48px] py-[10px] px-4 bg-gray-900"
                      ></span>
                      <div className=" max-w-[70%] w-full flex items-center relative top-[-5px]">
                        <span className="text-base ml-8 mr-8">
                          2023年3月23日
                        </span>
                        <span className="bg-gray-600 mr-8 px-4 py-1 text-sm rounded">
                          お知らせ
                        </span>
                        <Link
                          href="#"
                          className="decoration-solid	underline hover:no-underline inline-block cursor-pointer z-20 relative text-base"
                        >
                          HP新リニューアルしました3
                        </Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <button
                className={openMenu ? 'open arrow' : 'arrow'}
                onClick={() => menuFunction()}
              ></button>
            </div>
          </div>
        </div>
        {/* about */}
        <div
          id="about"
          className="bg-about p-40 pt-20 text-white relative h-full max-h-smart"
        >
          <p className="text-white w-full text-5xl text-center mb-20 font-['Montserrat',sans-serif] relative">
            <span className="about-text relatie">ABOUT</span>
          </p>
          <div className="flex max-w-7xl my-0 mx-auto justify-around">
            <div className="w-full mr-10 max-w-lg">
              <p className="text-white">
                <span className="text-amber-400 inline-block mr-5 text-xl">
                  ★
                </span>
                ITの知識をしっかり身につけ、楽しみながら学んでいく
              </p>
              <p className="text-white my-10 text-3xl font-semibold">
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
                人目に触れることにより、サボってはいけない！そういう思いで頑張っていきたいと思います！（多分
              </p>
              <Link
                href="#"
                className="block mt-10 font-bold mx-0 p-2 py-4 max-w-xs text-center bg-amber-500 text-base"
              >
                ブログを見てみる
              </Link>
            </div>
            <div className="bg-stripe">
              <Image
                alt="pcで操作している人"
                src="/img/about.jpg"
                width="1280"
                height="853"
                className="
                max-w-2xl w-full -translate-x-3 -translate-y-3"
              />
            </div>
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default Home;
