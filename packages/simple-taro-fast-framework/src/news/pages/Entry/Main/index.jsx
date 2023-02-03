import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  logException,
  redirectTo,
  showSimpleErrorMessage,
  toString,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import { ActivityIndicator } from 'taro-fast-component';

import { pathCollection, shareTransfer } from '../../../../customConfig';
import BasePageWrapper from '../../BasePageWrapper';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '预加载',
});

@connect(({ entrance, session, global, schedulingControl }) => ({
  entrance,
  session,
  global,
  schedulingControl,
}))
export default class Index extends BasePageWrapper {
  loadRemoteRequestAfterMount = false;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        navigationNoticeVisible: false,
      },
    };
  }

  doWorkWhenCheckTicketValidityOnPrepareLoadRemoteRequest = () => {
    this.handleLogic();
  };

  doWorkWhenCheckTicketValidityOnRepeatedShow = () => {
    this.handleLogic();
  };

  handleLogic = () => {
    const urlParams = this.externalParameter;

    const { scene } = urlParams || { scene: '' };

    const that = this;

    if (checkStringIsNullOrWhiteSpace(scene)) {
      that.handleParams(urlParams);
    } else {
      that.exchangeShareData({
        scene,
        urlParams,
        callback: (p) => {
          that.handleParams(p);
        },
      });
    }
  };

  exchangeShareData = ({ scene, urlParams, callback }) => {
    if (checkStringIsNullOrWhiteSpace(scene)) {
      this.showNavigationNotice();

      redirectTo(pathCollection.news.home.path);
    }

    const json = `{${decodeURIComponent(scene)
      .split('&')
      .map((o) => {
        const item = `\"${o}\"`.replace('=', '":"');

        return item;
      })
      .join()}}`;

    const shareData = JSON.parse(json);

    const { shareId } = shareData;

    if (checkStringIsNullOrWhiteSpace(shareId)) {
      showSimpleErrorMessage('无效的分享标识');
    }

    this.remoteRequest({
      type: 'global/exchangeShare',
      payload: {
        shareId: shareId || '',
      },
      modelName: 'global',
    })
      .then(({ data }) => {
        const { urlData: shareRemoteData } = data;
        const { transfer } = shareRemoteData;

        const mergeData = {};

        if (!checkStringIsNullOrWhiteSpace(toString(transfer || ''))) {
          mergeData.transfer = transfer;
        }

        const urlParamsChanged = {
          ...urlParams,
          ...mergeData,
        };

        if (isFunction(callback)) {
          // eslint-disable-next-line promise/no-callback-in-promise
          callback(urlParamsChanged);
        } else {
          //跳转首页
        }

        return urlParamsChanged;
      })
      .catch((error) => {
        logException(error);
      });
  };

  handleParams(urlParams) {
    this.handleRedirect(urlParams);
  }

  handleRedirect(urlParams) {
    const {
      transfer,
      title: titleEncode,
      url: urlEncode,
    } = {
      ...{
        transfer: shareTransfer.home,
        title: '',
        url: '',
      },
      ...urlParams,
    };

    if (transfer === shareTransfer.home) {
      this.showNavigationNotice();

      redirectTo(pathCollection.news.home.path);
    } else if (transfer === shareTransfer.customer) {
      this.showNavigationNotice();

      redirectTo(pathCollection.news.section.path);
    } else if (transfer === shareTransfer.webPage) {
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
        `${pathCollection.webPage.path}?title=${title}&url=${url}`,
      );
    } else {
      redirectTo(pathCollection.news.home.path);
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
