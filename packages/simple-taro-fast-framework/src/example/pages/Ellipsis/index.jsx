import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { Card, Ellipsis, Space } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Space direction="vertical" fillWidth>
          <Card header="显示一行文字" headerStyle={cardHeaderStyle}>
            <Ellipsis
              line={1}
              style={{
                width: transformSize(250),
                fontSize: transformSize(28),
                lineHeight: transformSize(44),
                height: transformSize(44),
              }}
              onClick={() => {
                console.log('ellipsis click');
              }}
            >
              这是一段宽度限制长度的文字，后面的内容会省略。
            </Ellipsis>
          </Card>

          <Card header="显示两行文字" headerStyle={cardHeaderStyle}>
            <Ellipsis
              line={2}
              style={{
                height: transformSize(88),
                fontSize: transformSize(28),
                lineHeight: transformSize(44),
              }}
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
              style={{
                height: transformSize(132),
                fontSize: transformSize(28),
                lineHeight: transformSize(44),
              }}
              onClick={() => {
                console.log('ellipsis click');
              }}
            >
              这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长x的文字，后面的内容会省略。
            </Ellipsis>
          </Card>
        </Space>
      </View>
    );
  }
}
