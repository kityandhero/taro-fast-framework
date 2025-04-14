import { formNameCollection } from '../../customConfig';

const fieldExtraData = {};

export const fieldDataBaseSubsidiaryMessage = {
  ...formNameCollection,
  subsidiaryId: {
    label: '企业标识',
    name: 'subsidiaryId',
  },
  title: {
    label: '标题',
    name: 'title',
  },
  description: {
    label: '简介描述',
    name: 'description',
  },
  ...fieldExtraData,
};
