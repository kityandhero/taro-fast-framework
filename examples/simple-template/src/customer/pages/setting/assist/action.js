import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'taro-fast-framework';

import { flowApproveMobileViewModeCollection } from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';

export async function setMobileApproveViewModeAction({
  target,
  handleData,
  successCallback,
}) {
  actionCore({
    api: modelTypeCollection.customerTypeCollection.setMobileApproveViewMode,
    params: {
      mobileApproveViewMode: getValueByKey({
        data: handleData,
        key: 'mobileApproveViewMode',
        convert: convertCollection.string,
        defaultValue: flowApproveMobileViewModeCollection.form,
      }),
    },
    target,
    handleData,
    successCallback,
  });
}
