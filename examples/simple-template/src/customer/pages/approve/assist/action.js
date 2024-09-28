import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'taro-fast-framework';

import { fieldDataFlowCaseProcessHistory } from '../../../../customConfig';
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

export async function passAction({ target, handleData, successCallback }) {
  actionCore({
    api: modelTypeCollection.flowCaseTypeCollection.pass,
    params: {
      flowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCaseId.name,
        convert: convertCollection.string,
        defaultValue: '',
      }),
      note: getValueByKey({
        data: handleData,
        key: fieldDataFlowCaseProcessHistory.note.name,
        convert: convertCollection.string,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
  });
}

export async function refuseAction({ target, handleData, successCallback }) {
  actionCore({
    api: modelTypeCollection.flowCaseTypeCollection.refuse,
    params: {
      flowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCaseId.name,
        convert: convertCollection.string,
        defaultValue: '',
      }),
      note: getValueByKey({
        data: handleData,
        key: fieldDataFlowCaseProcessHistory.note.name,
        convert: convertCollection.string,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
  });
}
