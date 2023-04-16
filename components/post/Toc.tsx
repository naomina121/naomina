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
    <div className="p-0 m-0 mb-14 top-[98px] shadow sticky h-[82vh]">
      <h3 className="text-center text-white p-3 rounded-t-md text-lg mb-0 font-normal bg-[#90360d]">
        この記事の目次
      </h3>
      <div className="toc mt-0 mb-1 rounded-b-md"></div>
    </div>
  );
};

export default Toc;
