import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'taro-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';

export async function setBirthdayAction({
  target,
  handleData,
  successCallback,
}) {
  actionCore({
    api: modelTypeCollection.userTypeCollection.setBirthday,
    params: {
      birthday: getValueByKey({
        data: handleData,
        key: 'birthday',
        convert: convertCollection.string,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
  });
}
