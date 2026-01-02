import { formNameCollection } from './fieldDataCommon';

const fieldExtraData = {
  nameNote: {
    label: '键描述',
    name: 'nameNote',
    helper: '',
  },
  valueTypeNote: {
    label: '值类型',
    name: 'valueTypeNote',
    helper: '',
  },
};

export const fieldDataFlowCaseFormStorage = {
  ...formNameCollection,
  workflowFormDesignId: {
    label: '工作流表单设计标识',
    name: 'workflowFormDesignId',
    helper: '',
  },
  workflowId: {
    label: '工作流标识',
    name: 'workflowId',
    helper: '',
  },
  name: {
    label: '键名',
    name: 'name',
    helper: '键名',
  },
  value: {
    label: '原始值',
    name: 'value',
    helper: '',
  },
  valueType: {
    label: '值类型',
    name: 'valueType',
    helper: '',
  },
  calculatedValue: {
    label: '计算值',
    name: 'calculatedValue',
    helper: '',
  },
  displayValue: {
    label: '显示值',
    name: 'displayValue',
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
  ...fieldExtraData,
};
