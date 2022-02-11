import { WebView } from '@tarojs/components';

import { stringIsNullOrWhiteSpace } from 'taro-fast-common/es/utils/tools';

import Infrastructure from '../Infrastructure';

class WebPageBase extends Infrastructure {
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
    const urlParams = this.getUrlParams();

    let p = {
      ...urlParams,
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

    return <WebView src={url} />;
  }
}

export default WebPageBase;
