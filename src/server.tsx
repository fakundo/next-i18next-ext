import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import NextDocument, { DocumentContext, DocumentInitialProps } from 'next/document';
import { UserConfig } from 'next-i18next';
import { PROP_NAME, SCRIPT_ID } from './constants';

export { serverSideTranslations };

export const createGetInitialProps = (
  ns?: string[],
  configOverride?: UserConfig | null,
  extraLocales?: false | string[],
) => {
  return async (ctx: DocumentContext, locale?: string) => {
    const i18nProps = await serverSideTranslations(
      locale || ctx.locale || ctx.defaultLocale || '',
      ns,
      configOverride,
      extraLocales,
    );

    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = (options: any) => {
      const { enhanceApp, enhanceComponent } = options;
      return originalRenderPage({
        enhanceApp: (App: any) => (props: any) => {
          const EnhancedApp = enhanceApp?.(App) || App;
          return <EnhancedApp {...props} {...i18nProps} />;
        },
        enhanceComponent,
      });
    };

    const initialProps = await NextDocument.getInitialProps(ctx);

    return {
      ...initialProps,
      head: [
        ...(initialProps.head || []),
        <script
          type="application/json"
          id={SCRIPT_ID}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(i18nProps[PROP_NAME]) }}
        />,
      ],
    } as DocumentInitialProps & Pick<Required<DocumentInitialProps>, 'head'>;
  };
};
