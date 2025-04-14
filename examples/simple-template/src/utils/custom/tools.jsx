import { getCache, logConsole, setCache } from 'easy-soft-utility';

import { getLaunchOption } from 'taro-fast-framework';

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

export function judgeComplain() {
  const o = getLaunchOption();

  logConsole(o, 'judgeComplain');
}
