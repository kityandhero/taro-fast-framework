import {
  addressBookTypeCollection,
  buildModel as buildAddressBookModel,
} from './addressBook';
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
  );

  return list;
}
