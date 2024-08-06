import classNames from 'classnames';
import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import {
  buildLinearGradient,
  isArray,
  navigateTo,
  redirectTo,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import {
  Card,
  CenterBox,
  ColorText,
  FlexBox,
  FloatAction,
  Grid,
  HeadNavigation,
  ImageBox,
  More,
  ScaleBox,
  SearchBar,
  Space,
  Swiper,
} from 'taro-fast-component';

import noCardImage from '../../../../assets/images/noCardImage.jpg';
import { pathCollection } from '../../../../customConfig';
import { BasePageWrapper } from '../../BasePageWrapper';
import { buildItem, classPrefix } from '../Assist/tools';

import './index.less';

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
  navigationStyle: 'custom',
  // backgroundColor: '#3778F4',
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

  buildHeadNavigation = () => {
    return (
      <HeadNavigation
        style={{
          overflow: 'hidden',
        }}
        backboardStyle={{
          width: '100%',
          height: '100%',
          backgroundImage: buildLinearGradient({
            direct: 45,
            list: ['#ff9700', '#ed1c24'],
          }),
        }}
        backboardChildren={
          <View>
            <ScaleBox aspectRatio={0.243} />
            {/* <ImageBox
              src={headerBackgroundImage}
              loadingEffect={false}
              lazyLoad
            /> */}
          </View>
        }
      >
        <FlexBox
          flexAuto="right"
          leftStyle={{
            paddingLeft: transformSize(20),
            paddingRight: transformSize(16),
          }}
          left={<ColorText color="#fff" fontSize={30} text="信息发布" />}
          right={
            <SearchBar
              style={{
                borderRadius: transformSize(100),
              }}
              circle
              mode="navigate"
              showSearch={false}
              searchStyle={{}}
            />
          }
        />
      </HeadNavigation>
    );
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
        {/* <View className={classNames(`${classPrefix}__searchBox`)}>
          <SearchBar
            style={{
              margin: `${transformSize(10)} ${transformSize(20)}`,
              borderRadius: transformSize(100),
            }}
            mode="navigate"
          />
        </View> */}

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
                  <ImageBox
                    src={image || noCardImage}
                    aspectRatio={0.371}
                    padding={10}
                  />
                );
              }}
            />

            <View className={classNames(`${classPrefix}__navContainor`)}>
              <View
                className={classNames(`${classPrefix}__navContainor__navBox`)}
              >
                <Grid
                  columns={5}
                  list={navList}
                  itemBuilder={({ item, index }) => {
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
                                <ImageBox src={image || noCardImage} />
                              </View>
                            </CenterBox>
                          }
                          bottom={<View style={nameStyle}>{value}</View>}
                        />
                      </Grid.Item>
                    );
                  }}
                />
              </View>
            </View>

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

        <FloatAction
          position="bottomLeft"
          theme="balanced"
          direction="vertical"
          buttons={[
            {
              label: '首页1',
              icon: '1',
              onClick: () => {
                redirectTo(pathCollection.news.home.path);
              },
            },
            {
              label: '首页2',
              icon: '2',
              onClick: () => {
                redirectTo(pathCollection.news.home2.path);
              },
            },
          ]}
        />
      </>
    );
  }
}
