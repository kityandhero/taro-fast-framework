import { Card, Space, HelpBox } from 'taro-fast-component/es/customComponents';

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
    id: 'Normal',
    name: '滚动视图',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        scrollView: true,
      },
    };
  }

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card header="视图说明" style={style} headerStyle={cardHeaderStyle}>
          <HelpBox
            showTitle={false}
            showNumber={false}
            useBackground={false}
            list={[
              {
                text: '开启滚动视图模式下: this.setState({scrollView: true})',
              },
            ]}
          />
        </Card>
      </Space>
    );
  };
}
