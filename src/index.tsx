import { appWithTranslation as originalAppWithTranslation } from 'next-i18next';
import { UserConfig } from 'next-i18next';
import { PROP_NAME, GLOBAL_NAME, COMPONENT_DISPLAY_NAME } from './constants';
import { mergeTranslations } from './utils';

export const appWithTranslation = originalAppWithTranslation;

export const appWithTranslation2 = (App: any, configOverride?: UserConfig | null) => {
  const AppWithTrans = originalAppWithTranslation(App, configOverride);

  const WrappedApp = (appProps: any) => {
    const { [PROP_NAME]: inApp = (globalThis as any)[GLOBAL_NAME], pageProps, ...rest } = appProps;
    const { [PROP_NAME]: inPage } = pageProps;
    const i18n = mergeTranslations(inApp, inPage);
    console.log({ ...pageProps, [PROP_NAME]: i18n });
    return <AppWithTrans {...rest} pageProps={{ ...pageProps, [PROP_NAME]: i18n }} />;
  };

  WrappedApp.displayName = COMPONENT_DISPLAY_NAME;
  return WrappedApp;
};
