import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'taro-fast-framework';

import { fieldDataFlow } from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';

export async function createFlowCaseAction({
  target,
  handleData,
  successCallback,
}) {
  actionCore({
    api: modelTypeCollection.flowCaseTypeCollection.createFlowCase,
    params: {
      workflowId: getValueByKey({
        data: handleData,
        key: fieldDataFlow.workflowId.name,
        convert: convertCollection.string,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
  });
}
