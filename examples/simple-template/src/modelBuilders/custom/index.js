import {
  addressBookTypeCollection,
  buildModel as buildAddressBookModel,
} from './addressBook';
import {
  buildModel as buildFlowCaseModel,
  flowCaseTypeCollection,
} from './flowCase';
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
  noticeTypeCollection,
  addressBookTypeCollection,
};

export function listModelBuilder() {
  const list = [];

  list.push(
    buildWorkbenchModel,
    buildWorkflowModel,
    buildFlowCaseModel,
    buildNoticeModel,
    buildAddressBookModel,
  );

  return list;
}
