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
        <div className="anime-title contact">
          <b>CONTACT</b>
        </div>
      </p>
      <div className="bg-gray-600/50 p-12 h-full">
        <label htmlFor="textContent" className="text-white/70 text-base">
          お名前
        </label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full p-2 text-base bg-gray-600/80"
        />
        <label htmlFor="email" className="text-base mt-5 block text-white/70">
          Eメール
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full p-2 text-base bg-gray-600/80"
        />
        <label
          htmlFor="contentText"
          className="mt-5 block text-white/70 text-base"
        >
          お問い合わせ内容
        </label>
        <textarea
          className="w-full p-2 h-40 text-base bg-gray-600/80"
          name="content"
          id="contentText"
        ></textarea>
        <input
          type="submit"
          value="メッセージを送信する"
          className="text-center bg-gradient-to-r from-amber-500 to-yellow-500 mt-5 mx-auto block max-w-xs font-bold p-3 text-base w-full hover:from-green-400 hover:to-blue-500"
        />
      </div>
    </div>
  );
};

export default Contact;
