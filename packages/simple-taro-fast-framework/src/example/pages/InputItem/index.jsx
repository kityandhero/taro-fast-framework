import { View } from '@tarojs/components';

import {
  InputItem,
  Card,
  Space,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
  renderFurther() {
    const { value } = this.state;

    return (
      <View className="index" style={cardStyle} headerStyle={cardHeaderStyle}>
        <Space direction="vertical" fillWidth>
          <Card
            header="基础"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
            space={false}
          >
            <InputItem value={value} />
          </Card>

          <Card
            header="Label"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
            space={false}
          >
            <InputItem value={value} label="用户名" />
            <InputItem value={value} label="密码" />
            <InputItem value={value} label="手机号" />
          </Card>

          <Card
            header="Required"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
            space={false}
          >
            <InputItem value={value} label="用户名" required />
          </Card>

          <Card
            header="labelStyle"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
            space={false}
          >
            <InputItem
              label="用户名"
              value={value}
              labelStyle={{ color: 'red' }}
            />
          </Card>

          <Card
            header="Align Right"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
            space={false}
          >
            <InputItem label="用户名" value={value} align="right" />
          </Card>

          <Card
            header="Clearable"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
            space={false}
          >
            <InputItem value={value} label="用户名" clearable />
          </Card>

          <Card
            header="Hidden"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
            space={false}
          >
            <InputItem value={value} label="用户名" hidden />
          </Card>

          <Card
            header="Extra"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
            space={false}
          >
            <InputItem label="用户名" value={value} extra="扩展部分" />
          </Card>

          <Card
            header="Password"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
            space={false}
          >
            <InputItem value={value} password label="密码" />
          </Card>

          <Card
            header="placeholder"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
            space={false}
          >
            <InputItem
              label="用户名"
              value={value}
              placeholder="请输入用户名"
            />
          </Card>

          <Card
            header="placeholderStyle"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
            space={false}
          >
            <InputItem
              placeholder="请输入用户名"
              value={value}
              placeholderStyle={{ color: '#45e325' }}
              label="用户名"
            />
          </Card>

          <Card
            header="disabled"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
            space={false}
          >
            <InputItem
              label="用户名"
              value={value}
              placeholder="请输入用户名"
              disabled
            />
          </Card>

          <Card
            header="maxlength"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
            space={false}
          >
            <InputItem label="用户名" value={value} maxlength={5} />
          </Card>

          <Card
            header="confirmType"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
            space={false}
          >
            <InputItem label="用户名" value={value} confirmType="go" />
          </Card>

          <Card
            header="afterChange"
            style={cardStyle}
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
            />
          </Card>

          <Card
            header="onFocus"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
            space={false}
          >
            <InputItem
              label="用户名"
              value={value}
              onFocus={(e) => {
                console.log(e);
              }}
            />
          </Card>

          <Card
            header="onBlur"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
            space={false}
          >
            <InputItem
              label="用户名"
              value={value}
              onBlur={(e) => {
                console.log(e);
              }}
            />
          </Card>

          <Card
            header="onConfirm"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
            space={false}
          >
            <InputItem
              label="用户名"
              value={value}
              onConfirm={(e) => {
                console.log(e);
              }}
            />
          </Card>

          <Card
            header="onKeyboardHeightChange"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
            space={false}
          >
            <InputItem
              label="用户名"
              value={value}
              onKeyboardHeightChange={(e) => {
                console.log(e);
              }}
            />
          </Card>
        </Space>
      </View>
    );
  }
}
