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

export const modelTypeCollection = {
  workbenchTypeCollection,
  flowCaseTypeCollection,
  noticeTypeCollection,
  addressBookTypeCollection,
};

export function listModelBuilder() {
  const list = [];

  list.push(
    buildWorkbenchModel,
    buildFlowCaseModel,
    buildNoticeModel,
    buildAddressBookModel,
  );

  return list;
}
