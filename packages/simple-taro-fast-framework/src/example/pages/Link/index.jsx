import {
  Card,
  VerticalBox,
  Space,
  Link,
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
    id: 'Link',
    name: '链接',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card header="简单使用" style={style} headerStyle={cardHeaderStyle}>
          <VerticalBox>
            <Link href="http://www.a.com" text="跳转链接" />
          </VerticalBox>
        </Card>

        <Card header="颜色" style={style} headerStyle={cardHeaderStyle}>
          <VerticalBox>
            <Link href="http://www.a.com" text="跳转链接" color="green" />
          </VerticalBox>
        </Card>

        <Card header="下划线" style={style} headerStyle={cardHeaderStyle}>
          <VerticalBox>
            <Link href="http://www.a.com" text="跳转链接" underLine />
          </VerticalBox>
        </Card>

        <Card header="字体大小" style={style} headerStyle={cardHeaderStyle}>
          <VerticalBox>
            <Link href="http://www.a.com" text="跳转链接" fontSize={40} />
          </VerticalBox>
        </Card>

        <Card header="复制提示" style={style} headerStyle={cardHeaderStyle}>
          <VerticalBox>
            <Link
              href="http://www.a.com"
              text="跳转链接"
              copyTips="复制成功, 请使用外部浏览器访问"
            />
          </VerticalBox>
        </Card>

        <Card
          header="未配置链接的提示"
          style={style}
          headerStyle={cardHeaderStyle}
        >
          <VerticalBox>
            <Link href="" text="跳转链接" />
          </VerticalBox>
        </Card>
      </Space>
    );
  };
}
