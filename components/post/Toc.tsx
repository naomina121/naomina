import React, { useEffect } from 'react';
import tocbot from 'tocbot';

const Toc = () => {
  useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: '.context',
      headingSelector: 'h2, h3',
    });
    return () => tocbot.destroy();
  }, []);

  return (
    <div className="p-0 m-0 top-[98px] shadow sticky">
      <h3 className="text-center text-gray-200 p-3 text-lg mb-0 font-normal bg-gray-700">
        目次
      </h3>
      <div className="toc mt-1 mb-1"></div>
    </div>
  );
};

export default Toc;
