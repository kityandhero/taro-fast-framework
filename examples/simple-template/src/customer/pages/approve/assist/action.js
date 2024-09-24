import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'taro-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../common/data';

export async function submitApprovalAction({
  target,
  handleData,
  successCallback,
}) {
  actionCore({
    api: modelTypeCollection.flowCaseTypeCollection.submitApproval,
    params: {
      workflowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCaseId.name,
        convert: convertCollection.string,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
  });
}
