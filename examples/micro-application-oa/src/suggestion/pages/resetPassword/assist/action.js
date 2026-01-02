import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'taro-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';

export async function refreshCaptchaAction({
  target,
  handleData,
  successCallback,
}) {
  actionCore({
    api: modelTypeCollection.entranceTypeCollection.refreshCaptcha,
    params: { ...handleData },
    target,
    handleData,
    successCallback,
  });
}

export async function signInWithPhoneAction({
  target,
  handleData,
  successCallback,
}) {
  actionCore({
    api: modelTypeCollection.entranceTypeCollection.signInWithPhone,
    params: {
      phone: getValueByKey({
        data: handleData,
        key: 'phone',
        convert: convertCollection.string,
        defaultValue: '',
      }),
      password: getValueByKey({
        data: handleData,
        key: 'password',
        convert: convertCollection.string,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
  });
}

export async function signInWithEmailAction({
  target,
  handleData,
  successCallback,
}) {
  actionCore({
    api: modelTypeCollection.entranceTypeCollection.signInWithEmail,
    params: {
      email: getValueByKey({
        data: handleData,
        key: 'email',
        convert: convertCollection.string,
        defaultValue: '',
      }),
      password: getValueByKey({
        data: handleData,
        key: 'password',
        convert: convertCollection.string,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
  });
}
