import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import NextDocument, { DocumentContext, DocumentInitialProps } from 'next/document';
import { UserConfig } from 'next-i18next';
import { PROP_NAME, GLOBAL_NAME } from './constants';

export { serverSideTranslations };

export const createGetInitialProps = (
  ns?: string[],
  configOverride?: UserConfig | null,
  extraLocales?: false | string[],
) => {
  return async (ctx: DocumentContext) => {
    const i18nProps = await serverSideTranslations(
      ctx.locale || ctx.defaultLocale || '',
      ns,
      configOverride,
      extraLocales,
    );

    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props: any) => <App {...props} {...i18nProps} />,
        enhanceComponent: (Component: any) => Component,
      });

    const initialProps = await NextDocument.getInitialProps(ctx);

    return {
      ...initialProps,
      head: [
        ...(initialProps.head || []),
        <script
          dangerouslySetInnerHTML={{
            __html: `window.${GLOBAL_NAME}=${JSON.stringify(i18nProps[PROP_NAME])};`,
          }}
        />,
      ],
    } as DocumentInitialProps;
  };
};
