import { formNameCollection } from './fieldDataCommon';

const formExtraData = {};

export const fieldDataFlowLine = {
  ...formNameCollection,
  workflowLineId: {
    label: '数据标识',
    name: 'workflowLineId',
    helper: '',
  },
  workflowId: {
    label: '工作流标识',
    name: 'workflowId',
    helper: '',
  },
  title: {
    label: '标题',
    name: 'title',
    helper: '线条的标题',
  },
  description: {
    label: '描述备注',
    name: 'description',
    helper: '线条的描述备注',
  },
  fromId: {
    label: '出发节点',
    name: 'fromId',
    helper: '出发节点标识',
  },
  fromName: {
    label: '出发节点',
    name: 'fromName',
    helper: '出发节点名称',
  },
  fromPosition: {
    label: '起始节点线条位置点',
    name: 'fromPosition',
    helper: '起始节点线条的位置',
  },
  fromPositionName: {
    label: '起始节点线条位置点',
    name: 'fromPositionName',
    helper: '起始节点线条的位置',
  },
  fromPositionNote: {
    label: '起始节点线条位置点',
    name: 'fromPositionNote',
    helper: '起始节点线条的位置',
  },
  toId: {
    label: '到达节点',
    name: 'toId',
    helper: '到达节点标识',
  },
  toName: {
    label: '到达节点',
    name: 'toName',
    helper: '到达节点名称',
  },
  toPosition: {
    label: '到达节点线条位置点',
    name: 'toPosition',
    helper: '到达节点线条的位置',
  },
  toPositionName: {
    label: '到达节点线条位置点',
    name: 'toPositionName',
    helper: '到达节点线条的位置',
  },
  toPositionNote: {
    label: '到达节点线条位置点',
    name: 'toPositionNote',
    helper: '到达节点线条的位置',
  },
  workflowBranchConditionId: {
    label: '绑定分支条件',
    name: 'workflowBranchConditionId',
    helper: '线路绑定的分支条件标识',
  },
  workflowBranchConditionName: {
    label: '绑定分支条件',
    name: 'workflowBranchConditionName',
    helper: '线路绑定的分支条件标识',
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
