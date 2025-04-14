import {
  addressBookTypeCollection,
  buildModel as buildAddressBookModel,
} from './addressBook';
import {
  buildModel as buildCustomerModel,
  customerTypeCollection,
} from './customer';
import {
  buildModel as buildFlowCaseModel,
  flowCaseTypeCollection,
} from './flowCase';
import {
  buildModel as buildFlowCaseFormAttachmentModel,
  flowCaseFormAttachmentTypeCollection,
} from './flowCaseFormAttachment';
import { buildModel as buildNoticeModel, noticeTypeCollection } from './notice';
import {
  buildModel as buildSubsidiaryModel,
  subsidiaryTypeCollection,
} from './subsidiary';
import {
  buildModel as buildSubsidiaryComplaintCategoryModel,
  subsidiaryComplaintCategoryTypeCollection,
} from './subsidiaryComplaintCategory';
import {
  buildModel as buildSubsidiaryComplaintMessageModel,
  subsidiaryComplaintMessageTypeCollection,
} from './subsidiaryComplaintMessage';
import {
  buildModel as buildSubsidiaryFeedbackMessageModel,
  subsidiaryFeedbackMessageTypeCollection,
} from './subsidiaryFeedbackMessage';
import {
  buildModel as buildSubsidiaryReportMessageModel,
  subsidiaryReportMessageTypeCollection,
} from './subsidiaryReportMessage';
import {
  buildModel as buildWorkbenchModel,
  workbenchTypeCollection,
} from './workbench';
import {
  buildModel as buildWorkflowModel,
  workflowTypeCollection,
} from './workflow';

export const modelTypeCollection = {
  workbenchTypeCollection,
  workflowTypeCollection,
  flowCaseTypeCollection,
  flowCaseFormAttachmentTypeCollection,
  noticeTypeCollection,
  addressBookTypeCollection,
  subsidiaryTypeCollection,
  subsidiaryComplaintCategoryTypeCollection,
  subsidiaryComplaintMessageTypeCollection,
  subsidiaryReportMessageTypeCollection,
  subsidiaryFeedbackMessageTypeCollection,
  customerTypeCollection,
};

export function listModelBuilder() {
  const list = [];

  list.push(
    buildWorkbenchModel,
    buildWorkflowModel,
    buildFlowCaseModel,
    buildFlowCaseFormAttachmentModel,
    buildNoticeModel,
    buildAddressBookModel,
    buildSubsidiaryModel,
    buildSubsidiaryComplaintCategoryModel,
    buildSubsidiaryComplaintMessageModel,
    buildSubsidiaryReportMessageModel,
    buildSubsidiaryFeedbackMessageModel,
    buildCustomerModel,
  );

  return list;
}
