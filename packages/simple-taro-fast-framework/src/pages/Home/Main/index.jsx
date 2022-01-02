import { connect } from 'react-redux';
import { View, Text, Button } from '@tarojs/components';

import { formatMoney } from 'taro-fast-framework/es/utils/tools';
import VerticalBox from 'taro-fast-framework/es/customComponents/VerticalBox';
import Loading from 'taro-fast-framework/es/customComponents/Loading';
import AuthorizationWrapper from 'taro-fast-framework/es/framework/AuthorizationWrapper';
import 'taro-fast-framework/es/index.css';

import {
  getOverviewAction,
  getOverviewActionSheet,
  getOverviewActionModal,
} from '../Assist/action';

@connect(({ news, global }) => ({
  news,
  global,
}))
export default class Index extends AuthorizationWrapper {
  showRenderCountInConsole = true;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'news/getOverview',
      },
    };
  }

  getApiData = (props) => {
    const {
      news: { data },
    } = props;

    return data;
  };

  onButtonClick = () => {
    getOverviewActionSheet({
      target: this,
      handleData: {},
      successCallback: ({ target, handleData, remoteData }) => {
        {
          console.log(remoteData);
        }
      },
    });
  };

  renderFurther() {
    return (
      <View className="index">
        <Text>Hello world!</Text>

        <VerticalBox style={{ height: '100rpx' }} alignJustify="center">
          <Loading />
          <Text>{formatMoney({ number: 1.54 })}</Text>
        </VerticalBox>

        <VerticalBox style={{ height: '100rpx' }} alignJustify="center">
          <Button onClick={this.onButtonClick}>按钮</Button>
        </VerticalBox>
      </View>
    );
  }
}
