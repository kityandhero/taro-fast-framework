import {
  buildModel as buildFlowCaseModel,
  flowCaseTypeCollection,
} from './flowCase';
import {
  buildModel as buildWorkbenchModel,
  workbenchTypeCollection,
} from './workbench';

export const modelTypeCollection = {
  workbenchTypeCollection,
  flowCaseTypeCollection,
};

export function listModelBuilder() {
  const list = [];

  list.push(buildWorkbenchModel, buildFlowCaseModel);

  return list;
}
