import { formNameCollection } from './fieldDataCommon';

const fieldExtraData = {
  namePrefix: {
    label: '文件前缀',
    name: 'namePrefix',
    helper: '',
  },
  existPdf: {
    label: '是否存在Pdf版',
    name: 'existPdf',
    helper: '',
  },
  urlPdf: {
    label: 'pdf链接',
    name: 'urlPdf',
    helper: '',
  },
};

export const fieldDataFlowCaseFormAttachment = {
  ...formNameCollection,
  workflowId: {
    label: '流程设计标识',
    name: 'workflowId',
    helper: '',
  },
  tag: {
    label: '标记',
    name: 'tag',
    helper: '',
  },
  name: {
    label: '名称',
    name: 'name',
    helper: '',
  },
  alias: {
    label: '别名',
    name: 'alias',
    helper: '',
  },
  fileType: {
    label: '文件类型',
    name: 'fileType',
    helper: '文件类型',
  },
  size: {
    label: '大小',
    name: 'size',
    helper: '',
  },
  suffix: {
    label: '扩展名',
    name: 'suffix',
    helper: '',
  },
  url: {
    label: '链接',
    name: 'url',
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
