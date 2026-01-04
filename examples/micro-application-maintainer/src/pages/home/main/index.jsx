import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import { checkStringIsNullOrWhiteSpace, navigateTo } from 'easy-soft-utility';

import { navigateToMiniProgram, transformSize } from 'taro-fast-common';
import { Line } from 'taro-fast-component';

import { PageNeedSignInWrapper } from '../../../customComponents/general';
import { pathCollection, viewStyle } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import { HeadNavigationBox } from '../../../utils';
import { spiteHeight } from '../assist';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '工作台',
  navigationStyle: 'custom',
});

@connect(({ entrance, session, global, schedulingControl }) => ({
  entrance,
  session,
  global,
  schedulingControl,
}))
class Home extends PageNeedSignInWrapper {
  // showCallTrack = true;

  // showCallTrace = true;

  viewStyle = {
    ...viewStyle,
    // backgroundColor: '#fff',
    paddingLeft: transformSize(12),
    paddingRight: transformSize(12),
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.workbenchTypeCollection.getIntegration,
    };
  }

  doWorkWhenRepeatedShow = () => {
    this.reloadData({});
  };

  onShareAppMessage() {
    const o = {
      path: pathCollection.root.home.path,
    };

    return o;
  }

  onGridItemClick = (item) => {
    const { value, type, path, exteriorMicroAppId } = item;

    if (type === 'html' && !checkStringIsNullOrWhiteSpace(path)) {
      this.goToGeneralWebPage({
        path: pathCollection.webpage.general.path,
        title: value || '',
        url: path,
      });
    }

    if (type === 'page' && !checkStringIsNullOrWhiteSpace(path)) {
      navigateTo({
        url: path,
      });
    }

    if (
      type === 'exteriorMicroApp' &&
      !checkStringIsNullOrWhiteSpace(exteriorMicroAppId)
    ) {
      navigateToMiniProgram({ appId: exteriorMicroAppId });
    }
  };

  buildHeadNavigation = () => {
    const { currentCustomer } = this.state;

    const { subsidiaryName } = {
      subsidiaryName: '',
      ...currentCustomer,
    };

    return <HeadNavigationBox title={subsidiaryName} titleBold arrow />;
  };

  renderFurther() {
    return (
      <View className="page page-index">
        <Line transparent height={spiteHeight} />
      </View>
    );
  }
}

export default Home;
