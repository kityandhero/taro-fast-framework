import {
  showInfoMessage,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import {
  Card,
  Space,
  ProgressItem,
  Button,
  Icon,
  HelpBox,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

const { IconCheckCircle } = Icon;

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '进度项',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'ProgressItem',
    name: '进度项',
    description: '进度项组件',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card header="横向布局" style={style} headerStyle={cardHeaderStyle}>
          <Space direction="vertical" fillWidth>
            <ProgressItem label="当前进度" percent={20} extra="扩展" />
          </Space>
        </Card>

        <Card header="纵向布局" style={style} headerStyle={cardHeaderStyle}>
          <Space direction="vertical" fillWidth>
            <ProgressItem
              layout="vertical"
              label="当前进度"
              percent={20}
              extra="扩展"
            />
          </Space>
        </Card>

        <Card header="横向布局示例" style={style} headerStyle={cardHeaderStyle}>
          <ProgressItem
            label="剩余数量"
            percent={70}
            borderRadius={4}
            showInfo
            fontSize={28}
            activeColor="#FF3141"
            backgroundColor="#000000"
            icon={<IconCheckCircle size={38} showInfo color="green" />}
            extra={
              <Button
                color="primary"
                size="mini"
                onClick={() => {
                  showInfoMessage({
                    message: 'click',
                  });
                }}
                style={{ marginLeft: transformSize(8) }}
              >
                立即抢
              </Button>
            }
            extraStyle={
              {
                // padding: `0 ${transformSize(10)}`,
              }
            }
          />
        </Card>

        <Card header="纵向布局示例" style={style} headerStyle={cardHeaderStyle}>
          <ProgressItem
            layout="vertical"
            label="剩余数量"
            percent={70}
            borderRadius={4}
            showInfo
            fontSize={28}
            activeColor="#FF3141"
            backgroundColor="#000000"
            icon={<IconCheckCircle size={38} showInfo color="green" />}
            extra={
              <Button
                color="primary"
                size="mini"
                onClick={() => {
                  showInfoMessage({
                    message: 'click',
                  });
                }}
                style={{ marginLeft: transformSize(8) }}
              >
                立即抢
              </Button>
            }
            extraStyle={
              {
                // padding: `0 ${transformSize(10)}`,
              }
            }
          />
        </Card>

        <Card header="属性说明 :" style={style} headerStyle={cardHeaderStyle}>
          <HelpBox
            showTitle={false}
            showNumber={false}
            list={[
              {
                text: '默认为横向布局',
              },
              {
                text: '进度条配置请参照 ProgressBox组件',
              },
            ]}
          />
        </Card>
      </Space>
    );
  };
}
