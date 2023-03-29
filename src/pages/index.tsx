import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, FC } from 'react';

const Home: NextPage = () => {
  // HeaderMenu Scloll

  const options = {
    //root: document.querySelector('div[ref]'),
    rootMargin: '78px',
    threshold: 1,
  };

  // カスタムフックに渡すコールバック関数
  const current = 'current';
  const showElements = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      let headerMenuListElement = document.querySelector(
        `[data-ref="${entry.target.id}"]`
      );
      if (entry.isIntersecting && headerMenuListElement !== null) {
        // IntersectionObserver で設定された条件を満たした時に実行する処理
        // 要素に active クラスを適用する
        headerMenuListElement.classList.add('current');
      } else if (headerMenuListElement !== null) {
        headerMenuListElement.classList.remove('current');
      }
    });
  };

  const home = useRef<HTMLDivElement>(null);
  const about = useRef<HTMLDivElement>(null);
  const skils = useRef<HTMLDivElement>(null);
  const contact = useRef<HTMLDivElement>(null);

  // カスタムフックを呼ぶ
  useIntersectionObserver([home, about, skils, contact], showElements, options);

  //ニュースの部分
  const [openMenu, setOpenMenu] = useState(false);
  const menuFunction = () => {
    setOpenMenu(!openMenu);
  };

  // skils
  if (typeof window === 'object') {
    const progressItems = document.querySelectorAll('.progress-item');

    const root = document.querySelector('#top');

    const observeAction = (entries) => {
      entries.forEach((entry) => {
        if (
          !entry.isIntersecting ||
          entry.target.classList.contains('is-visible')
        ) {
          return;
        }

        const percent = parseFloat(entry.target.dataset.percent);

        if (!Number.isFinite(percent)) {
          return false;
        }

        const duration = parseInt(entry.target.dataset.duration) || 1500;
        const eleProgressBar = entry.target.querySelector('.progress-bar');
        const eleProgressValue = entry.target.querySelector('.progress-value');
        const radius = eleProgressBar.getAttribute('r');
        const circumference = 2 * Math.PI * radius;
        const strokeDashOffset = Math.round(
          circumference - (circumference * percent) / 100
        );

        // Progress start position
        const startPosition =
          {
            right: '0deg',
            bottom: '90deg',
            left: '180deg',
            default: '-90deg',
          }[entry.target.dataset.startPosition] || '-90deg';

        // Countup percentage
        const deciamlPointLength = (String(percent).split('.')[1] || '').length;
        const startTime = performance.now();
        let countValue = 0;

        const countUp = (timestamp) => {
          const elapsed = timestamp - startTime;
          countValue = (elapsed / duration) * percent;
          eleProgressValue.innerText = countValue.toFixed(deciamlPointLength);

          if (elapsed < duration) {
            requestAnimationFrame(countUp);
          } else {
            eleProgressValue.innerText = percent;
          }
        };

        // Styles for progress bar animation
        entry.target.style.cssText = `
      --duration: ${duration}ms;
      --start-rotate: ${startPosition};
      --stroke-dashoffset: ${strokeDashOffset};
      --stroke-color: ${entry.target.dataset.strokeColor};
      --stroke-width: ${entry.target.dataset.strokeWidth};
    `;

        requestAnimationFrame(countUp);

        entry.target.classList.add('is-visible');
      });
    };

    const options = {
      root: root,
      rootMargin: '0px 0px -40% 0px',
    };

    const obsever = new IntersectionObserver(observeAction, options);

    progressItems.forEach((target) => {
      obsever.observe(target);
    });
  }

  return (
    <div id="itibanue">
      <header>
        <div className="fixed top-0 left-0 w-full z-30 bg-gray-900 h-[78px] leading-[1.5]">
          <div className="max-w-screen-xl flex h-full justify-between items-center flex-end m-auto">
            <h1 className="text-white flex-end">
              <span className="text-amber-400 pr-2">NAO</span>BLOG
            </h1>
            <nav className="flex items-center max-w-xl w-full">
              <ul className="flex list-none w-full items-center text-lg font-['Montserrat',sans-serif] font-medium justify-around">
                <li
                  data-ref="home"
                  className={
                    current ? 'p-2 header-menu-hover' : 'p-2 header-menu-hover'
                  }
                >
                  <Link className="text-white" href="#home">
                    HOME
                  </Link>
                </li>
                <li
                  data-ref="about"
                  className={
                    current ? 'p-2 header-menu-hover' : 'p-2 header-menu-hover'
                  }
                >
                  <Link className="text-white" href="#about">
                    ABOUT
                  </Link>
                </li>
                <li
                  data-ref="skils"
                  className={
                    current ? 'p-2 header-menu-hover' : 'p-2 header-menu-hover'
                  }
                >
                  <Link className="text-white" href="#skils">
                    SKILS
                  </Link>
                </li>
                <li
                  data-ref="contact"
                  className={
                    current
                      ? 'p-2 header-menu-hover current'
                      : 'p-2 header-menu-hover'
                  }
                >
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
      <main id="main" className="top-[0px] mt-[0px] relative">
        {/* firstview */}
        <div id="home" ref={home} className="relative h-full max-h-smart">
          <div className="relative w-full max-h-smart overflow-hidden overlay">
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
                      py-[16px] px-4 w-[87.56px] h-[50px] bg-gray-900 text-center"
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
        <div id="about" ref={about}>
          {' '}
          <div className="bg-about p-40 pt-20 text-white relative h-full max-h-smart">
            <p className="text-white w-full text-5xl text-center mb-20 font-['Montserrat',sans-serif] relative">
              ABOUT
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

        {/* skils */}
        <div
          id="skils"
          ref={skils}
          className="overlay p-40 pt-20 text-white relative h-full max-h-smart"
        >
          <Image
            alt="パソコンとスマホの画面を確認しながら仕事をしている人"
            src="/img/skil.jpg"
            width="1280"
            height="853"
            className="absolute top-0 left-0 min-w-full	max-h-smart object-cover"
          />
          {/* skilsのテキスト */}
          <div className="absolute min-w-full min-h-full z-20 top-0 left-1/2 translate-x-[-50%] w-full">
            <div className="max-h-smart flex flex-col items-center text-white z-20 justify-start relative my-20">
              <p className="text-white w-full text-5xl text-center mb-20 font-['Montserrat',sans-serif] relative">
                SKILS
              </p>
              <p className="text-white text-xl">
                現在のスキルは、HTMLとCSS、JavaScriptの基礎構文ぐらいは書けるレベルです。
              </p>
              <p className="text-white text-xl">
                プログラミングとしては、ReactやTypeScriptなども学びながらコードを書いています。
              </p>
              <p className="text-white text-xl">
                <span className="text-amber-400 font-black pr-2">
                  ネットワークやインフラ、アーキテクチャ、AI、セキュリティの学習、基本技術試験対策
                </span>
                なども兼ねながら学習中です。
              </p>
              {/* progressbar */}
              <div className="progress-container">
                <div
                  className="progress-item"
                  data-percent="59"
                  data-duration="2200"
                  data-stroke-width="8"
                  data-stroke-color="#00ccff"
                  data-start-position="top"
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
                  <div className="progress-title">HTML/CSS</div>
                </div>
                <div
                  className="progress-item"
                  data-percent="88"
                  data-duration="3200"
                  data-stroke-width="10"
                  data-stroke-color="#adff00"
                  data-start-position="right"
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
                  <div className="progress-title">JavaScript</div>
                </div>
                <div
                  className="progress-item"
                  data-percent="72.6"
                  data-duration="4200"
                  data-stroke-width="5"
                  data-stroke-color="#dd5bcc"
                  data-start-position="bottom"
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
                  className="progress-item"
                  data-percent="66.84"
                  data-duration="5800"
                  data-stroke-width="8"
                  data-stroke-color="#dda05b"
                  data-start-position="left"
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
              </div>
            </div>
          </div>
        </div>
        {/* contact */}
        <div
          id="contact"
          ref={contact}
          className="bg-contact p-40 pt-20 text-white relative h-full max-h-smart"
        >
          <p className="text-white w-full text-5xl text-center mb-20 font-['Montserrat',sans-serif] relative">
            CONTACT
          </p>
          <div className="bg-gray-600/50 p-12 h-full">
            <label htmlFor="textContent" className="text-white/70 text-lg">
              お名前
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full p-2 bg-gray-600/80"
            />
            <label htmlFor="email" className="mt-5 block text-white/70 text-lg">
              Eメール
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full p-2 bg-gray-600/80"
            />
            <label
              htmlFor="contentText"
              className="mt-5 block text-white/70 text-lg"
            >
              お問い合わせ内容
            </label>
            <textarea
              className="w-full p-2 bg-gray-600/80"
              name="content"
              id="contentText"
            ></textarea>
            <input
              type="submit"
              value="メッセージを送信する"
              className="bg-amber-500 mt-5 font-bold p-3 text-base"
            />
          </div>
        </div>
      </main>
      <footer className="py-4 bg-gray-900">
        <small className="text-white/80 block w-full text-center">
          © 2023 naomina.com
        </small>
      </footer>
    </div>
  );
};

export default Home;
