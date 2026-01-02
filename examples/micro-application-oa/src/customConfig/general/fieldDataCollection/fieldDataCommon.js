import { formNameCollection as formNameCollectionSource } from 'taro-fast-common';

export const formNameCollection = {
  ...formNameCollectionSource,
  channel: {
    label: '数据通道',
    name: 'channel',
    helper: '创建数据时候的通道来源',
  },
  channelNote: {
    label: '数据通道',
    name: 'channelNote',
    helper: '创建数据时候的通道来源',
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
};
