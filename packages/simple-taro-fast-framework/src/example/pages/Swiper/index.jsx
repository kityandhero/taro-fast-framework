import { View } from '@tarojs/components';

import { BlockArea, Ellipsis } from 'taro-fast-component/es/customComponents';
import { buildSwiper } from 'taro-fast-component/es/functionComponent';

import PageWrapper from '@/customComponents/PageWrapper';

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <BlockArea title="例子: 新闻标题上下滚动">
          {buildSwiper({
            style: { height: '40rpx' },
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
        </BlockArea>
      </View>
    );
  }
}
