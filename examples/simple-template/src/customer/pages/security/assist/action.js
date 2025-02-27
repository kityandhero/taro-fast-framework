import { actionCore } from 'taro-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';

export async function signOutAction({ target, handleData, successCallback }) {
  actionCore({
    api: modelTypeCollection.entranceTypeCollection.signOut,
    params: {},
    target,
    handleData,
    successCallback,
  });
}
