import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  Radio,
  Icon,
  Button,
  Space,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import CodeBox from '../../../customComponents/CodeBox';

const { IconSketch, IconShoppingCart, IconCheckCircle } = Icon;

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const extraStyle = {
  padding: `0 ${transformSize(12)}`,
  fontSize: transformSize(24),
  color: '#aaa',
  backgroundColor: '#f5f7fa',
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '单选',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Radio',
    name: '单选',
    description: '单选组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        border: false,
        radioValue1: 'option1',
        radioValue2: 'option1',
        radioValue3: 'option2',
        radioOptions1: [
          {
            label: '单选项一',
            value: 'option1',
            extra: '扩展说明',
          },
          {
            label: '单选项二',
            value: 'option2',
            extra: '扩展说明',
          },
          {
            label: '单选项三',
            value: 'option3',
            extra: '扩展说明',
          },
        ],
        radioOptions2: [
          {
            label: '单选项一',
            value: 'option1',
            description: '单选项描述一',
            extra: '扩展说明',
          },
          {
            label: '单选项二',
            value: 'option2',
            description: '单选项描述二',
            extra: '扩展说明',
          },
          {
            label: '单选项三',
            value: 'option3',
            description: '单选项描述三',
            extra: '扩展说明',
          },
        ],
        radioOptions3: [
          {
            label: '单选项一',
            value: 'option1',
            title: '选项的标题',
            description: '单选项的简介描述',
            prefix: <IconShoppingCart size={34} />,
            extra: '扩展说明',
          },
          {
            label: '单选项二',
            value: 'option2',
            title: '选项的标题',
            description: '单选项的简介描述',
            prefix: <IconSketch size={34} />,
            extra: '扩展说明',
          },
          {
            label: '单选项三禁用',
            value: 'option3',
            title: '选项的标题',
            description: '单选项的简介描述',
            disabled: true,
            prefix: <IconSketch size={34} />,
            extra: '扩展说明',
          },
        ],
      },
    };
  }

  toggleBorder = () => {
    const { border } = this.state;

    this.setState({
      border: !border,
    });
  };

  renderContent = () => {
    const { border } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <Radio
          header="默认用法"
          style={style}
          border={border}
          options={this.state.radioOptions1}
          value={this.state.radioValue1}
          extra={
            <Button size="mini" fill="none" onClick={this.toggleBorder}>
              切换边框
            </Button>
          }
        />

        <Radio
          header="Header Strip"
          style={style}
          border={border}
          options={this.state.radioOptions1}
          value={this.state.radioValue1}
          strip
          stripLeft={2}
          stripWidth={6}
          stripColor="#3378f4"
          extra={
            <Button size="mini" fill="none" onClick={this.toggleBorder}>
              切换边框
            </Button>
          }
        />

        <Radio
          header="自定义选中图标"
          style={style}
          options={this.state.radioOptions1}
          value={this.state.radioValue1}
          iconCheck={<IconCheckCircle size={38} color="#1677ff" />}
          extra={<View style={extraStyle}>layout: list</View>}
        />

        <Radio
          header="含有单项描述"
          style={style}
          options={this.state.radioOptions2}
          value={this.state.radioValue2}
          extra={<View style={extraStyle}>layout: list</View>}
        />

        <Radio
          header="单项禁用"
          style={style}
          options={this.state.radioOptions3}
          value={this.state.radioValue3}
          extra={<View style={extraStyle}>layout: list</View>}
        />

        <Card
          header="column默认布局"
          headerStyle={cardHeaderStyle}
          style={style}
          extraStyle={{ backgroundColor: '#f5f7fa' }}
        >
          <Radio
            layout="column"
            style={style}
            border={border}
            options={this.state.radioOptions2}
            value={this.state.radioValue2}
            columnGap={12}
          />
        </Card>

        <Card
          header="column布局"
          headerStyle={cardHeaderStyle}
          style={style}
          extra={<View style={extraStyle}>column: 2</View>}
          extraStyle={{ backgroundColor: '#f5f7fa' }}
        >
          <Radio
            layout="column"
            style={style}
            border={border}
            options={this.state.radioOptions2}
            value={this.state.radioValue2}
            columns={2}
            columnGap={12}
          />
        </Card>

        <Card
          header="space布局"
          headerStyle={cardHeaderStyle}
          style={style}
          extra={<View style={extraStyle}>layout: space</View>}
          extraStyle={{ backgroundColor: '#f5f7fa' }}
        >
          <Radio
            layout="space"
            style={style}
            border={border}
            options={this.state.radioOptions2}
            value={this.state.radioValue2}
            spaceSize={24}
          />
        </Card>

        <Radio
          header="基础用法"
          layout="radio"
          style={style}
          border={border}
          options={this.state.radioOptions1}
          value={this.state.radioValue1}
          extra={<View style={extraStyle}>layout: radio</View>}
        />

        <Radio
          header="自定义选中图标"
          layout="radio"
          style={style}
          options={this.state.radioOptions1}
          value={this.state.radioValue1}
          iconCheck={<IconCheckCircle size={44} color="#1677ff" />}
          extra={<View style={extraStyle}>layout: radio</View>}
        />

        <Radio
          header="含有单项描述"
          layout="radio"
          style={style}
          options={this.state.radioOptions2}
          value={this.state.radioValue2}
          extra={<View style={extraStyle}>layout: radio</View>}
        />

        <Radio
          header="单项禁用"
          layout="radio"
          style={style}
          options={this.state.radioOptions3}
          value={this.state.radioValue3}
          extra={<View style={extraStyle}>layout: radio</View>}
        />

        <Radio
          header="更改回调"
          layout="radio"
          style={style}
          border={border}
          options={this.state.radioOptions1}
          value={this.state.radioValue1}
          extra={<View style={extraStyle}>layout: radio</View>}
          afterChange={(value) => {
            this.bannerNotify({
              message: `值已更改为:${value}`,
            });
          }}
        />

        <CodeBox
          config={{
            header: '更改回调',
            layout: 'radio',
            style,
            border,
            options: this.state.radioOptions1,
            value: this.state.radioValue1,
            extra: <View style={extraStyle}>layout: radio</View>,
          }}
          componentName="Collapse"
          mockChildren={false}
          useInnerBox={false}
          ignorePropertyList={['extra']}
        />

        <PropertyBox config={Radio.defaultProps} labelWidth={360} />
      </Space>
    );
  };
}
