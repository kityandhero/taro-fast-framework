import { isFunction, navigateTo } from 'easy-soft-utility';

import { pathCollection } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import { judgeComplain } from '../../../utils';
import { PageWrapperCore } from '../../general/PageWrapperCore';

class PageWrapperExtra extends PageWrapperCore {
  getGetCustomerApiEffect = (data = {}) => {
    judgeComplain();

    return {
      type: modelTypeCollection.userTypeCollection.getCurrentInfo,
      payload: data,
    };
  };

  goToFlowCaseTab(callback = null) {
    this.switchTab({
      url: `/${pathCollection.root.flowCase.path}`,
      success: () => {
        if (isFunction(callback)) {
          callback();
        }
      },
    });
  }
  goToResetPassword = () => {
    navigateTo(pathCollection.user.resetPassword.path);
  };

  goToChangePassword = () => {
    navigateTo(pathCollection.user.changePassword.path);
  };

  goToEditInformation = () => {
    navigateTo(pathCollection.user.editInformation.path);
  };

  goToSecurity = () => {
    navigateTo(pathCollection.user.security.path);
  };

  goToFlowCase = () => {
    navigateTo(pathCollection.root.flowCase.path);
  };

  goToFlowCaseForm = (id) => {
    navigateTo(`${pathCollection.user.flowCaseForm.path}?id=${id}`);
  };

  goToPageListWorkflow = () => {
    navigateTo({
      url: pathCollection.user.pageListWorkflow.path,
    });
  };

  goToPageListCreateApprove = () => {
    navigateTo({
      url: pathCollection.user.pageListCreateApprove.path,
    });
  };

  goToPageListLatestApprove = () => {
    navigateTo({
      url: pathCollection.user.pageListLatestApprove.path,
    });
  };

  goToPageListWaitApprove = () => {
    navigateTo({
      url: pathCollection.user.pageListWaitApprove.path,
    });
  };

  goToApprove = (id) => {
    navigateTo(`${pathCollection.user.approve.path}?id=${id}`);
  };

  goToDetailFlowCase = (id) => {
    navigateTo(`${pathCollection.user.detailFlowCase.path}?id=${id}`);
  };

  goToPageListNotice = () => {
    navigateTo({
      url: pathCollection.information.pageListNotice.path,
    });
  };

  goToNoticeDetail = (id) => {
    navigateTo(
      `${pathCollection.information.noticeDetail.path}?noticeId=${id}`,
    );
  };

  goToSetting = () => {
    navigateTo(pathCollection.user.setting.path);
  };
}

export { PageWrapperExtra };
