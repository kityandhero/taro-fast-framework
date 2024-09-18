import classNames from 'classnames';
import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import { navigateTo } from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import {
  Card,
  FlexBox,
  IconBulletList,
  More,
  Space,
  Tabs,
} from 'taro-fast-component';

import { pathCollection } from '../../../../customConfig';
import { BasePageWrapper } from '../../BasePageWrapper';
import { buildItem, classPrefix } from '../Assist/tools';

import './index.less';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '新闻应用--首页2',
  backgroundColor: '#3778F4',
});

@connect(({ news, session, entrance, global, schedulingControl }) => ({
  news,
  session,
  entrance,
  global,
  schedulingControl,
}))
export default class Index extends BasePageWrapper {
  enablePullDownRefresh = true;

  enableBackTop = true;

  tabList = [];

  initialSectionIndex = 0;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      loadApiPath: 'news/getOverview',
      advertisingList: [],
      sectionList: [],
      navList: [],
    };
  }

  doWorkBeforeAdjustDidMount = () => {
    const { sectionId } = {
      sectionId: '',
      ...this.externalParameter,
    };

    this.sectionList = this.getSectionList();
    this.sectionId = sectionId || '';

    this.tabList = this.sectionList.map((item) => {
      const { sectionId: itemSectionId, name } = item;

      return {
        sectionId: itemSectionId,
        title: name,
      };
    });
  };

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
    const { galleryList, sectionList, navList } = metaData;

    this.setState({
      advertisingList: galleryList,
      sectionList: sectionList,
      navList,
    });
  };

  buildTab = () => {
    return (
      <FlexBox
        flexAuto="left"
        left={
          <View
            style={{
              width: '100%',
              paddingTop: transformSize(8),
            }}
          >
            <Tabs
              current={this.initialSectionIndex}
              scroll
              titleActiveStyle={{
                color: '#2467db',
              }}
              underlineColor="#2467db"
              underlineHorizontalHeight={4}
              underlineHorizontalMargin={20}
              tabList={this.tabList}
              onClick={this.triggerSectionClick}
            />
          </View>
        }
        right={
          <View
            style={{
              padding: `0 ${transformSize(14)}`,
            }}
          >
            <IconBulletList size={32} />
          </View>
        }
      />
    );
  };

  goToSection = (item) => {
    const { sectionId } = item;

    navigateTo(`${pathCollection.news.section.path}?sectionId=${sectionId}`);
  };

  renderFurther() {
    const { sectionList } = this.state;

    return (
      <>
        {this.buildTab()}

        <View className={classNames(`${classPrefix}__containor`)}>
          <Space direction="vertical" fillWidth>
            {(sectionList || []).map((item, index) => {
              const { config = {}, name, articles } = item;

              const { renderMode } = {
                renderMode: '0',
                ...config,
              };

              if (articles.length === 0) {
                return null;
              }

              return (
                <View
                  key={`section_${index}`}
                  className={classNames(`${classPrefix}__sectionContainor`)}
                >
                  <Card
                    strip
                    stripColor="#3378f4"
                    header={name}
                    headerStyle={{
                      color: '#333',
                    }}
                    border={false}
                    bodyBorder={false}
                    space={false}
                    extra={
                      <More
                        onClick={() => {
                          this.goToSection(item);
                        }}
                      />
                    }
                    extraStyle={{ padding: 0 }}
                  >
                    {buildItem({
                      renderMode,
                      keyPrefix: index,
                      articles,
                    })}
                  </Card>
                </View>
              );
            })}
          </Space>
        </View>
      </>
    );
  }
}
