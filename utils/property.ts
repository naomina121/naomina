import { PageType, RichTextType } from '../types/types';

export const getText = (richTextArr: RichTextType[]) => {
  try {
    const textArr = richTextArr.map((richText) => richText.plain_text);
    return textArr.join('');
  } catch (err) {
    // console.error(err)
  }
  return '';
};

export const getCover = (cover: PageType['cover']) => {
  if (cover && cover.file) return cover.file.url;
  if (cover && cover.external) return cover.external.url;
  return '/img/noimg.jpg';
};

export const getDate = (date: { start: string }) => {
  try {
    return date.start;
  } catch (err) {
    // console.error(err)
  }
  return '-';
};

export const getUpdate = (last_edited_time: string) => {
  try {
    return last_edited_time;
  } catch (err) {
    // console.error(err)
  }
  return '-';
};

export const getForumla = (formula: { string: string}) => {
  try {
    return formula.string;
  } catch (err) {
    // console.error(err)
  }
  return '-';
};

export const getSelect = (select: { name: string }) => {
  try {
    return select.name;
  } catch (err) {
    // console.error(err)
  }
  return '取得できませんでした';
};

export const getMultiSelect = (multiSelect: [{ name: string }]) => {
  try {
    return multiSelect.map((tag) => tag.name);
  } catch (err) {
    // console.error(err)
  }
  return [];
};
