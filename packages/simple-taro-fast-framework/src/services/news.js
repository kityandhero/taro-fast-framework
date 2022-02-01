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

export async function switchStatusData(params) {
  const { status } = params;

  return executiveRequest({
    api: `/news/article/switchStatus`,
    params,
    useVirtualRequest: true,
    virtualRequestDelay: 800,
    virtualNeedAuthorize: false,
    virtualSuccessResponse: {
      data: {
        status: status,
      },
    },
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
