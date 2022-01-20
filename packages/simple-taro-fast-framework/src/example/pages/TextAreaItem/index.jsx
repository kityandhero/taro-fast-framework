import { View } from '@tarojs/components';

import {
  Card,
  TextAreaItem,
  HelpBox,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const style = { backgroundColor: '#f5f7fa' };

export default class Index extends PageWrapper {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        border: false,
        value:
          '这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长x的文字',
      },
    };
  }

  triggerChange = (v) => {
    this.setState({
      value: v,
    });
  };

  renderFurther() {
    const { value } = this.state;

    return (
      <View className="index" style={{ backgroundColor: '#453e21' }}>
        <Card
          header="基础用法"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <TextAreaItem
            contentLine={4}
            value={value}
            onChange={this.triggerChange}
          >
            内容
          </TextAreaItem>
        </Card>

        <Card
          header="自定义"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <TextAreaItem
            style={{ backgroundColor: '#5668e3' }}
            contentLine={6}
            value={value}
            title="标题"
            description="简介描述简介描述简介描述"
            emptyValue="当前没有内容"
            emptyValueStyle={{ color: '#4589e3' }}
            onChange={this.triggerChange}
          >
            商品详情
          </TextAreaItem>
        </Card>
      </View>
    );
  }
}
