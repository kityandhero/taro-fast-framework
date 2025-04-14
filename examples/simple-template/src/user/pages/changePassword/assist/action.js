import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'taro-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';

export async function changePasswordAction({
  target,
  handleData,
  successCallback,
}) {
  actionCore({
    api: modelTypeCollection.userTypeCollection.changePassword,
    params: {
      originalPassword: getValueByKey({
        data: handleData,
        key: 'originalPassword',
        convert: convertCollection.string,
        defaultValue: '',
      }),
      password: getValueByKey({
        data: handleData,
        key: 'password',
        convert: convertCollection.string,
        defaultValue: '',
      }),
      passwordVerify: getValueByKey({
        data: handleData,
        key: 'passwordVerify',
        convert: convertCollection.string,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
  });
}
