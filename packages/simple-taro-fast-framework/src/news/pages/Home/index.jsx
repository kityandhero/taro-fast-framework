import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { isArray } from 'taro-fast-common/es/utils/typeCheck';
import {
  Space,
  ImageBox,
  Swiper,
} from 'taro-fast-component/es/customComponents';
import { buildSwiper } from 'taro-fast-component/es/functionComponent';

import PageWrapper from '../../../customComponents/PageWrapper';

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
    const { galleryList, sectionList } = metaData;

    this.setState({
      advertisingList: galleryList,
      sectionList: sectionList,
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
    return (
      <Space direction="vertical" fillWidth>
        <Swiper
          // autoplay
          // circular
          enableTouch
          list={this.buildSwiperListData()}
          aspectRatio={0.371}
          itemBuilder={(o) => {
            const { image } = o;

            return <ImageBox src={image} aspectRatio={0.371} padding={10} />;
          }}
        />

        {buildSwiper({
          style: {
            height: transformSize(300),
            padding: `${transformSize(20)} 0`,
          },
          // circular: true,
          indicatorDots: true,
          autoplay: true,
          items: this.buildSwiperListData(),
          itemBuilder: (o) => {
            const { image } = o;

            return (
              <View
                style={{
                  height: '100%',
                }}
              >
                <ImageBox
                  src={image}
                  imageBoxStyle={{
                    margin: `0 ${transformSize(20)}`,
                  }}
                />
              </View>
            );
          },
        })}
      </Space>
    );
  }
}
