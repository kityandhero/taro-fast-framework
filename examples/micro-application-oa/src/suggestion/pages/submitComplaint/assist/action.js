import { actionCore } from 'taro-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';

export async function submitComplaintMessageAction({
  target,
  handleData,
  successCallback,
}) {
  actionCore({
    api: modelTypeCollection.subsidiaryComplaintMessageTypeCollection.add,
    params: {
      ...handleData,
    },
    target,
    handleData,
    successCallback,
  });
}
