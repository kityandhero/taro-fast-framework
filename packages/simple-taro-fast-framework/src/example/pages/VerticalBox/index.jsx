import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { VerticalBox, Space } from 'taro-fast-component/es/customComponents';
import { Selector } from 'taro-fast-component-extra/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const containorStyle = {
  border: `${transformSize(2)} solid #ccc`,
  height: transformSize(200),
};

const boxStyle = {
  width: transformSize(80),
  height: transformSize(80),
  backgroundColor: 'blue',
  margin: transformSize(20),
};

const alignList = [
  {
    label: 'top',
    value: 'top',
  },
  {
    label: 'center',
    value: 'center',
  },
  {
    label: 'bottom',
    value: 'bottom',
  },
];

const alignJustifyList = [
  {
    label: 'start',
    value: 'start',
  },
  {
    label: 'center',
    value: 'center',
  },
  {
    label: 'end',
    value: 'end',
  },
  {
    label: 'between',
    value: 'between',
  },
  {
    label: 'around',
    value: 'around',
  },
];

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '垂直容器',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'VerticalBox',
    name: '垂直容器',
    description: '垂直容器组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        align: ['top'],
        alignJustify: ['start'],
      },
    };
  }

  setAlignChecked = (value) => {
    this.setState({
      align: value,
    });
  };

  setAlignJustifyChecked = (value) => {
    this.setState({
      alignJustify: value,
    });
  };

  renderContent = () => {
    const { align, alignJustify } = this.state;

    const config = {
      align: align[0],
      alignJustify: alignJustify[0],
    };

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="单元素布局展示"
          config={config}
          componentName="VerticalBox"
          mockChildren
          useInnerBox={false}
        >
          <View style={containorStyle}>
            <VerticalBox {...config}>
              <View style={boxStyle}></View>
            </VerticalBox>
          </View>
        </SimpleBox>

        <SimpleBox
          header="多元素布局展示"
          config={config}
          componentName="VerticalBox"
          mockChildren
          useInnerBox={false}
        >
          <View style={containorStyle}>
            <VerticalBox {...config}>
              <View style={boxStyle}></View>
              <View style={boxStyle}></View>
              <View style={boxStyle}></View>
            </VerticalBox>
          </View>
        </SimpleBox>

        <SimpleBox header="变更align">
          <Selector
            columns={3}
            options={alignList}
            value={align}
            onChange={this.setAlignChecked}
          />
        </SimpleBox>

        <SimpleBox header="变更alignJustify">
          <Selector
            columns={3}
            options={alignJustifyList}
            value={alignJustify}
            onChange={this.setAlignJustifyChecked}
          />
        </SimpleBox>

        <PropertyBox config={VerticalBox.defaultProps} labelWidth={220} />
      </Space>
    );
  };
}
