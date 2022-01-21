import { View } from '@tarojs/components';

import {
  Card,
  VerticalBox,
  HelpBox,
} from 'taro-fast-component/es/customComponents';
import { Selector } from 'taro-fast-component-extra/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const style = {
  border: 'var(--tfc-px-2) solid #ccc',
  height: 'var(--tfc-px-200)',
};

const boxStyle = {
  width: 'var(--tfc-px-80)',
  height: 'var(--tfc-px-80)',
  backgroundColor: 'blue',
  margin: 'var(--tfc-px-20)',
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

export default class Index extends PageWrapper {
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

  renderFurther() {
    const { align, alignJustify } = this.state;

    return (
      <View className="index">
        <Card header="单元素布局展示" headerStyle={cardHeaderStyle}>
          <View style={style}>
            <VerticalBox align={align[0]} alignJustify={alignJustify[0]}>
              <View style={boxStyle}></View>
            </VerticalBox>
          </View>
        </Card>

        <Card header="多元素布局展示" headerStyle={cardHeaderStyle}>
          <View style={style}>
            <VerticalBox align={align[0]} alignJustify={alignJustify[0]}>
              <View style={boxStyle}></View>
              <View style={boxStyle}></View>
              <View style={boxStyle}></View>
            </VerticalBox>
          </View>
        </Card>

        <Card header="变更align" headerStyle={cardHeaderStyle}>
          <Selector
            options={alignList}
            value={align}
            onChange={this.setAlignChecked}
          />
        </Card>

        <Card header="变更alignJustify" headerStyle={cardHeaderStyle}>
          <Selector
            options={alignJustifyList}
            value={alignJustify}
            onChange={this.setAlignJustifyChecked}
          />
        </Card>

        <Card header="属性说明 :" headerStyle={cardHeaderStyle}>
          <HelpBox
            showTitle={false}
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
      </View>
    );
  }
}
