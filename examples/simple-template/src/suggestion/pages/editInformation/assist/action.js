import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'taro-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';

export async function setNicknameAction({
  target,
  handleData,
  successCallback,
}) {
  actionCore({
    api: modelTypeCollection.customerTypeCollection.setNickname,
    params: {
      nickname: getValueByKey({
        data: handleData,
        key: 'nickname',
        convert: convertCollection.string,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
  });
}

export async function setGenderAction({ target, handleData, successCallback }) {
  actionCore({
    api: modelTypeCollection.customerTypeCollection.setGender,
    params: {
      gender: getValueByKey({
        data: handleData,
        key: 'gender',
        convert: convertCollection.string,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
  });
}
