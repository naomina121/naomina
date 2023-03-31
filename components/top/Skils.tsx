import { TopProps } from '@/types/types';
import Image from 'next/image';
import React, { FC } from 'react';

const Skils: FC<TopProps> = ({ item }) => {
  if (typeof window === 'object') {
    const progressItems = document.querySelectorAll('.progress-item');

    const root = document.querySelector('#top');

    const observeAction = (entries: any) => {
      entries.forEach((entry: any) => {
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
        let startPosition: { [key: string]: string };

        startPosition = {
          right: '0deg',
          bottom: '90deg',
          left: '180deg',
          default: '-90deg',
        };

        startPosition[entry.target.dataset.startPosition] || '-90deg';

        // Countup percentage
        const deciamlPointLength = (String(percent).split('.')[1] || '').length;
        const startTime = performance.now();
        let countValue = 0;

        const countUp = (timeStamp: any) => {
          const elapsed = timeStamp - startTime;
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
    <div
      id="skils"
      ref={item}
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
            <div className="anime-title skil">
              <b>SKILS</b>
            </div>
          </p>
          <p className="text-white text-xl">
            現在のスキルは、HTMLとCSS、JavaScriptの基礎構文ぐらいは書けるレベルです。
          </p>
          <p className="text-white text-xl">
            プログラミングとしては、ReactやTypeScriptなども学びながらコードを書いています。
          </p>
          <p className="text-white text-xl">
            <span className="text-amber-400 font-black pr-2">
              今後、インフラ、アーキテクチャ、セキュリティの学習、基本技術試験対策
            </span>
            なども兼ねながらアウトプットできればと思っております。
          </p>
          {/* progressbar */}
          <div className="progress-container">
            <div
              className="progress-item"
              data-percent="60"
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
              <div className="progress-title">React</div>
            </div>
            <div
              className="progress-item"
              data-percent="30"
              data-duration="3200"
              data-stroke-width="8"
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
              <div className="progress-title">TypeScript</div>
            </div>
            <div
              className="progress-item"
              data-percent="70"
              data-duration="4200"
              data-stroke-width="10"
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
              data-percent="40"
              data-duration="5800"
              data-stroke-width="8"
              data-stroke-color="#dda060"
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
              <div className="progress-title">SQL</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skils;
