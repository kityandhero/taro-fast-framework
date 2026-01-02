import { fieldDataBaseSubsidiaryMessage } from './fieldDataBaseSubsidiaryMessage';

const fieldExtraData = {};

export const fieldDataSubsidiaryReportMessage = {
  ...fieldDataBaseSubsidiaryMessage,
  subsidiaryReportMessageId: {
    label: '数据标识',
    name: 'subsidiaryReportMessageId',
  },
  ...fieldExtraData,
};
