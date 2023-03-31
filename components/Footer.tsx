import { siteConfig } from '@/site.config';
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-4 bg-gray-900">
      <small className="text-white/80 block w-full text-center">
        © 2023 {siteConfig.title}
      </small>
    </footer>
  );
};

export default Footer;
