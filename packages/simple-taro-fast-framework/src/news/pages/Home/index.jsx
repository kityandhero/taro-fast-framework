import classNames from 'classnames';
import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { navigateTo, transformSize } from 'taro-fast-common/es/utils/tools';
import { isArray } from 'taro-fast-common/es/utils/typeCheck';
import { getApiDataCore } from 'taro-fast-framework/es/utils/actionAssist';
import {
  Space,
  ImageBox,
  Swiper,
  SearchBar,
  Grid,
  FlexBox,
  CenterBox,
  Card,
  More,
} from 'taro-fast-component/es/customComponents';

import BasePageWrapper from '../BasePageWrapper';

import { classPrefix, buildItem } from './tools';

import './index.less';
import { pathCollection } from '../../../customConfig/config';

const boxStyle = {
  padding: 'var(--tfc-20) 0',
  height: 'var(--tfc-120)',
  color: 'var(--tfc-color-grey)',
};

const nameStyle = {
  width: '100%',
  fontSize: 'var(--tfc-28)',
  height: 'var(--tfc-36)',
  lineHeight: 'var(--tfc-36)',
  textAlign: 'center',
  margin: 'var(--tfc-20) 0',
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '新闻应用--首页',
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

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'news/getOverview',
        advertisingList: [],
        sectionList: [],
        navList: [],
      },
    };
  }

  getApiData = (props) => {
    return getApiDataCore({ props, modelName: 'news' });
  };

  afterLoadSuccess = ({
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

  buildSwiperListData = () => {
    const { advertisingList } = this.state;

    const list = (isArray(advertisingList) ? advertisingList : []).map(
      (item) => {
        const { imageUrl } = item;

        return {
          image: imageUrl,
        };
      },
    );

    return [...list, ...list, ...list, ...list, ...list];
  };

  goToSection = (item) => {
    const { sectionId } = item;

    navigateTo(`${pathCollection.news.section.path}?sectionId=${sectionId}`);
  };

  renderFurther() {
    const { navList, sectionList } = this.state;

    return (
      <>
        <View className={classNames(`${classPrefix}__searchBox`)}>
          <SearchBar
            style={{
              margin: `${transformSize(10)} ${transformSize(20)}`,
              borderRadius: transformSize(100),
            }}
            mode="navigate"
          />
        </View>

        <View className={classNames(`${classPrefix}__containor`)}>
          <Space direction="vertical" fillWidth>
            <Swiper
              autoplay
              enableTouch
              list={this.buildSwiperListData()}
              aspectRatio={0.371}
              itemBuilder={(o) => {
                const { image } = o;

                return (
                  <ImageBox src={image} aspectRatio={0.371} padding={10} />
                );
              }}
            />

            <View className={classNames(`${classPrefix}__navContainor`)}>
              <View
                className={classNames(`${classPrefix}__navContainor__navBox`)}
              >
                <Grid columns={5}>
                  {(navList || []).map((item, index) => {
                    const { image, value } = item;

                    return (
                      <Grid.Item key={`nav_${index}`}>
                        <FlexBox
                          style={boxStyle}
                          flexAuto="top"
                          top={
                            <CenterBox>
                              <View
                                className={classNames(
                                  `${classPrefix}__navContainor__navBox__imageBox`,
                                )}
                              >
                                <ImageBox src={image} />
                              </View>
                            </CenterBox>
                          }
                          bottom={<View style={nameStyle}>{value}</View>}
                        />
                      </Grid.Item>
                    );
                  })}
                </Grid>
              </View>
            </View>

            {(sectionList || []).map((item, index) => {
              const { config = {}, name, articles } = item;

              const { renderMode } = {
                ...{
                  renderMode: '0',
                },
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
