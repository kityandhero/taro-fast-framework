import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import { logConsole } from 'easy-soft-utility';

import { Card, ImagePicker, Space } from 'taro-fast-component';

import { ContentPageBase } from '../../../customComponents';
import { cardHeaderStyle, cardStyle } from '../../../customConfig';

const style = {
  backgroundColor: '#f5f7fa',
  ...cardStyle,
};

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'ImagePicker',
    name: '图片选择',
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      visible1: false,
      visible2: false,
      visible3: false,
    };
  }

  renderContent = () => {
    // const { visible1, visible2, visible3 } = this.state;

    return (
      <View className="index">
        <Card header="打开面板" style={style} headerStyle={cardHeaderStyle}>
          <Space direction="vertical" fillWidth>
            <ImagePicker
              multiple
              count={10}
              files={[]}
              afterChange={({ fileList, fileChangedList, type }) => {
                logConsole({
                  fileList,
                  fileChangedList,
                  type,
                });
                // this.selectFileChanged(files, operationType, index);
              }}
              // eslint-disable-next-line no-unused-vars
              onFail={(message) => {
                // this.selectFileFail(message);
              }}
            />
          </Space>
        </Card>
      </View>
    );
  };
}
