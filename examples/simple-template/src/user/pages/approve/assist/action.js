import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'taro-fast-framework';

import {
  fieldDataFlowCaseProcessHistory,
  fieldDataWorkflowCase,
} from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';

export async function singleListNextNodeApproverAction({
  target,
  handleData,
  successCallback,
}) {
  actionCore({
    api: modelTypeCollection.flowCaseTypeCollection.singleListNextNodeApprover,
    params: {
      workflowCaseId: getValueByKey({
        data: handleData,
        key: fieldDataWorkflowCase.workflowCaseId.name,
        convert: convertCollection.string,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    showProcessing: false,
  });
}

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
        key: fieldDataWorkflowCase.workflowCaseId.name,
        convert: convertCollection.string,
        defaultValue: '',
      }),
      nextWorkflowNodeApproverUserIdCollection: getValueByKey({
        data: handleData,
        key: 'nextWorkflowNodeApproverUserIdCollection',
        convert: convertCollection.string,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    textProcessing: '提交中，请稍后',
  });
}

export async function passAction({ target, handleData, successCallback }) {
  actionCore({
    api: modelTypeCollection.flowCaseTypeCollection.pass,
    params: {
      flowCaseId: getValueByKey({
        data: handleData,
        key: fieldDataWorkflowCase.workflowCaseId.name,
        convert: convertCollection.string,
        defaultValue: '',
      }),
      note: getValueByKey({
        data: handleData,
        key: fieldDataFlowCaseProcessHistory.note.name,
        convert: convertCollection.string,
        defaultValue: '',
      }),
      nextWorkflowNodeApproverUserIdCollection: getValueByKey({
        data: handleData,
        key: 'nextWorkflowNodeApproverUserIdCollection',
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
        key: fieldDataWorkflowCase.workflowCaseId.name,
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
