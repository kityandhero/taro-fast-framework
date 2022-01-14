import { View } from '@tarojs/components';

import { BlockArea, Ellipsis } from 'taro-fast-component/es/customComponents';

import PageWrapper from '@/customComponents/PageWrapper';

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <BlockArea title="显示一行文字">
          <Ellipsis
            line={1}
            style={{
              width: '250rpx',
              fontSize: '28rpx',
              lineHeight: '44rpx',
              height: '44rpx',
            }}
            onClick={() => {
              console.log('ellipsis click');
            }}
          >
            这是一段宽度限制 250rpx 的文字，后面的内容会省略。
          </Ellipsis>
        </BlockArea>

        <BlockArea title="显示两行文字">
          <Ellipsis
            line={2}
            style={{ height: '88rpx', fontSize: '28rpx', lineHeight: '44rpx' }}
            onClick={() => {
              console.log('ellipsis click');
            }}
          >
            这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长x的文字，后面的内容会省略。
          </Ellipsis>
        </BlockArea>

        <BlockArea title="显示三行文字">
          <Ellipsis
            line={3}
            style={{ height: '132rpx', fontSize: '28rpx', lineHeight: '44rpx' }}
            onClick={() => {
              console.log('ellipsis click');
            }}
          >
            这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长x的文字，后面的内容会省略。
          </Ellipsis>
        </BlockArea>
      </View>
    );
  }
}
