import { View } from '@tarojs/components';

import { Card, Space, Collapse } from 'taro-fast-component/es/customComponents';

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
    id: 'Collapse',
    name: '折叠面板',
  };

  renderContent = () => {
    return (
      <View className="index">
        <Space direction="vertical" fillWidth>
          <Card
            header="基本展示"
            headerStyle={cardHeaderStyle}
            style={style}
            space={false}
          >
            <Collapse
              list={[
                {
                  label: '标题1',
                  body: '面板1',
                },
                {
                  label: '标题2',
                  body: '面板2',
                },
                {
                  label: '标题3',
                  body: '面板3',
                },
              ]}
            />
          </Card>

          <Card
            header="唯一展开"
            style={style}
            headerStyle={cardHeaderStyle}
            space={false}
          >
            <Collapse
              single
              list={[
                {
                  label: '标题1',
                  body: '面板1',
                },
                {
                  label: '标题2',
                  body: '面板2',
                },
                {
                  label: '标题3',
                  body: '面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3面板3',
                },
              ]}
            />
          </Card>

          <Card
            header="禁用"
            headerStyle={cardHeaderStyle}
            style={style}
            space={false}
          >
            <Collapse
              single
              list={[
                {
                  label: '标题1',
                  body: '面板1',
                },
                {
                  label: '标题2',
                  body: '面板2',
                },
                {
                  label: '标题3',
                  body: '面板3',
                  disabled: true,
                },
              ]}
            />
          </Card>
        </Space>
      </View>
    );
  };
}
