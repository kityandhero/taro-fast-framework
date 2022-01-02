import { executiveRequest } from '../utils/request';

export async function pageListData(params) {
  return executiveRequest({
    api: `/news/article/pageList`,
    params,
  });
}

export async function getOverviewData(params) {
  return executiveRequest({
    api: `/news/Integration/overview`,
    params,
  });
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
