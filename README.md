# next-i18next-ext

[![npm](https://img.shields.io/npm/v/next-i18next-ext.svg)](https://www.npmjs.com/package/next-i18next-ext)

Extended [next-i18next](https://github.com/i18next/next-i18next) which allows you to use translations shared between pages and load them once. SSG and SSR work great too.

## Installation
  
```
npm i next-i18next-ext
```

## Usage

1. Configure your [custom Document](https://nextjs.org/docs/advanced-features/custom-document) to provide shared translations for the App

```js
import { createGetInitialProps } from 'next-i18next-ext/server';

export default class _Document extends Document {
  static getInitialProps = createGetInitialProps(['common']);

  render() {
    ...
  }
}
```


### Steps above are the same as for `next-i18next`


2. Configure your [custom App](https://nextjs.org/docs/advanced-features/custom-app)

```js
import { appWithTranslation } from 'next-i18next-ext';

const _App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default appWithTranslation(_App);
```

3. You also able to use page-level translations

```js
import { serverSideTranslations } from 'next-i18next-ext/server';

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['main-page'])),
    },
  };
};
```

4. Use translation

```js
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation('common');
  return (
    <footer>
      {t('description')}
    </footer>
  );
};
```

## API

#### createGetInitialProps

```ts
const createGetInitialProps: (namespacesRequired?: string[], configOverride?: UserConfig | null, extraLocales?: string[] | false) => (ctx: DocumentContext) => DocumentInitialProps;
```

#### serverSideProps

```ts
const serverSideTranslations: (initialLocale: string, namespacesRequired?: string[] | undefined, configOverride?: UserConfig | null, extraLocales?: string[] | false) => Promise<SSRConfig>;
```

#### appWithTranslation

```ts
const appWithTranslation: (App: any, configOverride?: UserConfig | null) => (appProps: any) => JSX.Element;
```