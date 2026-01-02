import { actionCore } from 'taro-fast-framework';

import { modelTypeCollection } from '../../modelBuilders';

export async function singleListAction({
  target,
  handleData,
  successCallback,
}) {
  actionCore({
    api: modelTypeCollection.generalDiscourseTypeCollection.singleList,
    params: {},
    target,
    handleData,
    successCallback,
    showProcessing: false,
  });
}
