import { NextPage } from 'next';
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { sampleCards } from '@/utils/sample';
import Card from '@/components/Card';
import Link from 'next/link';

const Study: NextPage = () => {
  const data = sampleCards;
  const categories = data.map((item) => item.category);
  let set = new Set(categories);
  let uniqueCategories = Array.from(set);
  return (
    <Layout>
      <div className="w-full mt-[78px] bg-gray-800">
        <ul className="w-full max-w-5xl mx-auto py-2 flex">
          {uniqueCategories.map((category: string) => (
            <li key={category} className="mr-4">
              <Link
                className="text-gray-400 duration-500 hover:text-gray-200"
                href={'/study/' + category}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full bg-gray-200">
        <div className="w-full max-w-5xl mx-auto">
          <h1 className="text-gray-800 py-10">STUDY</h1>
          <div className="flex flex-wrap justify-between">
            {data.map((page, index) => (
              <Card key={index} index={index} page={page} />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <ul className="w-full max-w-5xl mx-auto py-2 flex">
          <li className="mr-4">
            <Link
              className="text-sm text-sky-600 duration-500 hover:text-sky-700"
              href="/"
            >
              トップページ
            </Link>
            <span className="text-sm pl-4">&gt;</span>
            <span className="text-sm font-black text-gray-600 pl-4">
              学習記録
            </span>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default Study;
