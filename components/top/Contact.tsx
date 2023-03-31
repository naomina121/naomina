import { TopProps } from '@/types/types';
import React, { FC } from 'react';

const Contact: FC<TopProps> = ({ item }) => {
  return (
    <div
      id="contact"
      ref={item}
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
  );
};

export default Contact;
