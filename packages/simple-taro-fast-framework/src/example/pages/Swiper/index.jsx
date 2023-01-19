import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import { buildRandomHexColor } from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  CenterBox,
  Ellipsis,
  ImageBox,
  Space,
  Swiper,
  SwiperWrapper,
} from 'taro-fast-component/es/customComponents';
import { buildSwiper } from 'taro-fast-component/es/functionComponent';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import SimpleBox from '../../../customComponents/SimpleBox';

const imageUrl =
  'https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180';

const listText = [
  {
    text: '1',
    image: imageUrl,
  },
  {
    text: '2',
    image: imageUrl,
  },
  {
    text: '3',
    image: imageUrl,
  },
  {
    text: '4',
    image: imageUrl,
  },
  {
    text: '5',
    image: imageUrl,
  },
  {
    text: '6',
    image: imageUrl,
  },
];

const itemHorizontalStyle = {};

function buildHorizontalTextItem(o, i) {
  const { text } = o;

  return (
    <CenterBox
      style={{ backgroundColor: buildRandomHexColor({ seed: (i + 1) * 45 }) }}
    >
      {text}
    </CenterBox>
  );
}

function buildHorizontalImageItem(o, i) {
  const {
    //  text,
    image,
  } = o;

  return (
    <ImageBox
      src={image}
      aspectRatio={0.371}
      padding={10}
      imageBoxStyle={{
        margin: '0 var(--tfc-10)',
        backgroundColor: buildRandomHexColor({ seed: (i + 1) * 45 }),
      }}
    />
  );
}

const height = 260;

const configCore = {
  height,
  list: listText,
  itemStyle: itemHorizontalStyle,
};

const config1 = {
  ...{
    vertical: true,
    enableTouch: true,
    itemBuilder: buildHorizontalTextItem,
  },
  ...configCore,
};

const config2 = {
  ...{ enableTouch: true, itemBuilder: buildHorizontalTextItem },
  ...configCore,
};

const config3 = {
  ...{ enableTouch: true, itemBuilder: buildHorizontalImageItem },
  ...configCore,
};

const config4 = {
  ...{
    autoplay: true,
    enableTouch: true,
    itemBuilder: buildHorizontalTextItem,
  },
  ...configCore,
};

const config5 = {
  ...{
    autoplay: true,
    circular: true,
    enableTouch: true,
    itemBuilder: buildHorizontalTextItem,
  },
  ...configCore,
};

const config6 = {
  ...{
    autoplay: true,
    circular: true,
    enableTouch: true,
    indicator: true,
    itemBuilder: buildHorizontalTextItem,
  },
  ...configCore,
};

const config7 = {
  ...{
    autoplay: true,
    circular: true,
    enableTouch: false,
    indicator: true,
    itemBuilder: buildHorizontalTextItem,
  },
  ...configCore,
};

const config8 = {
  ...{
    autoplay: true,
    circular: true,
    enableTouch: false,
    indicator: true,
    direction: 'right',
    itemBuilder: buildHorizontalTextItem,
  },
  ...configCore,
};

const config9 = {
  ...{
    autoplay: true,
    circular: true,
    enableTouch: false,
    indicator: true,
    interval: 5000,
    itemBuilder: buildHorizontalTextItem,
  },
  ...configCore,
};

