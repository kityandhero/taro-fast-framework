import { isFunction, navigateTo } from 'easy-soft-utility';

import { pathCollection } from '../../../customConfig';
import { PageWrapperCore } from '../../general/PageWrapperCore';

class PageWrapperExtra extends PageWrapperCore {
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
    navigateTo(pathCollection.customer.resetPassword.path);
  };

  goToChangePassword = () => {
    navigateTo(pathCollection.customer.changePassword.path);
  };

  goToEditInformation = () => {
    navigateTo(pathCollection.customer.editInformation.path);
  };

  goToFlowCase = () => {
    navigateTo(pathCollection.root.flowCase.path);
  };

  goToPageListCreateApprove = () => {
    navigateTo({
      url: pathCollection.customer.pageListCreateApprove.path,
    });
  };

  goToPageListLatestApprove = () => {
    navigateTo({
      url: pathCollection.customer.pageListLatestApprove.path,
    });
  };

  goToPageListWaitApprove = () => {
    navigateTo({
      url: pathCollection.customer.pageListWaitApprove.path,
    });
  };

  goToApprove = (id) => {
    navigateTo(`${pathCollection.customer.approve.path}?id=${id}`);
  };

  goToDetailFlowCase = (id) => {
    navigateTo(`${pathCollection.customer.detailFlowCase.path}?id=${id}`);
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
}

export { PageWrapperExtra };
