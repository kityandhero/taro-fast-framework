import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { CenterBox } from 'taro-fast-component/es/customComponents';
import { getApiDataCore } from 'taro-fast-framework/es/utils/actionAssist';
import { getCurrentCustomer } from 'taro-fast-framework/es/utils/globalStorageAssist';

import BasePageWrapper from '../../BasePageWrapper';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '模板页--获取天气',
});

@connect(({ customer, entrance, session, global, schedulingControl }) => ({
  customer,
  entrance,
  session,
  global,
  schedulingControl,
}))
export default class Index extends BasePageWrapper {
  verifySession = true;

  verifyTicket = true;

  verifyTicketValidity = true;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        nickname: '',
      },
    };
  }

  getApiData = (props) => {
    return getApiDataCore({ props, modelName: 'customer' });
  };

  doWorkAdjustDidMount = () => {
    this.buildCustomerData();
  };

  buildCustomerData = () => {
    const that = this;

    that.getCustomer({
      force: true,
      callback: (o) => {
        console.log(o);

        const { nickname } = {
          ...{
            nickname: '',
          },
          o,
        };

        that.setState({
          nickname,
        });
      },
    });
  };

  renderFurther() {
    // const customer = {
    //   ...{
    //     nickname: '',
    //   },
    //   ...getCurrentCustomer(),
    // };
    const { nickname } = this.state;

    console.log(getCurrentCustomer());

    return (
      <View
        style={{
          width: '100%',
          height: transformSize(400),
        }}
      >
        <CenterBox>当前用户: {nickname} </CenterBox>
      </View>
    );
  }
}
