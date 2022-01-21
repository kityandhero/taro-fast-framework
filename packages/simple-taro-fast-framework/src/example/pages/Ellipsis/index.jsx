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
              width: '2var(--tfc-px-50)',
              fontSize: 'var(--tfc-px-28)',
              lineHeight: 'var(--tfc-px-44)',
              height: 'var(--tfc-px-44)',
            }}
            onClick={() => {
              console.log('ellipsis click');
            }}
          >
            这是一段宽度限制 2var(--tfc-px-50) 的文字，后面的内容会省略。
          </Ellipsis>
        </Card>

        <Card header="显示两行文字" headerStyle={cardHeaderStyle}>
          <Ellipsis
            line={2}
            style={{
              height: 'var(--tfc-px-88)',
              fontSize: 'var(--tfc-px-28)',
              lineHeight: 'var(--tfc-px-44)',
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
              height: '1var(--tfc-px-32)',
              fontSize: 'var(--tfc-px-28)',
              lineHeight: 'var(--tfc-px-44)',
            }}
            onClick={() => {
              console.log('ellipsis click');
            }}
          >
            这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长x的文字，后面的内容会省略。
          </Ellipsis>
        </Card>
      </View>
    );
  }
}
