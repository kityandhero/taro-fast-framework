import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'taro-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';

export async function setAddressAction({
  target,
  handleData,
  successCallback,
}) {
  actionCore({
    api: modelTypeCollection.customerTypeCollection.setAddress,
    params: {
      address: getValueByKey({
        data: handleData,
        key: 'address',
        convert: convertCollection.string,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
  });
}