const config10 = {
  ...{
    autoplay: true,
    circular: true,
    enableTouch: false,
    indicator: true,
    controller: true,
    itemBuilder: buildHorizontalTextItem,
  },
  ...configCore,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '滑动视图',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Swiper',
    name: '滑动展示',
  };

  currentSequence = 0;

  minSequence = 0;

  maxSequence = 0;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '垂直往复滚动',
        currentConfig: config1,
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: '垂直往复滚动',
        config: config1,
      },
      {
        header: '水平往复滚动',
        config: config2,
      },
      {
        header: '图片水平往复滚动',
        config: config3,
      },
      {
        header: '自动往复滚动',
        config: config4,
      },
      {
        header: '自动循环滚动',
        config: config5,
      },
      {
        header: '显示指示器',
        config: config6,
      },
      {
        header: '关闭触摸变换',
        config: config7,
      },
      {
        header: '设置轮播方向',
        config: config8,
      },
      {
        header: '设置停顿时间',
        config: config9,
      },
      {
        header: '使用前后控制',
        config: config10,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <Swiper key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </Swiper>
    );
  };

  // eslint-disable-next-line no-unused-vars
  onChange = (current) => {
    // console.log({
    //   current: current,
    // });
  };

  changeToPrev = () => {
    this.currentSequence = this.currentSequence - 1;

    this.increaseCounter();
  };

  changeToNext = () => {
    this.currentSequence = this.currentSequence + 1;

    this.increaseCounter();
  };

  renderContent = () => {
    const { header, description, currentConfig, inner } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header={header}
          description={description}
          config={currentConfig}
          componentName="Swiper"
          mockChildren={!!inner}
          useInnerBox={false}
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['icon', 'itemBuilder']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <SimpleBox header="小程序Swiper上下滚动" useInnerBox={false}>
          {buildSwiper({
            style: { height: transformSize(40) },
            vertical: true,
            circular: true,
            autoplay: true,
            items: [
              {
                text: '这是一条标题很长很长很长很长很长很长很长很长很长很长的新闻1',
                image: '',
              },
              {
                text: 'text1',
                image: '',
              },
              {
                text: 'text1',
                image: '',
              },
            ],
            itemBuilder: (o) => {
              const { text } = o;

              return (
                <Ellipsis
                  line={1}
                  onClick={() => {
                    console.log(o);
                  }}
                >
                  新闻: {text || 'text'}
                </Ellipsis>
              );
            },
          })}
        </SimpleBox>

        <SimpleBox header="小程序Swiper左右滚动" useInnerBox={false}>
          {buildSwiper({
            style: { height: transformSize(300) },
            circular: true,
            indicatorDots: true,
            autoplay: true,
            items: [
              {
                text: '这是一条标题很长很长很长很长很长很长很长很长很长很长的新闻1',
                image: imageUrl,
              },
              {
                text: 'text1',
                image: imageUrl,
              },
              {
                text: 'text1',
                image: imageUrl,
              },
            ],
            itemBuilder: (o) => {
              const { image } = o;

              return (
                <View
                  style={{
                    height: '100%',
                    padding: `0 ${transformSize(20)}`,
                  }}
                >
                  <ImageBox src={image} />
                </View>
              );
            },
          })}
        </SimpleBox>

        <SimpleBox header="小程序Swiper左右滚动" useInnerBox={false}>
          {buildSwiper({
            style: { height: transformSize(260) },
            previousMargin: transformSize(80),
            nextMargin: transformSize(80),
            easingFunction: 'easeInOutCubic',
            indicatorColor: '#e21222',
            indicatorActiveColor: '#459429',
            circular: true,
            indicatorDots: true,
            autoplay: true,
            items: [
              {
                text: '这是一条标题很长很长很长很长很长很长很长很长很长很长的新闻1',
                image: imageUrl,
              },
              {
                text: 'text1',
                image: imageUrl,
              },
              {
                text: 'text1',
                image: imageUrl,
              },
            ],
            itemBuilder: (o) => {
              const { image } = o;

              return (
                <View
                  style={{
                    height: '100%',
                    padding: `0 ${transformSize(20)}`,
                  }}
                >
                  <ImageBox src={image} />
                </View>
              );
            },
          })}
        </SimpleBox>

        <SimpleBox header="小程序Swiper左右滚动" useInnerBox={false}>
          {buildSwiper({
            style: { height: transformSize(140) },
            previousMargin: transformSize(80),
            nextMargin: transformSize(80),
            easingFunction: 'easeInOutCubic',
            indicatorColor: '#e21222',
            indicatorActiveColor: '#459429',
            circular: true,
            indicatorDots: true,
            autoplay: true,
            items: [
              {
                image: imageUrl,
              },
              {
                image: imageUrl,
              },
              {
                image: imageUrl,
              },
              {
                image: imageUrl,
              },
              {
                image: imageUrl,
              },
              {
                image: imageUrl,
              },
            ],
            displayMultipleItems: 2,
            itemBuilder: (o) => {
              const { image } = o;

              return (
                <View
                  style={{
                    height: '100%',
                    padding: `0 ${transformSize(20)}`,
                  }}
                >
                  <ImageBox src={image} />
                </View>
              );
            },
          })}
        </SimpleBox>

        <SimpleBox header="小程序Swiper左右滚动" useInnerBox={false}>
          <SwiperWrapper
            height={320}
            scaleMode={false}
            style={{
              backgroundColor: '#000',
            }}
            swiperConfig={{
              previousMargin: transformSize(80),
              nextMargin: transformSize(80),
              easingFunction: 'easeInOutCubic',
              indicatorColor: '#e21222',
              indicatorActiveColor: '#459429',
              circular: true,
              indicatorDots: true,
              autoplay: true,
              displayMultipleItems: 1,
            }}
            list={[
              {
                image: imageUrl,
              },
              {
                image: imageUrl,
              },
              {
                image: imageUrl,
              },
              {
                image: imageUrl,
              },
              {
                image: imageUrl,
              },
              {
                image: imageUrl,
              },
            ]}
            itemBuilder={({
              height: h,
              scaleMode,
              aspectRatio,
              item,
              active,
              current,
              index,
              keyPrefix,
            }) => {
              console.log({
                height: h,
                scaleMode,
                aspectRatio,
                item,
                active,
                current,
                index,
                keyPrefix,
              });

              const { image } = item;

              return (
                <View
                  style={{
                    height: '100%',
                    padding: `0 ${transformSize(20)}`,
                  }}
                >
                  <ImageBox src={image} aspectRatio={0.5} />
                </View>
              );
            }}
            customIndicator
            indicatorBoxStyle={{
              bottom: transformSize(20),
            }}
            indicatorBuilder={({
              scaleMode,
              aspectRatio,
              item,
              active,
              current,
              index,
              keyPrefix,
            }) => {
              console.log({
                scaleMode,
                aspectRatio,
                item,
                active,
                current,
                index,
                keyPrefix,
              });

              return (
                <View
                  style={{
                    ...{
                      width: transformSize(24),
                      height: transformSize(24),
                      backgroundColor: '#fff',
                      borderRadius: '50%',
                      fontSize: transformSize(16),
                      textAlign: 'center',
                      lineHeight: transformSize(24),
                      marginLeft: transformSize(5),
                      marginRight: transformSize(5),
                    },
                    ...(active
                      ? {
                          backgroundColor: '#f5060e',
                          color: '#fff',
                        }
                      : {}),
                  }}
                >
                  {index + 1}
                </View>
              );
            }}
          />
        </SimpleBox>

        <SimpleBox header="小程序Swiper左右滚动" useInnerBox={false}>
          <SwiperWrapper
            scaleMode
            aspectRatio={0.6}
            style={{
              backgroundColor: '#000',
            }}
            swiperConfig={{
              previousMargin: transformSize(80),
              nextMargin: transformSize(80),
              easingFunction: 'easeInOutCubic',
              indicatorColor: '#e21222',
              indicatorActiveColor: '#459429',
              circular: true,
              indicatorDots: true,
              // autoplay: true,
              displayMultipleItems: 1,
            }}
            list={[
              {
                image: imageUrl,
              },
              {
                image: imageUrl,
              },
              {
                image: imageUrl,
              },
              {
                image: imageUrl,
              },
              {
                image: imageUrl,
              },
              {
                image: imageUrl,
              },
            ]}
            itemBuilder={({ item }) => {
              const { image } = item;

              console.log({ image });

              return (
                <View
                  style={{
                    height: '100%',
                    padding: `0 ${transformSize(20)}`,
                  }}
                >
                  <ImageBox src={image} aspectRatio={0.62} />
                </View>
              );
            }}
            customIndicator
            indicatorBuilder={({
              scaleMode,
              aspectRatio,
              item,
              active,
              current,
              index,
              keyPrefix,
            }) => {
              console.log({
                scaleMode,
                aspectRatio,
                item,
                active,
                current,
                index,
                keyPrefix,
              });

              return (
                <View
                  style={{
                    ...{
                      width: transformSize(24),
                      height: transformSize(24),
                      backgroundColor: '#fff',
                      borderRadius: '50%',
                      fontSize: transformSize(16),
                      textAlign: 'center',
                      lineHeight: transformSize(24),
                      marginLeft: transformSize(5),
                      marginRight: transformSize(5),
                    },
                    ...(active
                      ? {
                          backgroundColor: '#f5060e',
                          color: '#fff',
                        }
                      : {}),
                  }}
                >
                  {index + 1}
                </View>
              );
            }}
          />
        </SimpleBox>

        <PropertyBox config={Swiper.defaultProps} labelWidth={280} />
      </Space>
    );
  };
}
