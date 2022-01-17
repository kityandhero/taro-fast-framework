import { View } from '@tarojs/components';

import { Card, Ellipsis } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Card header="显示一行文字" headerStyle={cardHeaderStyle}>
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
        </Card>

        <Card header="显示两行文字" headerStyle={cardHeaderStyle}>
          <Ellipsis
            line={2}
            style={{ height: '88rpx', fontSize: '28rpx', lineHeight: '44rpx' }}
            onClick={() => {
              console.log('ellipsis click');
            }}
          >
            这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长x的文字，后面的内容会省略。
          </Ellipsis>
        </Card>

        <Card header="显示三行文字" headerStyle={cardHeaderStyle}>
          <Ellipsis
            line={3}
            style={{ height: '132rpx', fontSize: '28rpx', lineHeight: '44rpx' }}
            onClick={() => {
              console.log('ellipsis click');
            }}
          >
            这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长x的文字，后面的内容会省略。
          </Ellipsis>
        </Card>
      </View>
    );
  }
}
