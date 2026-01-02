import { fieldDataBaseSubsidiaryMessage } from './fieldDataBaseSubsidiaryMessage';

const fieldExtraData = {};

export const fieldDataSubsidiaryFeedbackMessage = {
  ...fieldDataBaseSubsidiaryMessage,
  subsidiaryFeedbackMessageId: {
    label: '数据标识',
    name: 'subsidiaryFeedbackMessageId',
  },
  ...fieldExtraData,
};
