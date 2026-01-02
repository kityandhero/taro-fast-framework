import { actionCore } from 'taro-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';

export async function submitFeedbackMessageAction({
  target,
  handleData,
  successCallback,
}) {
  actionCore({
    api: modelTypeCollection.subsidiaryFeedbackMessageTypeCollection.add,
    params: {
      ...handleData,
    },
    target,
    handleData,
    successCallback,
  });
}
