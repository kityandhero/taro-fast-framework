import {
  checkStringIsNullOrWhiteSpace,
  getCache,
  logDevelop,
  logException,
  setCache,
} from 'easy-soft-utility';

const subsidiaryIdCacheKey = 'entrySubsidiaryId';

export function setSubsidiaryIdCache(o) {
  setCache({
    key: subsidiaryIdCacheKey,
    value: o,
  });
}

export function getSubsidiaryIdCache() {
  const o = getCache({
    key: subsidiaryIdCacheKey,
  });

  return o;
}

export function analysisScene(scene) {
  if (checkStringIsNullOrWhiteSpace(scene)) {
    return {};
  }

  const json = `{${decodeURIComponent(scene)
    .split('_')
    .map((o) => {
      const item = `"${o}"`.replace('~', '":"');

      return item;
    })
    .join(',')}}`;

  try {
    const data = JSON.parse(json);

    return data;
  } catch (error) {
    logDevelop(scene, 'analysisScene');

    logException(error, `error on error in ${this.componentName}`);

    return {};
  }
}
