import {
  buildModel as buildFlowCaseModel,
  flowCaseTypeCollection,
} from './flowCase';

export const modelTypeCollection = {
  flowCaseTypeCollection,
};

export function listModelBuilder() {
  const list = [];

  list.push(buildFlowCaseModel);

  return list;
}
