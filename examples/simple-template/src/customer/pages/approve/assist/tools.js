import {
  checkInCollection,
  filter,
  isArray,
  isEmptyArray,
  isEmptyObject,
  isObject,
} from 'easy-soft-utility';

import {
  emptySignet,
  flowApproveActionModeCollection,
} from '../../../../customConfig';

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

function filterApprove(listProcessHistory) {
  const listApprove = filter(listProcessHistory, (one) => {
    const { approveActionMode } = {
      approveActionMode: 0,
      ...one,
    };

    return approveActionMode === flowApproveActionModeCollection.manualControl;
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

export function buildListHistory({ listProcessHistory }) {
  const listHistory = filterApprove(listProcessHistory);

  return listHistory;
}

export function buildListApprove({
  listChainApprove,
  listProcessHistory,
  nextApproveWorkflowNode,
}) {
  const listApprove = transferChainApproveList(
    filterApprove(listProcessHistory),
    listChainApprove,
    nextApproveWorkflowNode,
  );

  return listApprove;
}
