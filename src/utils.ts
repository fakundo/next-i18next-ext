const mergeObjects = (...sources: { [key: string]: any }[]) => {
  const res: { [key: string]: any } = {};
  sources.forEach(source => {
    Object.keys(source).forEach(key => {
      res[key] =
        res[key] && typeof res[key] === 'object'
          ? mergeObjects(res[key], source[key])
          : source[key];
    });
  });
  return res;
};

const mergeArrays = (...sources: string[][]) => {
  const res: string[] = [];
  sources.forEach(source => {
    source.forEach(element => {
      if (!res.includes(element)) {
        res.push(element);
      }
    });
  });
  return res;
};

type T = {
  initialI18nStore?: { [key: string]: any };
  ns?: string[];
};

export const mergeTranslations = (a?: T, b?: T): T | undefined => {
  return a && b
    ? {
        ...b,
        initialI18nStore: mergeObjects(a?.initialI18nStore || {}, b?.initialI18nStore || {}),
        ns: mergeArrays(a?.ns || [], b?.ns || []),
      }
    : a || b;
};
