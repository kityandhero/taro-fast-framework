import { CustomWrapper, View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common';
import { Space, Tabs } from 'taro-fast-component';

import { PageNeedSignInWrapper } from '../../../../customComponents';
import { viewStyle } from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { HeadNavigationBox } from '../../../../utils';
import { LetterBox } from '../assist/tools';

const letterTab = {
  key: 'd5d08492c2824bc09671f39f4d726ded',
  title: '全部',
};

const organizationTab = {
  key: '145e849e97a94136b7fadace4ff8db55',
  title: '组织架构',
};

const tabCollection = [letterTab, organizationTab];

function getTabIndex(key) {
  for (const [index, { key: itemKey }] of tabCollection.entries()) {
    if (itemKey === key) {
      return index;
    }
  }

  return 0;
}

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '通讯录',
  navigationStyle: 'custom',
});

@connect(({ addressBook, session, entrance, global, schedulingControl }) => ({
  addressBook,
  session,
  entrance,
  global,
  schedulingControl,
}))
class SingleListAddressBook extends PageNeedSignInWrapper {
  // showCallTrack = true;

  // showCallTrace = true;

  viewStyle = {
    ...viewStyle,
    paddingBottom: transformSize(20),
  };

  enableBackTop = true;

  tabKey = letterTab.key;

  tabList = tabCollection;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection.addressBookTypeCollection.singleListLetterGroup,
    };
  }

  adjustLoadApiPath = () => {
    let api = '';

    switch (this.tabKey) {
      case letterTab.key: {
        api =
          modelTypeCollection.addressBookTypeCollection.singleListLetterGroup;
        break;
      }
      case organizationTab.key: {
        api =
          modelTypeCollection.addressBookTypeCollection
            .singleListDepartmentGroup;
        break;
      }

      default: {
        api = '';
        break;
      }
    }

    return api;
  };

  triggerTabClick = (index, event, item) => {
    const { key, title } = item;

    this.tabKey = key;

    this.setNavigationBarTitle({
      title: title,
    });

    this.reloadData({
      otherState: { metaListData: [] },
      delay: 500,
    });
  };

  buildHeadNavigation = () => {
    return <HeadNavigationBox title="通讯录" />;
  };

  buildTab = () => {
    return (
      <View
        style={{
          // paddingLeft: transformSize(12),
          // paddingRight: transformSize(12),
          backgroundColor: '#ffffff',
        }}
      >
        <CustomWrapper>
          <Tabs
            current={getTabIndex(this.tabKey)}
            // scroll
            titleActiveStyle={{
              color: '#0171fa',
              fontWight: '600',
            }}
            underlineActiveColor="#0171fa"
            underlineHorizontalHeight={4}
            underlineHorizontalMargin={120}
            headerBackgroundColor="#f6f6f6"
            tabList={this.tabList}
            onClick={this.triggerTabClick}
          />
        </CustomWrapper>
      </View>
    );
  };

  buildUpperBox = () => {
    return this.buildTab();
  };

  buildListView = () => {
    const { metaListData } = this.state;

    return (
      <CustomWrapper>
        <View
          style={{
            paddingLeft: transformSize(20),
            paddingRight: transformSize(20),
          }}
        >
          <Space direction="vertical" fillWidth size={10}>
            {metaListData.map((item) => {
              const { letter } = item;

              return <LetterBox key={`box_${letter}`} data={item} />;
            })}
          </Space>
        </View>
      </CustomWrapper>
    );
  };

  renderFurther() {
    const { reloading, metaListData } = this.state;

    return (
      <View>
        {this.judgeInitialActivityIndicatorVisible() ? (
          <></>
        ) : metaListData.length === 0 && !reloading ? (
          <View
            style={{
              paddingTop: transformSize(100),
            }}
          >
            {this.buildEmptyPlaceholder({
              imageWidth: 200,
              description: '还没有数据哦',
              descriptionStyle: {
                marginTop: transformSize(60),
              },
            })}
          </View>
        ) : (
          this.buildListView()
        )}
      </View>
    );
  }
}

export default SingleListAddressBook;
