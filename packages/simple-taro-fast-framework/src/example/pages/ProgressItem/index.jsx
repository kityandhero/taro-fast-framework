import { View } from '@tarojs/components';

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
import PageWrapper from '../../../customComponents/PageWrapper';

const { IconCheckCircle } = Icon;

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Space direction="vertical" fillWidth>
          <Card
            header="横向布局"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
            <Space direction="vertical" fillWidth>
              <ProgressItem label="当前进度" percent={20} extra="扩展" />
            </Space>
          </Card>

          <Card
            header="纵向布局"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
            <Space direction="vertical" fillWidth>
              <ProgressItem
                layout="vertical"
                label="当前进度"
                percent={20}
                extra="扩展"
              />
            </Space>
          </Card>

          <Card
            header="横向布局示例"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
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

          <Card
            header="纵向布局示例"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
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

          <Card
            header="属性说明 :"
            style={cardStyle}
            headerStyle={cardHeaderStyle}
          >
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
      </View>
    );
  }
}
