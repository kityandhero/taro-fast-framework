import { actionCore } from 'taro-fast-framework';

import { modelTypeCollection } from '../../../modelBuilders';

export async function getSubsidiaryAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.subsidiaryTypeCollection.get,
    params: {
      ...handleData,
    },
    target,
    handleData,
    successCallback,
    successMessage,
    showProcessing: false,
  });
}

export async function singleListSubsidiaryAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.subsidiaryTypeCollection.singleList,
    params: {
      ...handleData,
    },
    target,
    handleData,
    successCallback,
    successMessage,
    showProcessing: false,
  });
}

export async function singleListComplaintCategoryAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.subsidiaryComplaintCategoryTypeCollection
      .singleList,
    params: {
      ...handleData,
    },
    target,
    handleData,
    successCallback,
    successMessage,
    showProcessing: false,
  });
}
