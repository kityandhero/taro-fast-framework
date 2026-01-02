import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'taro-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';

export async function refreshVerifyPhoneCaptchaAction({
  target,
  handleData,
  successCallback,
}) {
  actionCore({
    api: modelTypeCollection.customerTypeCollection.refreshVerifyPhoneCaptcha,
    params: { ...handleData },
    target,
    handleData,
    successCallback,
  });
}

export async function sendVerifyPhoneMessageAction({
  target,
  handleData,
  successCallback,
}) {
  actionCore({
    api: modelTypeCollection.customerTypeCollection.sendVerifyPhoneMessage,
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

export async function verifyPhoneAction({
  target,
  handleData,
  successCallback,
}) {
  actionCore({
    api: modelTypeCollection.customerTypeCollection.verifyPhone,
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
    },
    target,
    handleData,
    successCallback,
  });
}

export async function verifyPhoneWithWeChatAction({
  target,
  handleData,
  successCallback,
}) {
  actionCore({
    api: modelTypeCollection.customerTypeCollection.verifyPhoneWithWeChat,
    params: {
      key: getValueByKey({
        data: handleData,
        key: 'key',
        convert: convertCollection.string,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
  });
}
