import { View } from '@tarojs/components';

import {
  AdvanceInput,
  Card,
  Icon,
  ColorText,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const { IconEdit } = Icon;

export default class Index extends PageWrapper {
  afterChange = (v) => {
    console.log(`input changed: ${v}`);
  };

  renderFurther() {
    return (
      <View className="index" headerStyle={cardHeaderStyle}>
        <Card header="基础" headerStyle={cardHeaderStyle}>
          <AdvanceInput onChange={this.afterChange} />
        </Card>

        <Card header="Label" headerStyle={cardHeaderStyle}>
          <AdvanceInput label="用户名" onChange={this.afterChange} />
        </Card>

        <Card header="Required" headerStyle={cardHeaderStyle}>
          <AdvanceInput label="用户名" required onChange={this.afterChange} />
        </Card>

        <Card header="labelStyle" headerStyle={cardHeaderStyle}>
          <AdvanceInput
            label="用户名"
            labelStyle={{ color: 'red' }}
            onChange={this.afterChange}
          />
        </Card>

        <Card header="Align Right" headerStyle={cardHeaderStyle}>
          <AdvanceInput
            label="用户名"
            align="right"
            onChange={this.afterChange}
          />
        </Card>

        <Card header="Clearable" headerStyle={cardHeaderStyle}>
          <AdvanceInput label="用户名" clearable onChange={this.afterChange} />
        </Card>

        <Card header="Hidden" headerStyle={cardHeaderStyle}>
          <AdvanceInput label="用户名" hidden onChange={this.afterChange} />
        </Card>

        <Card header="Extra" headerStyle={cardHeaderStyle}>
          <AdvanceInput
            label="用户名"
            extra="扩展部分"
            onChange={this.afterChange}
          />
        </Card>

        <Card header="Password" headerStyle={cardHeaderStyle}>
          <AdvanceInput password label="密码" onChange={this.afterChange} />
        </Card>

        <Card header="placeholder" headerStyle={cardHeaderStyle}>
          <AdvanceInput
            label="用户名"
            placeholder="请输入用户名"
            onChange={this.afterChange}
          />
        </Card>

        <Card header="placeholderStyle" headerStyle={cardHeaderStyle}>
          <AdvanceInput
            placeholder="请输入用户名"
            placeholderStyle={{ color: '#45e325' }}
            label="用户名"
            onChange={this.afterChange}
          />
        </Card>

        <Card header="disabled" headerStyle={cardHeaderStyle}>
          <AdvanceInput
            label="用户名"
            placeholder="请输入用户名"
            disabled
            onChange={this.afterChange}
          />
        </Card>

        <Card header="maxlength" headerStyle={cardHeaderStyle}>
          <AdvanceInput
            label="用户名"
            maxlength={5}
            onChange={this.afterChange}
          />
        </Card>

        <Card header="confirmType" headerStyle={cardHeaderStyle}>
          <AdvanceInput
            label="用户名"
            confirmType="go"
            onChange={this.afterChange}
          />
        </Card>

        <Card header="confirmHold" headerStyle={cardHeaderStyle}>
          <AdvanceInput
            label="用户名"
            confirmHold
            onChange={this.afterChange}
          />
        </Card>

        <Card header="adjustPosition" headerStyle={cardHeaderStyle}>
          <AdvanceInput
            label="用户名"
            adjustPosition={false}
            onChange={this.afterChange}
          />
        </Card>

        <Card header="holdKeyboard" headerStyle={cardHeaderStyle}>
          <AdvanceInput
            label="用户名"
            holdKeyboard
            onChange={this.afterChange}
          />
        </Card>

        <Card header="onChange" headerStyle={cardHeaderStyle}>
          <AdvanceInput label="用户名" onChange={this.afterChange} />
        </Card>

        <Card header="onFocus" headerStyle={cardHeaderStyle}>
          <AdvanceInput
            label="用户名"
            onFocus={(e) => {
              console.log(e);
            }}
            onChange={this.afterChange}
          />
        </Card>

        <Card header="onBlur" headerStyle={cardHeaderStyle}>
          <AdvanceInput
            label="用户名"
            onBlur={(e) => {
              console.log(e);
            }}
            onChange={this.afterChange}
          />
        </Card>

        <Card header="onConfirm" headerStyle={cardHeaderStyle}>
          <AdvanceInput
            label="用户名"
            onConfirm={(e) => {
              console.log(e);
            }}
            onChange={this.afterChange}
          />
        </Card>

        <Card header="onKeyboardHeightChange" headerStyle={cardHeaderStyle}>
          <AdvanceInput
            label="用户名"
            onKeyboardHeightChange={(e) => {
              console.log(e);
            }}
            onChange={this.afterChange}
          />
        </Card>

        <Card header="复杂Label" headerStyle={cardHeaderStyle}>
          <AdvanceInput
            label={
              <ColorText
                icon={<IconEdit size={16} color="#ff3ce7" />}
                textPrefix="前缀"
                text="文本文字"
                separatorStyle={{ color: '#67ca31', margin: '0 24rpx' }}
              />
            }
            onKeyboardHeightChange={(e) => {
              console.log(e);
            }}
            onChange={this.afterChange}
          />
        </Card>
      </View>
    );
  }
}
