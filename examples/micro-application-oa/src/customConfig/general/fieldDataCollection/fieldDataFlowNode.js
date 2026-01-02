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
    name: 'approveMode',
    helper: '',
  },
  approveModeNote: {
    label: '审批模式',
    name: 'approveModeNote',
    helper: '',
  },
  whetherOneSignatureDesignateNextApprover: {
    label: '或签是否指定审批人签署',
    name: 'whetherOneSignatureDesignateNextApprover',
    helper: '',
  },
  whetherCounterSignatureInSequence: {
    label: '会签是否按顺序签署',
    name: 'whetherCounterSignatureInSequence',
    helper: '',
  },
  ...formExtraData,
};
