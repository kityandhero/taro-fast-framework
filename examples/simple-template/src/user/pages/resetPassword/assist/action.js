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

export async function sendRetrievePasswordMessageAction({
  target,
  handleData,
  successCallback,
}) {
  actionCore({
    api: modelTypeCollection.entranceTypeCollection.sendRetrievePasswordMessage,
    params: {
      phone: getValueByKey({
        data: handleData,
        key: 'phone',
        convert: convertCollection.string,
        defaultValue: '',
      }),
      captchaKey: getValueByKey({
        data: handleData,
        key: 'captchaKey',
        convert: convertCollection.string,
        defaultValue: '',
      }),
      captchaCode: getValueByKey({
        data: handleData,
        key: 'captchaCode',
        convert: convertCollection.string,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
  });
}

export async function retrievePasswordAction({
  target,
  handleData,
  successCallback,
}) {
  actionCore({
    api: modelTypeCollection.entranceTypeCollection.retrievePassword,
    params: {
      phone: getValueByKey({
        data: handleData,
        key: 'phone',
        convert: convertCollection.string,
        defaultValue: '',
      }),
      smsCode: getValueByKey({
        data: handleData,
        key: 'smsCode',
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
