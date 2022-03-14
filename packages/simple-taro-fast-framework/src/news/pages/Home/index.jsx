import classNames from 'classnames';
import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { isArray } from 'taro-fast-common/es/utils/typeCheck';
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

import PageWrapper from '../../../customComponents/PageWrapper';

import { classPrefix, buildItem } from './tools';

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
  navigationBarTitleText: '新闻应用',
  backgroundColor: '#3778F4',
});

@connect(({ news, global }) => ({
  news,
  global,
}))
export default class Index extends PageWrapper {
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
    const {
      news: { data },
    } = props;

    return data;
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

              return (
                <View
                  key={`section_${index}`}
                  className={classNames(`${classPrefix}__sectionContainor`)}
                >
                  <Card
                    strip
                    stripColor="#3378f4"
                    header={name}
                    border={false}
                    bodyBorder={false}
                    space={false}
                    style={{
                      backgroundColor: '#f3f9ff',
                    }}
                    bodyStyle={{
                      backgroundColor: '#f3f9ff',
                    }}
                    extra={<More />}
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

            {/* {sectionList.length > 0
          ? sectionList.map((item, index) =>
              item.config ? (
                item.config.renderMode == 2 ? (
                  <View key={`sectionList_${index}`} className="announcement">
                    <CommoditySaleBox
                      data={item}
                      showDetail={(o) => {
                        this.goToNews(o);
                      }}
                    />
                    {item.articles.length > 0
                      ? item.articles.map((conItem, conIndex) => (
                          <View
                            key={`content_${conIndex}`}
                            className="content"
                            onClick={() => {
                              this.goToNewsDetail(conItem);
                            }}
                          >
                            <View className="conBlock at-row ">
                              <View className="at-col at-col-3">
                                <View className="conLeft">
                                  <View>
                                    <View className="dateTop">
                                      {formatDatetime(
                                        toDatetime(conItem.createTime),
                                        'yyyy-MM',
                                      )}
                                    </View>
                                    <View className="dateBot">
                                      {formatDatetime(
                                        toDatetime(conItem.createTime),
                                        'dd',
                                      )}
                                    </View>
                                  </View>
                                </View>
                              </View>
                              <View className="conRight at-col at-col-9">
                                <View className="conRight">
                                  <View className="titleTop">
                                    {conItem.title}
                                  </View>
                                  <View className="titleBot">
                                    {conItem.description}
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                        ))
                      : ''}
                  </View>
                ) : item.config.renderMode == 3 ? (
                  <View key={`sectionList_${index}`} className="announcement">
                    <CommoditySaleBox
                      data={item}
                      showDetail={(o) => {
                        this.goToNews(o);
                      }}
                    />
                    {item.articles.length > 0
                      ? item.articles.map((meetingItem, meetingIndex) => (
                          <View
                            key={`meetingContent_${meetingIndex}`}
                            className="meetingContent"
                            onClick={() => {
                              this.goToNewsDetail(meetingItem);
                            }}
                          >
                            <View className="conBlock at-row ">
                              <View className="at-col at-col-5">
                                <View className="conLeft">
                                  <Image
                                    src={meetingItem.image || defaultImg}
                                  />
                                </View>
                              </View>
                              <View className="at-col at-col-7">
                                <View className="conRight">
                                  <View className="titleTop">
                                    {meetingItem.title}
                                  </View>
                                  <View className="titleBot">
                                    {meetingItem.description}
                                  </View>
                                  <View className="at-row at-row__align--center">
                                    <View className="at-col at-col-1 at-col--auto salePrice">
                                      <View className="salePriceIcon">
                                        <Image src="http://file.panduolakeji.com/103087903.png" />
                                      </View>
                                    </View>
                                    <View className="at-col at-col-1 at-col--auto marketPrice">
                                      {formatDatetime(
                                        toDatetime(meetingItem.createTime),
                                        'yyyy-MM-dd',
                                      )}
                                    </View>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                        ))
                      : ''}
                  </View>
                ) : item.config.renderMode == 4 ? (
                  <View key={`sectionList_${index}`} className="announcement">
                    <CommoditySaleBox
                      data={item}
                      showDetail={(o) => {
                        this.goToNews(o);
                      }}
                    />
                    {item.articles.length > 0 ? (
                      <View className="exhibitionContent">
                        <View className="conBlock at-row newFrame">
                          {item.articles.map(
                            (exhibitionItem, exhibitionIndex) => (
                              <View
                                className="at-col at-col-1 at-col--auto"
                                key={`exhibitionItem${exhibitionIndex}`}
                                onClick={() => {
                                  this.goToNewsDetail(exhibitionItem);
                                }}
                              >
                                <View className="exhibition">
                                  <Image
                                    src={exhibitionItem.image || defaultImg}
                                  />
                                  <View className="shadowTest">
                                    {exhibitionItem.title}
                                  </View>
                                </View>
                              </View>
                            ),
                          )}
                        </View>
                      </View>
                    ) : (
                      ''
                    )}
                  </View>
                ) : item.config.renderMode == 5 ? (
                  <View key={`sectionList_${index}`} className="announcement">
                    <CommoditySaleBox
                      data={item}
                      showDetail={(o) => {
                        this.goToNews(o);
                      }}
                    />
                    {item.articles.length > 0
                      ? item.articles.map((videoItem, videoIndex) =>
                          videoIndex == 0 ? (
                            <View key={`video_${videoIndex}`}>
                              <Video
                                className="video"
                                poster={videoItem.rectangleImage}
                                src={videoItem.video}
                                controls
                                showFullscreenBtn
                                autoplay={false}
                                initialTime="0"
                                id="video"
                                loop={false}
                                muted={false}
                                custom-cache="true"
                              />
                              <View
                                className="videoDesc"
                                onClick={() => {
                                  this.goToNewsDetail(videoItem);
                                }}
                              >
                                {videoItem.description}
                              </View>
                            </View>
                          ) : (
                            ''
                          ),
                        )
                      : ''}
                  </View>
                ) : item.config.renderMode == 1 ? (
                  <View key={`sectionList_${index}`} className="announcement">
                    <CommoditySaleBox
                      data={item}
                      showDetail={(o) => {
                        this.goToNews(o);
                      }}
                    />
                    {item.articles.length > 0
                      ? item.articles.map((generalItem, generalIndex) => (
                          <View
                            key={`general_${generalIndex}`}
                            className="general"
                          >
                            <View className="generalTitle">
                              {generalItem.title}
                            </View>
                            <View className="generalImg">
                              <Image src={generalItem.image || defaultImg} />
                            </View>
                          </View>
                        ))
                      : ''}
                  </View>
                ) : (
                  ''
                )
              ) : (
                ''
              ),
            )
          : ''} */}
          </Space>
        </View>
      </>
    );
  }
}
