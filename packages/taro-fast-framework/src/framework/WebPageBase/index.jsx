import { WebView } from '@tarojs/components';

import {
  checkStringIsNullOrWhiteSpace,
  envCollection,
  logWarn,
} from 'easy-soft-utility';

import { Infrastructure } from '../Infrastructure';

class WebPageBase extends Infrastructure {
  redirectWithWebEnv = true;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      title: '',
      url: '',
    };
  }

  doWorkAdjustDidMount = () => {
    const { title, url } = this.getWebPageParams();

    if (!checkStringIsNullOrWhiteSpace(title)) {
      const t = decodeURIComponent(title);

      this.setNavigationBarTitle({
        title: t,
      });
    }

    this.setState({ title, url });
  };

  getWebPageParams = () => {
    const externalParameters = this.externalParameter;

    let p = {
      ...externalParameters,
    };

    const { title: titleEncode, url: urlEncode } = p;

    let title = '';
    let url = '';

    if (!checkStringIsNullOrWhiteSpace(titleEncode)) {
      title = decodeURIComponent(titleEncode);
    }

    if (!checkStringIsNullOrWhiteSpace(urlEncode)) {
      url = decodeURIComponent(urlEncode);
    }

    return {
      title,
      url,
    };
  };

  renderFurther() {
    const { url } = this.state;

    const environment = this.getEnvironment();

    switch (environment) {
      case envCollection.WEAPP: {
        break;
      }

      case envCollection.ALIPAY: {
        break;
      }

      case envCollection.SWAN: {
        break;
      }

      case envCollection.WEB: {
        if (this.redirectWithWebEnv) {
          logWarn(
            `framework with env [${environment}] use redirect to handle load web page`,
          );

          if (window) {
            window.location.replace(url);
          }

          return <></>;
        }

        break;
      }

      default: {
        break;
      }
    }

    return <WebView src={url} />;
  }
}

export { WebPageBase };
