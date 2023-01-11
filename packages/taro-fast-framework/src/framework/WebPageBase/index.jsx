import { WebView } from '@tarojs/components';
import { ENV_TYPE, getEnv } from '@tarojs/taro';

import {
  recordWarn,
  stringIsNullOrWhiteSpace,
} from 'taro-fast-common/es/utils/tools';

import Infrastructure from '../Infrastructure';

class WebPageBase extends Infrastructure {
  redirectWithWebEnv = true;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        title: '',
        url: '',
      },
    };
  }

  doWorkAdjustDidMount = () => {
    const { title, url } = this.getWebPageParams();

    if (!stringIsNullOrWhiteSpace(title)) {
      const t = decodeURIComponent(title);

      this.setNavigationBarTitle({
        title: t,
      });
    }

    this.setState({ title, url });
  };

  getWebPageParams = () => {
    const externalParams = this.externalParameter;

    let p = {
      ...externalParams,
    };

    const { title: titleEncode, url: urlEncode } = p;

    let title = '';
    let url = '';

    if (!stringIsNullOrWhiteSpace(titleEncode)) {
      title = decodeURIComponent(titleEncode);
    }

    if (!stringIsNullOrWhiteSpace(urlEncode)) {
      url = decodeURIComponent(urlEncode);
    }

    return {
      title,
      url,
    };
  };

  renderFurther() {
    const { url } = this.state;

    const ENV = getEnv();

    switch (ENV) {
      case ENV_TYPE.WEAPP:
        break;

      case ENV_TYPE.ALIPAY:
        break;

      case ENV_TYPE.SWAN:
        break;

      case ENV_TYPE.WEB:
        if (this.redirectWithWebEnv) {
          recordWarn(
            `framework with env [${ENV}] use redirect to handle load web page`,
          );

          if (window) {
            window.location.replace(url);
          }

          return <></>;
        }

        break;

      default:
        break;
    }

    return <WebView src={url} />;
  }
}

export default WebPageBase;
