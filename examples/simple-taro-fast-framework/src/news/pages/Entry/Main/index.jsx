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
import { BasePageWrapper } from '../../BasePageWrapper';

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

  handleLogic = () => {
    const urlParameters = this.externalParameter;

    const { scene } = urlParameters || { scene: '' };

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

      redirectTo(pathCollection.news.home.path);
    }

    const json = `{${decodeURIComponent(scene)
      .split('&')
      .map((o) => {
        const item = `\\"${o}\\"`.replace('=', '":"');

        return item;
      })
      .join(',')}}`;

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

        const urlParametersChanged = {
          ...urlParams,
          ...mergeData,
        };

        if (isFunction(callback)) {
          // eslint-disable-next-line promise/no-callback-in-promise
          callback(urlParametersChanged);
        } else {
          //跳转首页
        }

        return urlParametersChanged;
      })
      .catch((error) => {
        logException(error, 'error on remoteRequest in exchangeShareData');
      });
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

        redirectTo(pathCollection.news.home.path);

        break;
      }
      case shareTransfer.customer: {
        this.showNavigationNotice();

        redirectTo(pathCollection.news.section.path);

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
          `${pathCollection.webPage.path}?title=${title}&url=${url}`,
        );

        break;
      }
      default: {
        redirectTo(pathCollection.news.home.path);
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
