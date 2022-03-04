import { View } from '@tarojs/components';

import { getRandomColor, transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  CenterBox,
  Ellipsis,
  ImageBox,
  Space,
  Swiper,
} from 'taro-fast-component/es/customComponents';
import { buildSwiper } from 'taro-fast-component/es/functionComponent';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const listText = [
  {
    text: '1',
    image:
      'https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180',
  },
  {
    text: '2',
    image:
      'https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180',
  },
  {
    text: '3',
    image:
      'https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180',
  },
  {
    text: '4',
    image:
      'https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180',
  },
  {
    text: '5',
    image:
      'https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180',
  },
  {
    text: '6',
    image:
      'https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180',
  },
];

const itemStyle = {
  height: 'var(--tfc-280)',
};

function buildTextItem(o, i) {
  const { text } = o;

  return (
    <View
      style={{
        height: '100%',
        padding: `0 ${transformSize(20)}`,
        backgroundColor: getRandomColor({ seed: (i + 1) * 45 }),
      }}
    >
      <CenterBox>{text}</CenterBox>
    </View>
  );
}

function buildImageItem(o, i) {
  const {
    //  text,
    image,
  } = o;

  return (
    <View
      style={{
        height: '100%',
        padding: `0 ${transformSize(20)}`,
        backgroundColor: getRandomColor({ seed: (i + 1) * 45 }),
      }}
    >
      {/* <CenterBox>{text}</CenterBox> */}
      <ImageBox src={image} />
    </View>
  );
}

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
        <Card
          header="例子: 往复滚动"
          style={style}
          headerStyle={cardHeaderStyle}
        >
          <Swiper
            list={listText}
            itemStyle={itemStyle}
            itemBuilder={buildTextItem}
          />
        </Card>

        <Card
          header="例子: 自动往复滚动"
          style={style}
          headerStyle={cardHeaderStyle}
        >
          <Swiper
            autoplay
            list={listText}
            itemStyle={itemStyle}
            itemBuilder={buildTextItem}
          />
        </Card>

        <Card
          header="例子: 自动循环滚动"
          style={style}
          headerStyle={cardHeaderStyle}
        >
          <Swiper
            autoplay
            circular
            list={listText}
            itemStyle={itemStyle}
            itemBuilder={buildImageItem}
            onChange={this.onChange}
          />
        </Card>

        <Card
          header="例子: 禁止触摸变换"
          style={style}
          headerStyle={cardHeaderStyle}
        >
          <Swiper
            autoplay
            circular
            enableTouch={false}
            list={listText}
            itemStyle={itemStyle}
            itemBuilder={buildImageItem}
          />
        </Card>

        <Card
          header="例子: 设置变换方向"
          style={style}
          headerStyle={cardHeaderStyle}
        >
          <Swiper
            autoplay
            circular
            direction="right"
            list={listText}
            itemStyle={itemStyle}
            itemBuilder={buildImageItem}
          />
        </Card>

        <Card
          header="例子: 设置停顿时间"
          style={style}
          headerStyle={cardHeaderStyle}
        >
          <Swiper
            autoplay
            circular
            pauseTime={5000}
            list={listText}
            itemStyle={itemStyle}
            itemBuilder={buildImageItem}
            onChange={this.onChange}
          />
        </Card>

        <Card
          header="例子: 使用前后控制"
          style={style}
          headerStyle={cardHeaderStyle}
        >
          <Swiper
            circular
            showController
            pauseTime={3000}
            list={listText}
            itemStyle={itemStyle}
            itemBuilder={buildImageItem}
            onChange={this.onChange}
          />
        </Card>

        <Card
          header="例子: 新闻标题上下滚动"
          style={style}
          headerStyle={cardHeaderStyle}
        >
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
        </Card>

        <Card
          header="例子: 轮播图1"
          style={style}
          headerStyle={cardHeaderStyle}
        >
          {buildSwiper({
            style: { height: transformSize(300) },
            // indicatorColor: '#999',
            // indicatorActiveColor: '#333',
            circular: true,
            indicatorDots: true,
            autoplay: true,
            items: [
              {
                text: '这是一条标题很长很长很长很长很长很长很长很长很长很长的新闻1',
                image:
                  'https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180',
              },
              {
                text: 'text1',
                image:
                  'https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180',
              },
              {
                text: 'text1',
                image:
                  'https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180',
              },
            ],
            itemBuilder: (o) => {
              const { image } = o;
              console.log(o);
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
        </Card>

        <Card
          header="例子: 轮播图2"
          style={style}
          headerStyle={cardHeaderStyle}
        >
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
                image:
                  'https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180',
              },
              {
                text: 'text1',
                image:
                  'https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180',
              },
              {
                text: 'text1',
                image:
                  'https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180',
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
        </Card>

        <Card
          header="例子: 轮播图3"
          style={style}
          headerStyle={cardHeaderStyle}
        >
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
                image:
                  'https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180',
              },
              {
                image:
                  'https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180',
              },
              {
                image:
                  'https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180',
              },
              {
                image:
                  'https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180',
              },
              {
                image:
                  'https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180',
              },
              {
                image:
                  'https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180',
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
        </Card>
      </Space>
    );
  };
}
