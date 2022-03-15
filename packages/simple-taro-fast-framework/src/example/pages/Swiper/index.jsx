import { View } from '@tarojs/components';

import { getRandomColor, transformSize } from 'taro-fast-common/es/utils/tools';
import {
  CenterBox,
  Ellipsis,
  ImageBox,
  Space,
  Swiper,
} from 'taro-fast-component/es/customComponents';
import { buildSwiper } from 'taro-fast-component/es/functionComponent';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

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
      style={{ backgroundColor: getRandomColor({ seed: (i + 1) * 45 }) }}
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
        backgroundColor: getRandomColor({ seed: (i + 1) * 45 }),
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

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Swiper',
    name: '滑动展示',
  };

  currentSequence = 0;

  minSequence = 0;

  maxSequence = 0;

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
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox header="垂直往复滚动" config={config1}>
          <Swiper {...config1} />
        </SimpleBox>

        <SimpleBox header="水平往复滚动" config={config2}>
          <Swiper {...config2} />
        </SimpleBox>

        <SimpleBox header="图片水平往复滚动" config={config3}>
          <Swiper {...config3} />
        </SimpleBox>

        <SimpleBox header="自动往复滚动" config={config4}>
          <Swiper {...config4} />
        </SimpleBox>

        <SimpleBox header="自动循环滚动" config={config5}>
          <Swiper {...config5} />
        </SimpleBox>

        <SimpleBox header="显示指示器" config={config6}>
          <Swiper {...config6} />
        </SimpleBox>

        <SimpleBox header="关闭触摸变换" config={config7}>
          <Swiper {...config7} />
        </SimpleBox>

        <SimpleBox header="设置轮播方向" config={config8}>
          <Swiper {...config8} />
        </SimpleBox>

        <SimpleBox header="设置停顿时间" config={config9}>
          <Swiper {...config9} />
        </SimpleBox>

        <SimpleBox header="使用前后控制" config={config10}>
          <Swiper {...config10} />
        </SimpleBox>

        <SimpleBox header="小程序Swiper上下滚动">
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

        <SimpleBox header="小程序Swiper左右滚动">
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

        <SimpleBox header="小程序Swiper左右滚动">
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

        <SimpleBox header="小程序Swiper左右滚动">
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

        <PropertyBox config={Swiper.defaultProps} labelWidth={170} />
      </Space>
    );
  };
}
