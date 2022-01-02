import { connect } from 'react-redux';
import { View, Text, Button } from '@tarojs/components';

import { formatMoney } from 'taro-fast-framework/es/utils/tools';
import AuthorizationWrapper from 'taro-fast-framework/es/framework/AuthorizationWrapper';
import VerticalBox from 'taro-fast-component/es/customComponents/VerticalBox';
import Loading from 'taro-fast-component/es/customComponents/Loading';
import 'taro-fast-component/es/index.css';

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

  onActionClick = () => {
    getOverviewAction({
      target: this,
      handleData: {},
      successCallback: ({ remoteData }) => {
        {
          console.log(remoteData);
        }
      },
    });
  };

  onActionSheetClick = () => {
    getOverviewActionSheet({
      target: this,
      handleData: {},
      successCallback: ({ remoteData }) => {
        {
          console.log(remoteData);
        }
      },
    });
  };

  onActionModalClick = () => {
    getOverviewActionModal({
      target: this,
      handleData: {},
      successCallback: ({ remoteData }) => {
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
          <Button onClick={this.onActionClick}>Action</Button>
        </VerticalBox>

        <VerticalBox style={{ height: '100rpx' }} alignJustify="center">
          <Button onClick={this.onActionSheetClick}>ActionSheet</Button>
        </VerticalBox>

        <VerticalBox style={{ height: '100rpx' }} alignJustify="center">
          <Button onClick={this.onActionModalClick}>ActionModal</Button>
        </VerticalBox>
      </View>
    );
  }
}
