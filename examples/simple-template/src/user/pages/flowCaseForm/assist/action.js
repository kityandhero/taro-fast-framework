import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'taro-fast-framework';

import {
  fieldDataWorkflowCase,
  fieldDataWorkflowCaseFormAttachment,
} from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';

export async function submitFormAction({
  target,
  handleData,
  successCallback,
}) {
  actionCore({
    api: modelTypeCollection.flowCaseTypeCollection.submitForm,
    params: {
      ...handleData,
    },
    target,
    handleData,
    successCallback,
    textProcessing: '保存表单中',
  });
}

export async function addAttachmentAction({
  target,
  handleData,
  successCallback,
}) {
  actionCore({
    api: modelTypeCollection.flowCaseFormAttachmentTypeCollection.add,
    params: {
      workflowId: getValueByKey({
        data: handleData,
        key: fieldDataWorkflowCase.workflowId.name,
        convert: convertCollection.string,
        defaultValue: '',
      }),
      flowCaseId: getValueByKey({
        data: handleData,
        key: 'flowCaseId',
        convert: convertCollection.string,
        defaultValue: '',
      }),
      uploadHistoryId: getValueByKey({
        data: handleData,
        key: 'uploadHistoryId',
        convert: convertCollection.string,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
  });
}

export async function removeAttachmentAction({
  target,
  handleData,
  successCallback,
}) {
  actionCore({
    api: modelTypeCollection.flowCaseFormAttachmentTypeCollection.remove,
    params: {
      workflowCaseFormAttachmentId: getValueByKey({
        data: handleData,
        key: fieldDataWorkflowCaseFormAttachment.workflowCaseFormAttachmentId
          .name,
        convert: convertCollection.string,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
  });
}
