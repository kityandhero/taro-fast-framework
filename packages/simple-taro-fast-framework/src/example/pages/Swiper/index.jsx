import { View } from '@tarojs/components';

import {
  Card,
  Ellipsis,
  ImageBox,
} from 'taro-fast-component/es/customComponents';
import { buildSwiper } from 'taro-fast-component/es/functionComponent';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Card header="例子: 新闻标题上下滚动" headerStyle={cardHeaderStyle}>
          {buildSwiper({
            style: { height: 'var(--tfc-40)' },
            // indicatorColor: '#999',
            // indicatorActiveColor: '#333',
            vertical: true,
            circular: true,
            // indicatorDots: true,
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

        <Card header="例子: 轮播图1" headerStyle={cardHeaderStyle}>
          {buildSwiper({
            style: { height: 'var(--tfc-300)' },
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

              return (
                <View style={{ height: '100%', padding: '0 var(--tfc-20)' }}>
                  <ImageBox src={image} />
                </View>
              );
            },
          })}
        </Card>

        <Card header="例子: 轮播图2" headerStyle={cardHeaderStyle}>
          {buildSwiper({
            style: { height: '2var(--tfc-60)' },
            previousMargin: 'var(--tfc-80)',
            nextMargin: 'var(--tfc-80)',
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
                <View style={{ height: '100%', padding: '0 var(--tfc-20)' }}>
                  <ImageBox src={image} />
                </View>
              );
            },
          })}
        </Card>

        <Card header="例子: 轮播图3" headerStyle={cardHeaderStyle}>
          {buildSwiper({
            style: { height: 'var(--tfc-140)' },
            previousMargin: 'var(--tfc-80)',
            nextMargin: 'var(--tfc-80)',
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
                <View style={{ height: '100%', padding: '0 var(--tfc-20)' }}>
                  <ImageBox src={image} />
                </View>
              );
            },
          })}
        </Card>
      </View>
    );
  }
}
