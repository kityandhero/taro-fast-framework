import { formNameCollection } from '../../customConfig';

const fieldExtraData = {};

export const fieldDataApplicationUserFeedback = {
  ...formNameCollection,
  applicationUserFeedbackId: {
    label: '主键标识',
    name: 'applicationUserFeedbackId',
    helper: '',
  },
  maintainerId: {
    label: '用户标识',
    name: 'maintainerId',
    helper: '',
  },
  applicationId: {
    label: '应用标识',
    name: 'applicationId',
    helper: '',
  },
  title: {
    label: '标题',
    name: 'title',
    helper: '',
  },
  description: {
    label: '简介描述',
    name: 'description',
    helper: '',
  },
  whetherReply: {
    label: '是否回复',
    name: 'whetherReply',
    helper: '',
  },
  replyContent: {
    label: '回复内容',
    name: 'replyContent',
    helper: '',
  },
  replyTime: {
    label: '回复时间',
    name: 'replyTime',
    helper: '',
  },
  ...fieldExtraData,
};
