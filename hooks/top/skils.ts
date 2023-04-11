// ヘッダーメニュー固定時
export const skilsOptions = {
  rootMargin: '78px',
  threshold: 1,
};

// カスタムフックに渡すコールバック関数
export const showSlils = (entries: IntersectionObserverEntry[]) => {
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
      default: '0deg',
    };

    startPosition[entry.target.dataset.startPosition] || '0deg';

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
    // --start-rotate: ${startPosition};
    entry.target.style.cssText = `
          --duration: ${duration}ms;
          --stroke-dashoffset: ${strokeDashOffset};
          --stroke-color: ${entry.target.dataset.strokeColor};
          --stroke-width: ${entry.target.dataset.strokeWidth};
        `;
    requestAnimationFrame(countUp);
    entry.target.classList.add('is-visible');
  });
};
