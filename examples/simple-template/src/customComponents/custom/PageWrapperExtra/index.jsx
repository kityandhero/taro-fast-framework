import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  navigateTo,
  redirectTo,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import { getLaunchOption } from 'taro-fast-framework';

import { pathCollection } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import { judgeComplain } from '../../../utils';
import { PageWrapperCore } from '../../general/PageWrapperCore';

class PageWrapperExtra extends PageWrapperCore {
  getGetCustomerApiEffect = (data = {}) => {
    const o = getLaunchOption();
    const result = judgeComplain(o);

    return {
      type: result
        ? modelTypeCollection.customerTypeCollection.getCurrentInfo
        : modelTypeCollection.userTypeCollection.getCurrentInfo,
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

  redirectToSuggestionHome = () => {
    redirectTo({
      url: pathCollection.suggestion.home.path,
    });
  };

  redirectToSuggestionCustomer = () => {
    redirectTo({
      url: pathCollection.suggestion.customer.path,
    });
  };

  goToSuggestionSignIn = () => {
    navigateTo({
      url: pathCollection.suggestion.signIn.path,
    });
  };

  goToSuggestionSetAvatar = () => {
    navigateTo({
      url: pathCollection.suggestion.setAvatar.path,
    });
  };

  goToSuggestionIllustrate = () => {
    navigateTo(pathCollection.suggestion.illustrate.path);
  };

  goToSuggestionEditInformation = () => {
    navigateTo(pathCollection.suggestion.editInformation.path);
  };

  goToSuggestionPageListComplaint = () => {
    navigateTo({
      url: pathCollection.suggestion.pageListComplaint.path,
    });
  };

  goToSuggestionPageListFeedback = () => {
    navigateTo({
      url: pathCollection.suggestion.pageListFeedback.path,
    });
  };

  goToSuggestionPageListReport = () => {
    navigateTo({
      url: pathCollection.suggestion.pageListReport.path,
    });
  };

  goToSuggestionSubmitComplaint = () => {
    navigateTo({
      url: pathCollection.suggestion.submitComplaint.path,
    });
  };

  redirectToSuggestionPageListFeedback = () => {
    navigateTo({
      url: pathCollection.suggestion.pageListFeedback.path,
    });
  };

  redirectToSuggestionPageListReport = () => {
    navigateTo({
      url: pathCollection.suggestion.pageListReport.path,
    });
  };

  redirectToSuggestionPageListComplaint = () => {
    navigateTo({
      url: pathCollection.suggestion.pageListComplaint.path,
    });
  };

  goToSuggestionSubmitFeedback = () => {
    navigateTo({
      url: pathCollection.suggestion.submitFeedback.path,
    });
  };

  goToSuggestionSubmitReport = () => {
    navigateTo({
      url: pathCollection.suggestion.submitReport.path,
    });
  };

  goToSuggestionDetailComplaint = (id) => {
    if (checkStringIsNullOrWhiteSpace(id)) {
      showSimpleErrorMessage('跳转页面参数值无效');

      return;
    }

    navigateTo(`${pathCollection.suggestion.detailComplaint.path}?id=${id}`);
  };

  goToSuggestionDetailFeedback = (id) => {
    if (checkStringIsNullOrWhiteSpace(id)) {
      showSimpleErrorMessage('跳转页面参数值无效');

      return;
    }

    navigateTo(`${pathCollection.suggestion.detailFeedback.path}?id=${id}`);
  };

  goToSuggestionDetailReport = (id) => {
    if (checkStringIsNullOrWhiteSpace(id)) {
      showSimpleErrorMessage('跳转页面参数值无效');

      return;
    }

    navigateTo(`${pathCollection.suggestion.detailReport.path}?id=${id}`);
  };
}

export { PageWrapperExtra };
