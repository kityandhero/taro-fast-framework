import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  filter,
  getValueByKey,
  isArray,
  isEmptyArray,
  isEmptyObject,
  isObject,
  logException,
  whetherNumber,
} from 'easy-soft-utility';

import {
  emptySignet,
  fieldDataFlowFormDesign,
  fieldDataWorkflowCase,
  flowApproveActionModeCollection,
  simpleApply,
  simpleAttention,
} from '../../customConfig';

function transferChainApproveList(
  listApprove,
  listChainApprove,
  nextApproveWorkflowNode,
) {
  let list = [];

  const listChainApproveAdjust = (
    isArray(listChainApprove) ? listChainApprove : []
  ).map((o) => {
    const { workflowNodeId: nodeId, name: title } = {
      workflowNodeId: '',
      name: '',
      ...o,
    };

    return {
      nodeId,
      title,
      note: '',
      name: '',
      signet: '',
      time: '',
      status: 'wait',
    };
  });

  if (isEmptyArray(listChainApproveAdjust)) {
    return list;
  }

  let processNoteId = '';

  if (
    isObject(nextApproveWorkflowNode) &&
    !isEmptyObject(nextApproveWorkflowNode)
  ) {
    const { workflowNodeId } = nextApproveWorkflowNode;

    processNoteId = workflowNodeId;
  }

  const listApproveAdjust = isArray(listApprove) ? listApprove : [];

  const approveNodeIdList = listApproveAdjust.map((o) => o.nodeId);

  for (const one of listChainApproveAdjust) {
    const { nodeId } = {
      nodeId: '',
      ...one,
    };

    if (checkInCollection(approveNodeIdList, nodeId)) {
      const listFilter = filter(listApproveAdjust, (item) => {
        const { nodeId: nodeIdItem } = {
          nodeId: '',
          ...item,
        };

        return nodeIdItem === nodeId;
      });

      if (listFilter.length > 0) {
        const o = listFilter[0];

        const { title, note, name, signet, time, action } = { ...one, ...o };

        list.push({
          nodeId,
          title,
          note,
          name,
          signet: signet || emptySignet,
          time,
          action,
          status: 'finish',
        });
      }
    } else {
      if (processNoteId === nodeId) {
        one.status = 'process';
      }

      list.push(one);
    }
  }

  return list;
}

function filterApprove(approveBatchNumber, listProcessHistory) {
  const listApprove = filter(listProcessHistory, (one) => {
    const {
      approveActionMode,
      approveBatchNumber: processHistoryApproveBatchNumber,
    } = {
      approveActionMode: 0,
      approveBatchNumber: 0,
      ...one,
    };

    return (
      approveActionMode === flowApproveActionModeCollection.manualControl &&
      processHistoryApproveBatchNumber === approveBatchNumber
    );
  }).map((o) => {
    const {
      note,
      approveWorkflowNodeId,
      approveWorkflowNodeName,
      approveUserName,
      approveUserSignet,
      approveTime,
      approveActionNote,
    } = {
      approveWorkflowNodeName: '',
      note: '',
      approveUserName: '张三',
      approveUserSignet: '',
      approveTime: '',
      approveActionNote: '',
      ...o,
    };

    return {
      nodeId: approveWorkflowNodeId,
      title: approveWorkflowNodeName,
      note: note || '未填写',
      name: approveUserName,
      signet: approveUserSignet || emptySignet,
      time: approveTime,
      action: approveActionNote,
      status: 'finish',
    };
  });

  return listApprove;
}

export function buildListHistory({ approveBatchNumber, listProcessHistory }) {
  const listHistory = filterApprove(approveBatchNumber, listProcessHistory);

  return listHistory;
}

export function buildListApprove({
  approveBatchNumber,
  listChainApprove,
  listProcessHistory,
  nextApproveWorkflowNode,
}) {
  const listApprove = transferChainApproveList(
    filterApprove(approveBatchNumber, listProcessHistory),
    listChainApprove,
    nextApproveWorkflowNode,
  );

  return listApprove;
}

