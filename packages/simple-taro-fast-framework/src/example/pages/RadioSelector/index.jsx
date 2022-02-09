import {
  Card,
  Icon,
  RadioSelector,
  Tag,
  Space,
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

export default class Index extends ContentPageBase {
  headerData = {
    id: 'RadioSelector',
    name: '弹出式单选',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        border: false,
        radioValue1: 'option1',
        radioValue2: 'option1',
        radioValue3: '',
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

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card
          header="下侧面板视图"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <RadioSelector
            placeholder="请选择类别"
            value={this.state.radioValue1}
            options={this.state.radioOptions1}
          >
            类别
          </RadioSelector>

          <RadioSelector
            placeholder="请选择类别"
            value={this.state.radioValue1}
            valueFormat={(v) => {
              return <Tag color="default">{v}</Tag>;
            }}
            options={this.state.radioOptions1}
          >
            类别 [格式化值]
          </RadioSelector>

          <RadioSelector
            placeholder="请选择目标"
            value={this.state.radioValue2}
            arc
            options={this.state.radioOptions2}
          >
            目标
          </RadioSelector>

          <RadioSelector
            placeholder="请选择产地"
            showClose={false}
            border={false}
            value={this.state.radioValue3}
            options={this.state.radioOptions3}
          >
            产地
          </RadioSelector>
        </Card>

        <Card
          header="弹出面板视图"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <RadioSelector
            placeholder="请选择类别"
            position="center"
            value={this.state.radioValue1}
            options={this.state.radioOptions1}
          >
            类别
          </RadioSelector>

          <RadioSelector
            placeholder="请选择目标"
            position="center"
            value={this.state.radioValue2}
            arc
            options={this.state.radioOptions2}
          >
            目标
          </RadioSelector>

          <RadioSelector
            placeholder="请选择产地"
            position="center"
            showClose={false}
            border={false}
            value={this.state.radioValue3}
            options={this.state.radioOptions3}
          >
            产地
          </RadioSelector>
        </Card>

        <Card
          header="更改回调"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <RadioSelector
            placeholder="请选择类别"
            border={false}
            value={this.state.radioValue1}
            options={this.state.radioOptions1}
            afterChange={(value) => {
              this.bannerNotify({
                message: `值已更改为:${value}`,
              });
            }}
          >
            类别
          </RadioSelector>
        </Card>
      </Space>
    );
  };
}
