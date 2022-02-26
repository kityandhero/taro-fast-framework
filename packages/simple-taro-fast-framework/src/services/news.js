import { executiveRequest } from '../utils/request';

export async function pageListData(params) {
  return executiveRequest({
    api: `/news/article/pageList`,
    params,
  });
}

export async function getGalleryData(params) {
  return executiveRequest({
    api: `/news/article/getGallery`,
    params,
  });
}

export async function getData(params) {
  return executiveRequest({
    api: `/news/article/get`,
    params,
  });
}

export async function getOverviewData(params) {
  return executiveRequest({
    api: `/news/integration/overview`,
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
