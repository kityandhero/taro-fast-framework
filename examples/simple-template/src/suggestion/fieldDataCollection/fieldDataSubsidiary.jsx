import { formNameCollection } from '../../customConfig';

const fieldExtraData = {};

export const fieldDataSubsidiary = {
  ...formNameCollection,
  subsidiaryId: {
    label: '数据标识',
    name: 'subsidiaryId',
  },
  shortName: {
    label: '简称',
    name: 'shortName',
  },
  fullName: {
    label: '简称',
    name: 'fullName',
  },
  complaintSwitch: {
    label: '投诉开关',
    name: 'complaintSwitch',
    helper: '',
  },
  complaintSwitchNote: {
    label: '投诉开关',
    name: 'complaintSwitchNote',
    helper: '',
  },
  reportSwitch: {
    label: '举报开关',
    name: 'reportSwitch',
    helper: '',
  },
  reportSwitchNote: {
    label: '举报开关',
    name: 'reportSwitchNote',
    helper: '',
  },
  feedbackSwitch: {
    label: '留言开关',
    name: 'feedbackSwitch',
    helper: '',
  },
  feedbackSwitchNote: {
    label: '留言开关',
    name: 'feedbackSwitchNote',
    helper: '',
  },
  ...fieldExtraData,
};
