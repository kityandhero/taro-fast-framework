import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common';
import { ImageBox, Space, TextAreaItem } from 'taro-fast-component';

import {
  ContentPageBase,
  PropertyBox,
  SimpleBox,
} from '../../../customComponents';

function onChangeCore(v) {
  console.log(v);
}

const text =
  '这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长x的文字';

const config1 = {
  label: '内容',
  contentLine: 4,
  value: text,
  onChange: onChangeCore,
};

const config2 = {
  label: '内容',
  contentLine: 6,
  value: text,
  style: {
    backgroundColor: '#5668e3',
  },
  prefix: (
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
  ),
  title: '标题',
  description: '简介描述简介描述简介描述',
  emptyValue: '当前没有内容',
  emptyValueStyle: {
    color: '#4589e3',
  },
  position: 'center',
  header: '编辑商品详情',
  placeholder: '请输入内容',
  placeholderStyle: {
    color: '#4589e3',
  },
  contentMaxlength: 200,
  contentStyle: {
    color: '#783278',
  },
  editButtonStyle: {
    color: '#f1f1f1',
  },
  textareaStyle: {
    color: '#8923e1',
  },
  confirmStyle: {
    color: '#cc234c',
  },
  onChange: onChangeCore,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '文本域编辑',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'TextAreaItem',
    name: '文本域编辑',
    description: '文本域编辑组件',
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      header: '基础用法',
      currentConfig: config1,
    };
  }

  establishControlList = () => {
    return [
      {
        header: '基础用法',
        config: config1,
      },
      {
        header: '自定义',
        config: config2,
      },
    ];
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <TextAreaItem key={key} {...config}>
        {this.buildSimpleItemInner(inner)}
      </TextAreaItem>
    );
  };

  renderContent = () => {
    const { header, description, currentConfig, inner } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header={header}
          description={description}
          config={currentConfig}
          componentName="TextAreaItem"
          mockChildren={!!inner}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={TextAreaItem.defaultProps} labelWidth={240} />
      </Space>
    );
  };
}
