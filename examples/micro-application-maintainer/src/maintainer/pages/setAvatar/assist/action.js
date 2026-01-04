import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'taro-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';

export async function setAvatarAction({ target, handleData, successCallback }) {
  actionCore({
    api: modelTypeCollection.maintainerTypeCollection.setAvatar,
    params: {
      avatar: getValueByKey({
        data: handleData,
        key: 'avatar',
        convert: convertCollection.string,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
  });
}
