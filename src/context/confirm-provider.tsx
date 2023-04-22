import React, { useState, useCallback, useRef } from 'react';
import { DialogOptions } from '@/types/types';
import Confirm from '../../components/Confirm';
import ConfirmContext from './confirm-context';

// 確認ダイアログのオプション、タイトル、メッセージ、ボタンのラベルなどを指定
const DEFAULT_OPTIONS: DialogOptions = {
  html: false,
  alert: false,
  title: 'ページが更新されました。',
  description:
    'ページが古い状態ですと、期限付きの画像が表示されなくなったり、誤った記事の情報のままになっている可能性があります。',
  confirmationText: '今すぐリロードする',
  cancellationText: '後でリロードする',
};

const buildOptions = (options: DialogOptions): DialogOptions => {
  return {
    ...DEFAULT_OPTIONS,
    ...options,
  };
};

type T = any;

export const ConfirmProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [options, setOptions] = useState<DialogOptions>({ ...DEFAULT_OPTIONS });
  const [resolveReject, setResolveReject] = useState<T>();

  const [modalWindow, setModalWindw] = useState(0);

  const confirm = useCallback(
    (options: DialogOptions): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (modalWindow === 0) {
          setOptions(buildOptions(options));
        }
        if (modalWindow === 1) {
          reject();
          setResolveReject(reject);
        }
        if (modalWindow === 2) {
          resolve();
          setResolveReject(resolve);
        }
      });
    },
    [modalWindow, resolveReject]
  );

  const handleClose = useCallback(() => {
    setOptions({ ...DEFAULT_OPTIONS });
  }, []);

  const handleCancel = useCallback(() => {
    setModalWindw(1);
    handleClose();
  }, [modalWindow, handleClose]);

  const handleConfirm = useCallback(() => {
    setModalWindw(2);
    handleClose();
  }, [modalWindow, handleClose]);

  return (
    <>
      <Confirm {...options} onSubmit={handleConfirm} onCancel={handleCancel} />
      <ConfirmContext.Provider value={{ confirm }}>
        {children}
      </ConfirmContext.Provider>
    </>
  );
};
