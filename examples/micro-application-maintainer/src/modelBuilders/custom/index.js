import {
  buildModel as buildMaintainerModel,
  maintainerTypeCollection,
} from './maintainer';
import {
  buildModel as buildSummaryModel,
  summaryTypeCollection,
} from './summary';

export const modelTypeCollection = {
  summaryTypeCollection,
  maintainerTypeCollection,
};

export function listModelBuilder() {
  const list = [];

  list.push(buildSummaryModel, buildMaintainerModel);

  return list;
}
