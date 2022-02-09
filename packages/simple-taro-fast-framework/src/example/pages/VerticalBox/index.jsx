import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  VerticalBox,
  HelpBox,
  Space,
} from 'taro-fast-component/es/customComponents';
import { Selector } from 'taro-fast-component-extra/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

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

export default class Index extends ContentPageBase {
  headerData = {
    id: 'VerticalBox',
    name: '垂直居中',
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

    return (
      <View className="index">
        <Space direction="vertical" fillWidth>
          <Card
            header="单元素布局展示"
            style={style}
            headerStyle={cardHeaderStyle}
          >
            <View style={containorStyle}>
              <VerticalBox align={align[0]} alignJustify={alignJustify[0]}>
                <View style={boxStyle}></View>
              </VerticalBox>
            </View>
          </Card>

          <Card
            header="多元素布局展示"
            style={style}
            headerStyle={cardHeaderStyle}
          >
            <View style={containorStyle}>
              <VerticalBox align={align[0]} alignJustify={alignJustify[0]}>
                <View style={boxStyle}></View>
                <View style={boxStyle}></View>
                <View style={boxStyle}></View>
              </VerticalBox>
            </View>
          </Card>

          <Card header="变更align" style={style} headerStyle={cardHeaderStyle}>
            <Selector
              options={alignList}
              value={align}
              onChange={this.setAlignChecked}
            />
          </Card>

          <Card
            header="变更alignJustify"
            style={style}
            headerStyle={cardHeaderStyle}
          >
            <Selector
              options={alignJustifyList}
              value={alignJustify}
              onChange={this.setAlignJustifyChecked}
            />
          </Card>

          <Card header="属性说明 :" style={style} headerStyle={cardHeaderStyle}>
            <HelpBox
              showTitle={false}
              showNumber={false}
              list={[
                {
                  text: 'style: 默认值为 null.',
                },
                {
                  text: 'align: 默认值为 center.',
                },
                {
                  text: 'alignJustify: 默认值为 start.',
                },
                {
                  text: 'onClick: 默认值为 null.',
                },
              ]}
            />
          </Card>
        </Space>
      </View>
    );
  };
}
