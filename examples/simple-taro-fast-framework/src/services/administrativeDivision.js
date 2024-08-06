import { request, requestMode } from 'easy-soft-utility';

import { administrativeDivisionListData } from '../assets/administrativeDivisionData';

export async function singeListData(parameters) {
  return request({
    api: `/news/article/get`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeAuthorize: false,
    simulativeSuccessResponse: {
      list: administrativeDivisionListData,
    },
  });
}
