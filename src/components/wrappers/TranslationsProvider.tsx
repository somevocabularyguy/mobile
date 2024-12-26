import React, { ReactNode, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import initTranslations from '@/i18n';
import { createInstance } from 'i18next';

type TranslationsProviderProps = {
  children: ReactNode;
  locale: string;
};

const TranslationsProvider: React.FC<TranslationsProviderProps> = ({ children, locale }) => {
  const [i18n, setI18n] = useState(createInstance());
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeTranslations = async () => {
      await initTranslations(locale, i18n);
      setIsInitialized(true);
    };

    initializeTranslations();
  }, [locale]);

  if (!isInitialized) {
    return null;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default TranslationsProvider;
