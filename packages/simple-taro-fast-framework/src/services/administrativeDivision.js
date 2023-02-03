import { request, requestMode } from 'easy-soft-utility';

import { administrativeDivisionListData } from '../assets/administrativeDivisionData';

export async function singeListData(params) {
  return request({
    api: `/news/article/get`,
    params,
    mode: requestMode.simulation,
    simulativeAuthorize: false,
    simulativeSuccessResponse: {
      list: administrativeDivisionListData,
    },
  });
}
