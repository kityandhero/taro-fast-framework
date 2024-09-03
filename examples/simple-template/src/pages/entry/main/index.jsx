import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  redirectTo,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import { ActivityIndicator } from 'taro-fast-component';

import { exchangeShareDataAction } from '../../../commonAssist';
import { PageWrapper } from '../../../customComponents';
import { pathCollection, shareTransfer } from '../../../customConfig';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '预加载',
});

@connect(
  ({ customer, entrance, share, session, global, schedulingControl }) => ({
    customer,
    entrance,
    share,
    session,
    global,
    schedulingControl,
  }),
)
class PageMain extends PageWrapper {
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

    const that = this;

    if (checkStringIsNullOrWhiteSpace(scene)) {
      that.handleParams(urlParameters);
    } else {
      that.exchangeShareData({
        scene,
        urlParams: urlParameters,
        callback: (p) => {
          that.handleParams(p);
        },
      });
    }
  };

  exchangeShareData = ({ scene, urlParams, callback }) => {
    if (checkStringIsNullOrWhiteSpace(scene)) {
      this.showNavigationNotice();

      this.goToHomeTab();
    }

    const json = `{${decodeURIComponent(scene)
      .split('&')
      .map((o) => {
        const item = `"${o}"`.replace('=', '":"');

        return item;
      })
      .join(',')}}`;

    const shareData = JSON.parse(json);

    const { shareId } = shareData;

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

      case shareTransfer.customer: {
        this.showNavigationNotice();

        redirectTo(pathCollection.root.customer.path);

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
