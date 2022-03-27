import { View } from '@tarojs/components';

import {
  Grid,
  ColorText,
  CenterBox,
  Button,
} from 'taro-fast-component/es/customComponents';

import Header from '../Header';
import PageWrapper from '../PageWrapper';

import './index.less';

export default class ContentPageBase extends PageWrapper {
  viewStyle = {
    backgroundColor: '#fff',
  };

  headerData = null;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        spin: true,
        header: '',
        currentConfig: null,
      },
    };
  }

  establishControlList = () => {
    return [];
  };

  buildControlItem = ({ header, config }) => {
    return this.buildGridItem({
      title: header,
      handler: (text) => {
        this.setState({
          header: text,
          currentConfig: config,
        });
      },
    });
  };

  buildGridItem = ({ title, handler }) => {
    return (
      <Grid.Item>
        <CenterBox>
          <Button
            size="small"
            style={{
              width: '98%',
            }}
            onClick={() => {
              handler(title);
            }}
          >
            <ColorText text={title} />
          </Button>
        </CenterBox>
      </Grid.Item>
    );
  };

  buildControlBox = () => {
    const list = this.establishControlList();
    if (list.length <= 0) {
      return null;
    }

    return (
      <Grid columns={2} gap={12}>
        {list.map((item, index) => {
          const { header, config } = item;

          return this.buildControlItem({
            index,
            header,
            config,
          });
        })}
      </Grid>
    );
  };

  renderContent = () => {
    return null;
  };

  renderContentView = () => {
    const { id, name, description } = {
      ...{
        id: '',
        name: '',
        description: '',
      },
      ...this.headerData,
    };

    return (
      <>
        {(this.headerData || null) == null ? null : (
          <Header title={`${id} ${name}`} description={description}></Header>
        )}

        <View className="doc-body">{this.renderContent()}</View>
      </>
    );
  };

  renderFurther() {
    return this.renderContentView();
  }
}
