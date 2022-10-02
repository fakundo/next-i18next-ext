const mergeStore = (a: any, b: any = {}) => {
  Object.keys(b).forEach((lang: any) => {
    a[lang] = {
      ...a[lang],
      ...b[lang],
    };
  });
};

const mergeNs = (a: any[], b: any[] = []) => {
  b.forEach(i => {
    if (!a.includes(i)) {
      a.push(i);
    }
  });
};

export const mergeTranslations = (a: any, b: any) => {
  const initialI18nStore: any = {};
  mergeStore(initialI18nStore, a?.initialI18nStore);
  mergeStore(initialI18nStore, b?.initialI18nStore);

  const ns: string[] = [];
  mergeNs(ns, a?.ns);
  mergeNs(ns, b?.ns);

  return { ...(b || a), initialI18nStore, ns };
};
