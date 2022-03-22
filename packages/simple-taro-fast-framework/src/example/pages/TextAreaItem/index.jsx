import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  TextAreaItem,
  ImageBox,
  Space,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

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

export default class Index extends ContentPageBase {
  headerData = {
    id: 'TextAreaItem',
    name: '文本域编辑',
    description: '文本域编辑组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        border: false,
        value: '',
      },
    };
  }

  triggerChange = (v) => {
    this.setState({
      value: v,
    });
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="基础用法"
          config={config1}
          space={false}
          componentName="TextAreaItem"
          mockChildren={false}
          useInnerBox={false}
          ignorePropertyList={['prefix']}
        >
          <TextAreaItem {...config1} />
        </SimpleBox>

        <SimpleBox
          header="自定义"
          config={config2}
          space={false}
          componentName="TextAreaItem"
          mockChildren={false}
          useInnerBox={false}
        >
          <TextAreaItem {...config2} />
        </SimpleBox>

        <PropertyBox config={TextAreaItem.defaultProps} labelWidth={240} />
      </Space>
    );
  };
}
