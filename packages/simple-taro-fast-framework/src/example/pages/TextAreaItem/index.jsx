import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  TextAreaItem,
  ImageBox,
  HelpBox,
  Space,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

export default class Index extends ContentPageBase {
  headerData = {
    id: 'TextAreaItem',
    name: '文本域编辑',
  };

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

  renderContent = () => {
    const { value } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <Card
          header="基础用法"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <TextAreaItem
            label="内容"
            contentLine={4}
            value={value}
            onChange={this.triggerChange}
          />
        </Card>

        <Card
          header="自定义"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <TextAreaItem
            style={{ backgroundColor: '#5668e3' }}
            prefix={
              <View
                style={{
                  borderRadius: 20,
                  width: transformSize(80),
                  height: transformSize(80),
                }}
              >
                <ImageBox
                  src="https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                  fit="cover"
                />
              </View>
            }
            label="商品详情"
            contentLine={6}
            value={value}
            title="标题"
            description="简介描述简介描述简介描述"
            emptyValue="当前没有内容"
            emptyValueStyle={{ color: '#4589e3' }}
            position="center"
            header="编辑商品详情"
            placeholder="请输入内容"
            placeholderStyle={{ color: '#4589e3' }}
            contentMaxlength={200}
            contentStyle={{ color: '#783278' }}
            editButtonStyle={{ color: '#f1f1f1' }}
            textareaStyle={{ color: '#8923e1' }}
            confirmStyle={{ color: '#cc234c' }}
            onChange={this.triggerChange}
          />
        </Card>

        <Card header="属性说明 :" headerStyle={cardHeaderStyle}>
          <HelpBox
            showTitle={false}
            showNumber={false}
            list={[
              {
                text: '可配置值请参考 源代码以及样例.',
              },
            ]}
          />
        </Card>
      </Space>
    );
  };
}
