import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  isEmptyObject,
  isFunction,
  isObject,
  redirectTo,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import { ActivityIndicator } from 'taro-fast-component';

import { exchangeShareDataAction } from '../../../commonAssist';
import { PageWrapper } from '../../../customComponents';
import { pathCollection, shareTransfer } from '../../../customConfig';
import { analysisScene } from '../../../utils';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '预加载',
});

@connect(({ user, entrance, share, session, global, schedulingControl }) => ({
  user,
  entrance,
  share,
  session,
  global,
  schedulingControl,
}))
class PageMain extends PageWrapper {
  showCallTrack = true;

  showCallTrace = true;

  useFadeSpinWrapper = false;

  initMetaDataForce = true;

  loadRemoteRequestAfterMount = false;

  ignoreSessionRelatedLogic = true;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      navigationNoticeVisible: false,
    };
  }

  doWorkWhenCheckTicketValidityOnPrepareLoadRemoteRequest = () => {
    this.handleLogic();
  };

  doWorkWhenCheckTicketValidityOnRepeatedShow = () => {
    this.handleLogic();
  };

  doWhenSignInSilentFail = () => {
    this.handleLogic();
  };

  handleLogic = () => {
    const urlParameters = this.externalParameter;

    const { scene } = {
      scene: '',
      ...urlParameters,
    };

    const sceneData = analysisScene(scene);

    const that = this;

    let needPretreatmentUrlParameters = false;

    if (isObject(urlParameters) && !isEmptyObject(urlParameters)) {
      needPretreatmentUrlParameters = true;
    }

    if (isObject(sceneData) && !isEmptyObject(sceneData)) {
      needPretreatmentUrlParameters = true;
    }

    if (needPretreatmentUrlParameters) {
      that.pretreatmentUrlParameters(urlParameters, sceneData);
    }

    const { shareId } = {
      shareId: '',
      ...sceneData,
    };

    if (!checkStringIsNullOrWhiteSpace(shareId)) {
      that.exchangeShareData({
        shareId,
        urlParams: urlParameters,
        callback: (p) => {
          that.handleParams(p);
        },
      });

      return;
    }

    if (isObject(urlParameters) && !isEmptyObject(urlParameters)) {
      that.handleParams(urlParameters);

      return;
    }

    this.showNavigationNotice();

    this.goToHomeTab();
  };

  exchangeShareData = ({ shareId, urlParams, callback }) => {
    if (checkStringIsNullOrWhiteSpace(shareId)) {
      const text = '无效的分享标识';

      showSimpleErrorMessage(text);

      this.goToHomeTab();
    } else {
      exchangeShareDataAction({
        target: this,
        handleData: {
          shareId: shareId || '',
        },
        successCallback: ({ target, remoteData }) => {
          const { urlData } = remoteData;

          if (isFunction(callback)) {
            callback({
              transfer: '',
              ...urlParams,
              ...urlData,
            });
          } else {
            target.goToHomeTab();
          }
        },
        failureCallback: ({ target }) => {
          target.goToHomeTab();
        },
      });
    }
  };

  // eslint-disable-next-line no-unused-vars
  pretreatmentUrlParameters(urlParameters, sceneData) {}

  handleParams(urlParameters) {
    this.handleRedirect(urlParameters);
  }

  handleRedirect(urlParameters) {
    const {
      transfer,
      title: titleEncode,
      url: urlEncode,
    } = {
      transfer: shareTransfer.home,
      title: '',
      url: '',
      ...urlParameters,
    };

    switch (transfer) {
      case shareTransfer.home: {
        this.showNavigationNotice();

        this.goToHomeTab();

        break;
      }

      case shareTransfer.user: {
        this.showNavigationNotice();

        redirectTo(pathCollection.root.user.path);

        break;
      }

      case shareTransfer.webPage: {
        this.showNavigationNotice();

        let title = '';

        if (!checkStringIsNullOrWhiteSpace(titleEncode)) {
          title = decodeURIComponent(titleEncode);
        }

        let url = '';

        if (!checkStringIsNullOrWhiteSpace(urlEncode)) {
          url = decodeURIComponent(urlEncode);
        }

        this.redirectToPath(
          `${pathCollection.webpage.path}?title=${title}&url=${url}`,
        );

        break;
      }

      default: {
        this.goToHomeTab();
      }
    }
  }

  showNavigationNotice = () => {
    this.setState({
      navigationNoticeVisible: true,
    });
  };

  renderFurther() {
    const { navigationNoticeVisible } = this.state;

    return (
      <View
        style={{
          position: 'relative',
          width: '100%',
          height: transformSize(400),
        }}
      >
        <ActivityIndicator
          hidden={!navigationNoticeVisible}
          mode="center"
          type="comet"
          content="正在为您跳转"
        />
      </View>
    );
  }
}

export default PageMain;
