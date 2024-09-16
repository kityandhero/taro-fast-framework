import { formNameCollection } from './fieldDataCommon';

const fieldExtraData = {
  flowCaseTitle: {
    label: '实例标题',
    name: 'flowCaseTitle',
    helper: '',
  },
  approveTime: {
    label: '审批时间',
    name: 'approveTime',
    helper: '',
  },
};

export const fieldDataFlowCaseProcessHistory = {
  ...formNameCollection,
  flowCaseId: {
    label: '实例标识',
    name: 'flowCaseId',
    helper: '',
  },
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
  approveWorkflowNodeId: {
    label: '审批流程节点标识',
    name: 'approveWorkflowNodeId',
    helper: '',
  },
  approveWorkflowNodeName: {
    label: '审批流程节点名称',
    name: 'approveWorkflowNodeName',
    helper: '',
  },
  approveWorkflowNodeType: {
    label: '审批流程节点类型',
    name: 'approveWorkflowNodeType',
    helper: '',
  },
  approveWorkflowNodeTypeNote: {
    label: '审批流程节点类型',
    name: 'approveWorkflowNodeTypeNote',
    helper: '',
  },
  note: {
    label: '审批意见',
    name: 'note',
    helper: '',
  },
  approveUserId: {
    label: '审批人用户标识',
    name: 'approveUserId',
    helper: '',
  },
  approveUserName: {
    label: '审批人名称',
    name: 'approveUserName',
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
  inWorkflowLineId: {
    label: '驶入线条标识',
    name: 'inWorkflowLineId',
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
