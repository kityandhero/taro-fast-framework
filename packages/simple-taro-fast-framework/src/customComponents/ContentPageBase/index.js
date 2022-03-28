import { View } from '@tarojs/components';

import {
  Grid,
  ColorText,
  CenterBox,
  Button,
} from 'taro-fast-component/es/customComponents';
import { isArray, isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { toString } from 'taro-fast-common/es/utils/typeConvert';

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
        inner: null,
        wrapBuilder: null,
      },
    };
  }

  buildControlItem = ({
    index,
    keyPrefix,
    header,
    config,
    span = 1,
    inner = null,
    wrapBuilder = null,
  }) => {
    return this.buildGridItem({
      index,
      keyPrefix,
      span,
      title: header,
      inner,
      wrapBuilder,
      handler: (t, i, w) => {
        this.setState({
          header: t,
          currentConfig: config,
          inner: i,
          wrapBuilder: w,
        });
      },
    });
  };

  buildGridItem = ({
    index,
    keyPrefix = '',
    title,
    handler,
    span,
    inner = null,
    wrapBuilder = null,
  }) => {
    return (
      <Grid.Item key={`${keyPrefix || 'no'}_item_${index}`} span={span}>
        <CenterBox>
          <Button
            size="small"
            style={{
              width: '98%',
            }}
            onClick={() => {
              handler(title, inner, wrapBuilder);
            }}
          >
            <ColorText text={title} />
          </Button>
        </CenterBox>
      </Grid.Item>
    );
  };

  buildControlBox = (list) => {
    if (!isArray(list)) {
      return null;
    }

    if (list.length <= 0) {
      return null;
    }

    const result = [];

    let customSpan = false;

    list.forEach((item, index) => {
      const { header, config, span, inner, wrapBuilder } = {
        ...{ span: 1, inner: null, wrapBuilder: null },
        ...item,
      };

      if (span !== 1) {
        customSpan = true;
      }

      if (isArray(config)) {
        config.forEach((o, i) => {
          result.push({
            index: i,
            keyPrefix: toString(index),
            header,
            config: o,
            span,
            inner,
            wrapBuilder,
          });
        });
      } else {
        result.push({
          index,
          header,
          config,
          span,
          inner,
          wrapBuilder,
        });
      }
    });

    const listCount = list.length;

    return (
      <Grid columns={2} gap={12}>
        {list.map((item, index) => {
          const { header, keyPrefix, config, span, inner, wrapBuilder } = {
            ...{ span: 1, keyPrefix: null, inner: null, wrapBuilder: null },
            ...item,
          };

          return this.buildControlItem({
            index,
            keyPrefix,
            header,
            config,
            span: customSpan
              ? span
              : index === listCount - 1 && index % 2 === 0
              ? 2
              : span,
            inner,
            wrapBuilder,
          });
        })}
      </Grid>
    );
  };

  buildSimpleList = () => {
    const { currentConfig, inner, wrapBuilder } = this.state;

    const list = isArray(currentConfig) ? currentConfig : [currentConfig];

    const result = list.map((config, index) => {
      return this.buildSimpleItem({ key: `simple_${index}`, config, inner });
    });

    if (isFunction(wrapBuilder)) {
      return wrapBuilder(result);
    }

    return result;
  };

  // eslint-disable-next-line no-unused-vars
  buildSimpleItem = ({ key, config, inner }) => {
    return null;
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
