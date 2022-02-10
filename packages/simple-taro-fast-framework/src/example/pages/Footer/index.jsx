import { Card, Footer, Space } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';
import logoImg from '../../../assets/images/logo.png';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Footer',
    name: '底部',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card header="用法展示" style={style} headerStyle={cardHeaderStyle}>
          <Footer image={logoImg} />
        </Card>

        <Card header="用法展示" style={style} headerStyle={cardHeaderStyle}>
          <Footer text="中国*******有限公司" />
        </Card>

        <Card header="用法展示" style={style} headerStyle={cardHeaderStyle}>
          <Footer description="Copyright © 2018-2022 all rights reserved" />
        </Card>

        <Card header="用法展示" style={style} headerStyle={cardHeaderStyle}>
          <Footer
            circle
            image={logoImg}
            text="中国*******有限公司"
            description="Copyright © 2018-2022 all rights reserved"
          />
        </Card>
      </Space>
    );
  };
}
