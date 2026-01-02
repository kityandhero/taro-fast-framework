import { appendExtraBuilder } from 'easy-soft-utility';

import {
  listModelBuilder as listCustomModelBuilder,
  modelTypeCollection as modelTypeCollectionCustom,
} from './custom';
import {
  listModelBuilder as listGeneralModelBuilder,
  modelTypeCollection as modelTypeCollectionGeneral,
} from './general';

export const modelTypeCollection = {
  ...modelTypeCollectionGeneral,
  ...modelTypeCollectionCustom,
};

function collectModelBuilder() {
  let listGeneral = listGeneralModelBuilder();

  for (const builder of listGeneral) {
    appendExtraBuilder(builder);
  }

  let listCustom = listCustomModelBuilder();

  for (const builder of listCustom) {
    appendExtraBuilder(builder);
  }
}

collectModelBuilder();

export function prepareModel() {}
