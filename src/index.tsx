import { appWithTranslation as originalAppWithTranslation } from 'next-i18next';
import { UserConfig } from 'next-i18next';
import { PROP_NAME, SCRIPT_ID, COMPONENT_DISPLAY_NAME } from './constants';
import { mergeTranslations } from './utils';
import { useMemo } from 'react';

let GLOBAL_IN_APP: any;

const getFromDoc = () => {
  try {
    GLOBAL_IN_APP = GLOBAL_IN_APP || JSON.parse(document.getElementById(SCRIPT_ID)!.textContent!);
  } catch {}
  return GLOBAL_IN_APP;
};

export const appWithTranslation = (App: any, configOverride?: UserConfig | null) => {
  const AppWithTrans = originalAppWithTranslation(App, configOverride);

  const WrappedApp = (appProps: any) => {
    const { [PROP_NAME]: inApp = getFromDoc(), pageProps, ...rest } = appProps;
    const { [PROP_NAME]: inPage } = pageProps;
    const i18n = useMemo(() => mergeTranslations(inApp, inPage), [inApp, inPage]);
    return <AppWithTrans {...rest} pageProps={{ ...pageProps, [PROP_NAME]: i18n }} />;
  };

  WrappedApp.displayName = COMPONENT_DISPLAY_NAME;
  return WrappedApp;
};
