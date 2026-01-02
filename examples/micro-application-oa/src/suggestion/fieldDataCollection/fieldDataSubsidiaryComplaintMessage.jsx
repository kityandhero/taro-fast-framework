import { fieldDataBaseSubsidiaryMessage } from './fieldDataBaseSubsidiaryMessage';

const fieldExtraData = {};

export const fieldDataSubsidiaryComplaintMessage = {
  ...fieldDataBaseSubsidiaryMessage,
  subsidiaryComplaintMessageId: {
    label: '数据标识',
    name: 'subsidiaryComplaintMessageId',
  },
  ...fieldExtraData,
};
