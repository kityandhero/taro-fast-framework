import {
  Card,
  Icon,
  CheckBoxSelector,
  Space,
  Tag,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

const { IconSketch, IconShoppingCart } = Icon;

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '弹出式复选',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'CheckBox',
    name: '弹出式复选',
    description: '弹出式复选组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        border: false,
        checkBoxValue1: ['option1'],
        checkBoxValue2: ['option1'],
        checkBoxValue3: [],
        checkBoxOptions1: [
          {
            label: '复选项一',
            value: 'option1',
            extra: '扩展说明',
          },
          {
            label: '复选项二',
            value: 'option2',
            extra: '扩展说明',
          },
          {
            label: '复选项三',
            value: 'option3',
            extra: '扩展说明',
          },
        ],
        checkBoxOptions2: [
          {
            label: '复选项一',
            value: 'option1',
            description: '复选项描述一',
            extra: '扩展说明',
          },
          {
            label: '复选项二',
            value: 'option2',
            description: '复选项描述二',
            extra: '扩展说明',
          },
          {
            label: '复选项三',
            value: 'option3',
            description: '复选项描述三',
            extra: '扩展说明',
          },
        ],
        checkBoxOptions3: [
          {
            label: '复选项一',
            value: 'option1',
            title: '选项的标题',
            description: '复选项的简介描述',
            prefix: <IconShoppingCart size={34} />,
            extra: '扩展说明',
          },
          {
            label: '复选项二',
            value: 'option2',
            title: '选项的标题',
            description: '复选项的简介描述',
            prefix: <IconSketch size={34} />,
            extra: '扩展说明',
          },
          {
            label: '复选项三禁用',
            value: 'option3',
            title: '选项的标题',
            description: '复选项的简介描述',
            disabled: true,
            prefix: <IconSketch size={34} />,
            extra: '扩展说明',
          },
        ],
      },
    };
  }

  handleCheckBoxChange = (value) => {
    this.setState({
      checkBoxValue1: value,
    });
  };

  handleCheckBoxChangeSecond = (value) => {
    this.setState({
      checkBoxValue2: value,
    });
  };

  handleCheckBoxChangeThird = (value) => {
    this.setState({
      checkBoxValue3: value,
    });
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card
          header="下侧面板视图"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <CheckBoxSelector
            placeholder="请选择类别"
            value={this.state.checkBoxValue1}
            options={this.state.checkBoxOptions1}
          >
            类别
          </CheckBoxSelector>

          <CheckBoxSelector
            placeholder="请选择类别"
            value={this.state.checkBoxValue1}
            valueFormat={(v) => {
              return (
                <Space>
                  {v.map((o, i) => {
                    return (
                      <Tag key={`list_${i}`} color="success">
                        {o}
                      </Tag>
                    );
                  })}
                </Space>
              );
            }}
            options={this.state.checkBoxOptions1}
          >
            类别 [格式化值]
          </CheckBoxSelector>

          <CheckBoxSelector
            placeholder="请选择目标"
            value={this.state.checkBoxValue2}
            arc
            options={this.state.checkBoxOptions2}
            onChange={this.handleCheckBoxChangeSecond}
          >
            目标
          </CheckBoxSelector>

          <CheckBoxSelector
            placeholder="请选择产地"
            showClose={false}
            border={false}
            value={this.state.checkBoxValue3}
            options={this.state.checkBoxOptions3}
            onChange={this.handleCheckBoxChangeThird}
          >
            产地
          </CheckBoxSelector>
        </Card>

        <Card
          header="弹出面板视图"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <CheckBoxSelector
            placeholder="请选择类别"
            position="center"
            value={this.state.checkBoxValue1}
            options={this.state.checkBoxOptions1}
          >
            类别
          </CheckBoxSelector>

          <CheckBoxSelector
            placeholder="请选择目标"
            position="center"
            value={this.state.checkBoxValue2}
            arc
            options={this.state.checkBoxOptions2}
            onChange={this.handleCheckBoxChangeSecond}
          >
            目标
          </CheckBoxSelector>

          <CheckBoxSelector
            placeholder="请选择产地"
            position="center"
            showClose={false}
            border={false}
            value={this.state.checkBoxValue3}
            options={this.state.checkBoxOptions3}
            onChange={this.handleCheckBoxChangeThird}
          >
            产地
          </CheckBoxSelector>
        </Card>

        <Card
          header="更改回调"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <CheckBoxSelector
            placeholder="请选择类别"
            position="center"
            border={false}
            value={this.state.checkBoxValue1}
            options={this.state.checkBoxOptions1}
            afterChange={(value) => {
              this.bannerNotify({
                message: `值已更改为:${value}`,
              });
            }}
          >
            类别
          </CheckBoxSelector>
        </Card>
      </Space>
    );
  };
}
