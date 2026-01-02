import { formNameCollection } from './fieldDataCommon';

const fieldExtraData = {};

export const fieldDataFlowCaseLatestApprove = {
  ...formNameCollection,
  workflowId: {
    label: '流程标识',
    name: 'workflowId',
    helper: '',
  },
  workflowName: {
    label: '流程名称',
    name: 'workflowName',
    helper: '',
  },
  flowCaseId: {
    label: '流程实例标识',
    name: 'flowCaseId',
    helper: '',
  },
  approveUserId: {
    label: '审批人用户标识',
    name: 'approveUserId',
    helper: '',
  },
  approveUserRealName: {
    label: '审批人用户姓名',
    name: 'approveUserRealName',
    helper: '',
  },
  latestProcessHistoryId: {
    label: '最近期的审批记录标识',
    name: 'latestProcessHistoryId',
    helper: '',
  },
  workflowNodeName: {
    label: '审批节点',
    name: 'workflowNodeName',
    helper: '',
  },
  approveAction: {
    label: '审批动作',
    name: 'approveAction',
    helper: '',
  },
  approveActionNote: {
    label: '审批动作',
    name: 'approveActionNote',
    helper: '',
  },
  approveActionMode: {
    label: '审批动作模式',
    name: 'approveActionMode',
    helper: '',
  },
  approveActionModeNote: {
    label: '审批动作模式',
    name: 'approveActionModeNote',
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