export function analysisDocumentConfig({ flowCase, workflowFormDesign }) {
  const applicantSignSwitch = getValueByKey({
    data: flowCase,
    key: fieldDataWorkflowCase.applicantSignSwitch.name,
    convert: convertCollection.number,
  });

  const applicantStatementTitle = getValueByKey({
    data: flowCase,
    key: fieldDataWorkflowCase.applicantStatementTitle.name,
    convert: convertCollection.string,
  });

  const applicantStatementContent = getValueByKey({
    data: flowCase,
    key: fieldDataWorkflowCase.applicantStatementContent.name,
    convert: convertCollection.string,
  });

  const applicantUserSignet = getValueByKey({
    data: flowCase,
    key: fieldDataWorkflowCase.applicantUserSignet.name,
    convert: convertCollection.string,
  });

  const attentionSignSwitch = getValueByKey({
    data: flowCase,
    key: fieldDataWorkflowCase.attentionSignSwitch.name,
    convert: convertCollection.number,
  });

  const attentionStatementTitle = getValueByKey({
    data: flowCase,
    key: fieldDataWorkflowCase.attentionStatementTitle.name,
    convert: convertCollection.string,
  });

  const attentionStatementContent = getValueByKey({
    data: flowCase,
    key: fieldDataWorkflowCase.attentionStatementContent.name,
    convert: convertCollection.string,
  });

  const attentionUserSignet = getValueByKey({
    data: flowCase,
    key: fieldDataWorkflowCase.attentionUserSignet.name,
    convert: convertCollection.string,
  });

  const remarkSchemaList = getValueByKey({
    data: workflowFormDesign,
    key: fieldDataFlowFormDesign.remarkSchemaList.name,
    convert: convertCollection.array,
  });

  const documentSchema = getValueByKey({
    data: workflowFormDesign,
    key: fieldDataFlowFormDesign.documentSchema.name,
    defaultValue: {},
  });

  const { general, items: itemsSource } = {
    general: {},
    items: [],
    ...documentSchema,
  };

  const dataSchema = getValueByKey({
    data: workflowFormDesign,
    key: fieldDataFlowFormDesign.dataSchema.name,
    defaultValue: '[]',
  });

  let listDataSchema = [];

  try {
    listDataSchema = JSON.parse(dataSchema);
  } catch (error) {
    logException(
      error,
      'error on analysisDocumentConfig in BaseFlowCaseDetail',
    );
  }

  let items = [];

  if (
    isArray(itemsSource) &&
    !isEmptyArray(itemsSource) &&
    isArray(listDataSchema)
  ) {
    for (const o of listDataSchema) {
      const { name } = { name: '', ...o };

      if (checkStringIsNullOrWhiteSpace(name)) {
        continue;
      }

      let config = {};

      for (const one of itemsSource) {
        const { name: nameOne } = { name: '', ...one };

        if (nameOne === name) {
          config = one;

          break;
        }
      }

      items.push({ ...config, ...o });
    }
  } else {
    items = listDataSchema;
  }

  const listApply = [
    {
      ...simpleApply,
      title: applicantStatementTitle,
      note: applicantStatementContent,
      ...(checkStringIsNullOrWhiteSpace(applicantUserSignet)
        ? {
            signet: emptySignet,
          }
        : {
            signet: applicantUserSignet,
          }),
      time: getValueByKey({
        data: flowCase,
        key: fieldDataWorkflowCase.applicantTime.name,
        convert: convertCollection.string,
      }),
    },
  ];

  const listAttention = [
    {
      ...simpleAttention,
      title: attentionStatementTitle,
      note: attentionStatementContent,
      ...(checkStringIsNullOrWhiteSpace(attentionUserSignet)
        ? {
            signet: emptySignet,
          }
        : {
            signet: attentionUserSignet,
          }),
      time: getValueByKey({
        data: flowCase,
        key: fieldDataWorkflowCase.attentionTime.name,
        convert: convertCollection.string,
      }),
    },
  ];

  return {
    general: general || {},
    items,
    remarkSchemaList,
    showApply: applicantSignSwitch === whetherNumber.yes,
    listApply,
    showAttention: attentionSignSwitch === whetherNumber.yes,
    listAttention,
  };
}
