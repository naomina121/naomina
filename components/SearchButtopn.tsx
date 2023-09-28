import React, { FC, useState } from 'react';
import { useRouter } from 'next/router';
import 'remixicon/fonts/remixicon.css';
import { IndexProps } from '@/types/types';
import { getForumla, getSelect } from '@/utils/property';

const SearchButton:FC<IndexProps> = ({pages}) => {
  const categories = pages.map((page) =>
    getSelect(page.properties.category.select)
  );
  const categories_js = pages.map((page) =>
      getForumla(page.properties.isJaCategory.formula)
  );

  const array = new Set(categories);
  const array2 =new Set(categories_js);
  const uniqueCategories = Array.from(array);
  const uniqueJsCategories = Array.from(array2);

  const router = useRouter();
  const [keyword,setKeyword] = useState('');
  const [category, setCategory] = useState('');

  const handleClick = () => {
      router.push(`/study/search/?keyword=${keyword}&category=${category}`);
      setKeyword('');
      setCategory('');
  };

  return (
    <div>
      <p className="text-center text-gray-200 py-3 text-md mb-5 font-normal bg-gray-700 rounded">
        サイト内検索
      </p>
      <label className="select-box">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">カテゴリー選択なし</option>
          {uniqueCategories.map((cat, i) => (
            <option key={i} value={cat}>
              {uniqueJsCategories[i]}
            </option>
          ))}
        </select>
      </label>
      <div className="search-box">
        <input
          className="search-edit"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="search-submit" onClick={handleClick}>
          <i className="ri-search-line"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchButton;
