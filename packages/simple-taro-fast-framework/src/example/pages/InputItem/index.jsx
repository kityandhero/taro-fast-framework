import { View } from '@tarojs/components';

import {
  InputItem,
  Card,
  Space,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        value: '',
      },
    };
  }

  afterChange = (v) => {
    this.setState({
      value: v,
    });
  };

  renderFurther() {
    const { value } = this.state;

    return (
      <View className="index" headerStyle={cardHeaderStyle}>
        <Space direction="vertical" fillWidth>
          <Card header="基础" headerStyle={cardHeaderStyle} space={false}>
            <InputItem value={value} />
          </Card>

          <Card header="Label" headerStyle={cardHeaderStyle} space={false}>
            <InputItem value={value} label="用户名" />
            <InputItem value={value} label="密码" />
            <InputItem value={value} label="手机号" />
          </Card>

          <Card header="Required" headerStyle={cardHeaderStyle} space={false}>
            <InputItem value={value} label="用户名" required />
          </Card>

          <Card header="labelStyle" headerStyle={cardHeaderStyle} space={false}>
            <InputItem
              label="用户名"
              value={value}
              labelStyle={{ color: 'red' }}
            />
          </Card>

          <Card
            header="Align Right"
            headerStyle={cardHeaderStyle}
            space={false}
          >
            <InputItem label="用户名" value={value} align="right" />
          </Card>

          <Card header="Clearable" headerStyle={cardHeaderStyle} space={false}>
            <InputItem value={value} label="用户名" clearable />
          </Card>

          <Card header="Hidden" headerStyle={cardHeaderStyle} space={false}>
            <InputItem value={value} label="用户名" hidden />
          </Card>

          <Card header="Extra" headerStyle={cardHeaderStyle} space={false}>
            <InputItem label="用户名" value={value} extra="扩展部分" />
          </Card>

          <Card header="Password" headerStyle={cardHeaderStyle} space={false}>
            <InputItem value={value} password label="密码" />
          </Card>

          <Card
            header="placeholder"
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

          <Card header="disabled" headerStyle={cardHeaderStyle} space={false}>
            <InputItem
              label="用户名"
              value={value}
              placeholder="请输入用户名"
              disabled
            />
          </Card>

          <Card header="maxlength" headerStyle={cardHeaderStyle} space={false}>
            <InputItem label="用户名" value={value} maxlength={5} />
          </Card>

          <Card
            header="confirmType"
            headerStyle={cardHeaderStyle}
            space={false}
          >
            <InputItem label="用户名" value={value} confirmType="go" />
          </Card>

          <Card header="onChange" headerStyle={cardHeaderStyle} space={false}>
            <InputItem value={value} label="用户名" />
          </Card>

          <Card
            header="afterChange"
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

          <Card header="onFocus" headerStyle={cardHeaderStyle} space={false}>
            <InputItem
              label="用户名"
              value={value}
              onFocus={(e) => {
                console.log(e);
              }}
            />
          </Card>

          <Card header="onBlur" headerStyle={cardHeaderStyle} space={false}>
            <InputItem
              label="用户名"
              value={value}
              onBlur={(e) => {
                console.log(e);
              }}
            />
          </Card>

          <Card header="onConfirm" headerStyle={cardHeaderStyle} space={false}>
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
