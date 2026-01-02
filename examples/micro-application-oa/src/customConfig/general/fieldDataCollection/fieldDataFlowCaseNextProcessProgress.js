import { formNameCollection } from './fieldDataCommon';

const fieldExtraData = {
  flowCaseTitle: {
    label: '流程实例名',
    name: 'flowCaseTitle',
    helper: '',
  },
  workflowName: {
    label: '流程名',
    name: 'workflowName',
    helper: '',
  },
  nextWorkflowNodeName: {
    label: '下一审批的流程节点',
    name: 'nextWorkflowNodeName',
    helper: '',
  },
  nextWorkflowNodeTypeNote: {
    label: '下一审批的流程节点类型',
    name: 'nextWorkflowNodeTypeNote',
    helper: '',
  },
};

export const fieldDataFlowCaseNextProcessProgress = {
  ...formNameCollection,
  workflowId: {
    label: '流程标识',
    name: 'workflowId',
    helper: '',
  },
  flowCaseId: {
    label: '流程实例标识',
    name: 'flowCaseId',
    helper: '',
  },
  previousProcessHistoryId: {
    label: '上一步审批历史标识',
    name: 'previousProcessHistoryId',
    helper: '',
  },
  nextWorkflowNodeId: {
    label: '下一审批的流程节点标识',
    name: 'nextWorkflowNodeId',
    helper: '',
  },
  inWorkflowLineId: {
    label: '下一审批节点驶入线条',
    name: 'inWorkflowLineId',
    helper: '',
  },
  nextWorkflowNodeType: {
    label: '下一审批的流程节点类型',
    name: 'nextWorkflowNodeType',
    helper: '',
  },
  status: {
    label: '状态',
    name: 'status',
    helper: '用户状态',
  },
  statusNote: {
    label: '状态',
    name: 'statusNote',
    helper: '用户状态',
  },
  createOperatorId: {
    label: '创建人标识',
    name: 'createOperatorId',
    helper: '',
  },
  createTime: {
    label: '创建时间',
    name: 'createTime',
    helper: '',
  },
  updateOperatorId: {
    label: '更新人标识',
    name: 'updateOperatorId',
    helper: '',
  },
  updateTime: {
    label: '更新时间',
    name: 'updateTime',
    helper: '',
  },
  ...fieldExtraData,
};
