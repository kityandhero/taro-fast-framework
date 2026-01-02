import { actionCore } from 'taro-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';

export async function submitReportMessageAction({
  target,
  handleData,
  successCallback,
}) {
  actionCore({
    api: modelTypeCollection.subsidiaryReportMessageTypeCollection.add,
    params: {
      ...handleData,
    },
    target,
    handleData,
    successCallback,
  });
}
