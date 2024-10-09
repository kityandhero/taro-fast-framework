import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import { isArray } from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import { Line } from 'taro-fast-component';

import { PageNeedSignInWrapper } from '../../../customComponents/general';
import { pathCollection, viewStyle } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import {
  GridBox,
  HeadNavigationBox,
  NoticeBox,
  NotificationBox,
  SearchBox,
  spiteHeight,
  SwiperBox,
  TitleBox,
  WaitApproveBox,
} from '../assist';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '工作台',
  navigationStyle: 'custom',
});

@connect(({ workbench, entrance, session, global, schedulingControl }) => ({
  workbench,
  entrance,
  session,
  global,
  schedulingControl,
}))
class Home extends PageNeedSignInWrapper {
  viewStyle = {
    ...viewStyle,
    // backgroundColor: '#fff',
    paddingLeft: transformSize(24),
    paddingRight: transformSize(24),
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.workbenchTypeCollection.getIntegration,
      carouselList: [],
      navigationList: [],
      waitApproveFlowCaseList: [],
      notificationList: [],
    };
  }

  doOtherAfterLoadSuccess = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const {
      navigationList,
      carouselList,
      waitApproveFlowCaseList,
      notificationList,
    } = {
      navigationList: [],
      carouselList: [],
      waitApproveFlowCaseList: [],
      notificationList: [],
      ...metaData,
    };
    this.setState({
      navigationList: isArray(navigationList) ? navigationList : [],
      carouselList: isArray(carouselList) ? carouselList : [],
      waitApproveFlowCaseList: isArray(waitApproveFlowCaseList)
        ? waitApproveFlowCaseList
        : [],
      notificationList: isArray(notificationList) ? notificationList : [],
    });
  };

  onShareAppMessage() {
    const o = {
      path: pathCollection.root.home.path,
    };

    return o;
  }

  buildHeadNavigation = () => {
    const { currentCustomer } = this.state;

    const { subsidiaryName } = {
      subsidiaryName: '',
      ...currentCustomer,
    };

    return <HeadNavigationBox name={subsidiaryName} />;
  };

  renderFurther() {
    const {
      navigationList,
      carouselList,
      waitApproveFlowCaseList,
      notificationList,
    } = this.state;

    return (
      <View className="page page-index">
        <Line transparent height={spiteHeight} />

        <SearchBox />

        <Line transparent height={spiteHeight} />

        <GridBox list={navigationList} />

        <Line transparent height={spiteHeight} />

        <NoticeBox text="您有一条审批需要处理 XX公司付款审批单" />

        <Line transparent height={spiteHeight} />

        <SwiperBox list={carouselList} />

        <TitleBox title="最近待审批事项" />

        <WaitApproveBox list={waitApproveFlowCaseList} />

        <TitleBox title="通知公告" />

        <NotificationBox list={notificationList} />
      </View>
    );
  }
}

export default Home;
