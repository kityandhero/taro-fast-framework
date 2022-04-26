import { executiveRequest } from '../utils/request';

import { administrativeDivisionListData } from '../assets/administrativeDivisionData';

export async function singeListData(params) {
  return executiveRequest({
    api: `/news/article/get`,
    params,
    useVirtualRequest: true,
    virtualNeedAuthorize: false,
    virtualSuccessResponse: {
      list: administrativeDivisionListData,
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
