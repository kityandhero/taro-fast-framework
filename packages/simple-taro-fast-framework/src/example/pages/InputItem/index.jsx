import {
  InputItem,
  Card,
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
    id: 'InputItem',
    name: '输入项',
  };

  renderContent = () => {
    const { value } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <Card
          header="基础"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <InputItem value={value} border={false} />
        </Card>

        <Card
          header="Label"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <InputItem value={value} label="用户名" />
          <InputItem value={value} label="密码" />
          <InputItem value={value} label="手机号" border={false} />
        </Card>

        <Card
          header="Required"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <InputItem value={value} label="用户名" required border={false} />
        </Card>

        <Card
          header="labelStyle"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <InputItem
            label="用户名"
            value={value}
            labelStyle={{ color: 'red' }}
            border={false}
          />
        </Card>

        <Card
          header="Align Right"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <InputItem
            label="用户名"
            value={value}
            align="right"
            border={false}
          />
        </Card>

        <Card
          header="Clearable"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <InputItem value={value} label="用户名" clearable border={false} />
        </Card>

        <Card
          header="Hidden"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <InputItem value={value} label="用户名" hidden border={false} />
        </Card>

        <Card
          header="Extra"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <InputItem
            label="用户名"
            value={value}
            extra="扩展部分"
            border={false}
          />
        </Card>

        <Card
          header="Password"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <InputItem value={value} password label="密码" border={false} />
        </Card>

        <Card
          header="placeholder"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <InputItem
            label="用户名"
            value={value}
            placeholder="请输入用户名"
            border={false}
          />
        </Card>

        <Card
          header="placeholderStyle"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <InputItem
            placeholder="请输入用户名"
            value={value}
            placeholderStyle={{ color: '#45e325' }}
            label="用户名"
            border={false}
          />
        </Card>

        <Card
          header="disabled"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <InputItem
            label="用户名"
            value={value}
            placeholder="请输入用户名"
            disabled
            border={false}
          />
        </Card>

        <Card
          header="maxlength"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <InputItem
            label="用户名"
            value={value}
            maxlength={5}
            border={false}
          />
        </Card>

        <Card
          header="confirmType"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <InputItem
            label="用户名"
            value={value}
            confirmType="go"
            border={false}
          />
        </Card>

        <Card
          header="afterChange"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <InputItem
            label="用户名"
            value={value}
            afterChange={(v) => {
              this.bannerNotify({
                message: `值已更改为:${v}`,
              });
            }}
            border={false}
          />
        </Card>

        <Card
          header="onFocus"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <InputItem
            label="用户名"
            value={value}
            onFocus={(e) => {
              console.log(e);
            }}
            border={false}
          />
        </Card>

        <Card
          header="onBlur"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <InputItem
            label="用户名"
            value={value}
            onBlur={(e) => {
              console.log(e);
            }}
            border={false}
          />
        </Card>

        <Card
          header="onConfirm"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <InputItem
            label="用户名"
            value={value}
            onConfirm={(e) => {
              console.log(e);
            }}
            border={false}
          />
        </Card>

        <Card
          header="onKeyboardHeightChange"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <InputItem
            label="用户名"
            value={value}
            onKeyboardHeightChange={(e) => {
              console.log(e);
            }}
            border={false}
          />
        </Card>
      </Space>
    );
  };
}
