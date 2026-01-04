import { actionCore } from 'taro-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';

export async function submitApplicationUserFeedbackAction({
  target,
  handleData,
  successCallback,
}) {
  actionCore({
    api: modelTypeCollection.applicationUserFeedbackTypeCollection.add,
    params: {
      ...handleData,
    },
    target,
    handleData,
    successCallback,
  });
}
