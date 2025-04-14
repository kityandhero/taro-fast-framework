import { getCache, setCache } from 'easy-soft-utility';

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

export function judgeComplain(o) {
  const { query } = o;

  const { mode } = {
    mode: '',
    ...query,
  };

  return mode === 'complain';
}
