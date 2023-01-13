import { WebView } from '@tarojs/components';

import { envCollection } from 'taro-fast-common/es/utils/constants';
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

    const env = this.getEnv();

    switch (env) {
      case envCollection.WEAPP:
        break;

      case envCollection.ALIPAY:
        break;

      case envCollection.SWAN:
        break;

      case envCollection.WEB:
        if (this.redirectWithWebEnv) {
          recordWarn(
            `framework with env [${env}] use redirect to handle load web page`,
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
