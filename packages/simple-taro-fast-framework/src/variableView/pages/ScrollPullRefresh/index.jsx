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
    name: '滚动视图下拉刷新',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        scrollView: true,
        pullDownRefresh: true,
        refreshColor: 'red',
        refreshBackgroundColor: 'green',
      },
    };
  }

  onReload = () => {
    console.log('onReload');
  };

  onLoadMore = () => {
    console.log('onLoadMore');
  };

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
                text: '开启下拉刷新式: this.setState({scrollView: true,pullDownRefresh: true})',
              },
            ]}
          />
        </Card>
      </Space>
    );
  };
}
