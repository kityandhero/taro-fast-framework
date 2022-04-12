import { getApiDataCore } from 'taro-fast-framework/es/utils/actionAssist';

import PageWrapperCore from '../PageWrapperCore';

export default class PageWrapper extends PageWrapperCore {
  dispatchCheckTicketValidity = (data) => {
    return this.dispatchApi({
      type: 'entrance/checkTicketValidity',
      payload: data,
    });
  };

  getCheckTicketValidityApiData = () => {
    console.log(this.props);

    const data = getApiDataCore({
      props: this.props,
      modelName: 'entrance',
    });

    return data;
  };
}
