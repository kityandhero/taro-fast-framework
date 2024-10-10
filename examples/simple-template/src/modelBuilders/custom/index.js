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
};

export function listModelBuilder() {
  const list = [];

  list.push(buildWorkbenchModel, buildFlowCaseModel, buildNoticeModel);

  return list;
}
