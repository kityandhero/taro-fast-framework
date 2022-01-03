import { connect } from 'react-redux';
import { View, Text, Button } from '@tarojs/components';

import { recordObject } from 'taro-fast-common/es/utils/tools';
import {
  VerticalBox,
  ActivityIndicator,
} from 'taro-fast-component/es/customComponents';
import 'taro-fast-component/es/index.css';

import PageWrapper from '@/customComponents/PageWrapper';

import {
  getOverviewAction,
  getOverviewActionSheet,
  getOverviewActionModal,
} from '../Assist/action';

@connect(({ news, global }) => ({
  news,
  global,
}))
export default class Index extends PageWrapper {
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
          recordObject(remoteData);
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
          recordObject(remoteData);
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
          recordObject(remoteData);
        }
      },
    });
  };

  showRemoteMetaDataInConsole = () => {
    recordObject(this.getRemoteMetaData());
  };

  renderFurther() {
    return (
      <View className="index">
        <Text>Hello world!</Text>

        <ActivityIndicator mode="center" />

        <VerticalBox style={{ height: '100rpx' }} alignJustify="center">
          <ActivityIndicator />
        </VerticalBox>

        <VerticalBox style={{ height: '100rpx' }} alignJustify="center">
          <Button onClick={this.onActionClick}>Action</Button>
          <Button onClick={this.onActionSheetClick}>ActionSheet</Button>
          <Button onClick={this.onActionModalClick}>ActionModal</Button>
          <Button onClick={this.reloadData}>reload</Button>{' '}
          <Button onClick={this.reloadRemoteMetaData}>
            reloadRemoteMetaData
          </Button>
          <Button onClick={this.showRemoteMetaDataInConsole}>
            showRemoteMetaDataInConsole
          </Button>
        </VerticalBox>
      </View>
    );
  }
}
