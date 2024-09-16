import { formNameCollection } from './fieldDataCommon';

const formExtraData = {
  outLineCount: {
    label: '发出线条数量',
    name: 'outLineCount',
    helper: '',
  },
  inLineCount: {
    label: '进入线条数量',
    name: 'inLineCount',
    helper: '',
  },
  listOutLine: {
    label: '发出线条列表',
    name: 'listOutLine',
    helper: '',
  },
  listInLine: {
    label: '进入线条列表',
    name: 'listInLine',
    helper: '',
  },
  listWorkflowNodeApprover: {
    label: '节点审批人列表',
    name: 'listInLine',
    helper: '',
  },
  listWorkflowBranchCondition: {
    label: '节点分支条件列表',
    name: 'listWorkflowBranchCondition',
    helper: '',
  },
};

export const fieldDataFlowNode = {
  ...formNameCollection,
  workflowNodeId: {
    label: '数据标识',
    name: 'workflowNodeId',
    helper: '',
  },
  workflowId: {
    label: '工作流标识',
    name: 'workflowId',
    helper: '',
  },
  name: {
    label: '节点名称',
    name: 'name',
    helper: '工作流节点的名称',
  },
  description: {
    label: '简介描述 ',
    name: 'description',
    helper: '',
  },
  listApprover: {
    label: '审核人列表 ',
    name: 'listApprover',
    helper: '',
  },
  viewConfig: {
    label: '视图配置',
    name: 'viewConfig',
    helper: '',
  },
  viewConfigData: {
    label: '视图配置',
    name: 'viewConfigData',
    helper: '',
  },
  type: {
    label: '类型',
    name: 'type',
    helper: '',
  },
  typeNote: {
    label: '类型',
    name: 'typeNote',
    helper: '',
  },
  approverMode: {
    label: '审批人模式',
    name: 'approverMode',
    helper: '',
  },
  approverModeNote: {
    label: '审批人模式',
    name: 'approverModeNote',
    helper: '',
  },
  approveMode: {
    label: '审批模式',
    name: 'approverMode',
    helper: '',
  },
  approveModeNote: {
    label: '审批模式',
    name: 'approverModeNote',
    helper: '',
  },
  status: {
    label: '状态',
    name: 'status',
    helper: '',
  },
  statusNote: {
    label: '状态',
    name: 'statusNote',
    helper: '',
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
  ...formExtraData,
};
