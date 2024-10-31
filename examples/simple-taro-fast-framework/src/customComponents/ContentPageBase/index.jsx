import { View } from '@tarojs/components';

import { isArray, isFunction, toString } from 'easy-soft-utility';

import { Button, CenterBox, ColorText, Grid } from 'taro-fast-component';

import { Header } from '../Header';
import { PageWrapperSimulation } from '../PageWrapperSimulation';

import './index.less';

class ContentPageBase extends PageWrapperSimulation {
  viewStyle = {
    backgroundColor: '#fff',
  };

  headerData = null;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      spin: true,
      header: '',
      currentConfig: null,
      description: null,
      inner: null,
      wrapBuilder: null,
    };
  }

  buildControlItem = ({
    index,
    keyPrefix,
    header,
    description,
    config,
    span = 1,
    inner = null,
    wrapBuilder = null,
    callback = null,
  }) => {
    return this.buildGridItem({
      index,
      keyPrefix,
      span,
      title: header,
      description,
      config,
      inner,
      wrapBuilder,
      callback,
      handler: (one) => {
        const {
          header: t,
          description: d,
          config: c,
          inner: index_,
          wrapBuilder: w,
          callback: callback_,
        } = one;

        this.setState({
          header: t,
          description: d,
          currentConfig: c,
          inner: index_,
          wrapBuilder: w,
        });

        if (isFunction(callback_)) {
          callback_(one);
        }
      },
    });
  };

  buildGridItem = ({
    index,
    keyPrefix = '',
    title,
    description,
    config,
    handler,
    span,
    inner = null,
    wrapBuilder = null,
    callback = null,
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
              handler({
                header: title,
                description,
                config,
                inner,
                wrapBuilder,
                callback,
              });
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

    for (const [index, item] of list.entries()) {
      const {
        header,
        description,
        config,
        span,
        inner,
        wrapBuilder,
        callback,
      } = {
        header: '',
        description: '',
        span: 1,
        inner: null,
        wrapBuilder: null,
        callback: null,
        ...item,
      };

      if (span !== 1) {
        customSpan = true;
      }

      if (isArray(config)) {
        for (const [index_, o] of config.entries()) {
          result.push({
            index: index_,
            keyPrefix: toString(index),
            header,
            description,
            config: o,
            span,
            inner,
            wrapBuilder,
            callback,
          });
        }
      } else {
        result.push({
          index,
          header,
          description,
          config,
          span,
          inner,
          wrapBuilder,
          callback,
        });
      }
    }

    const listCount = list.length;

    return (
      <Grid columns={2} gap={12}>
        {list.map((item, index) => {
          const {
            header,
            description,
            keyPrefix,
            config,
            span,
            inner,
            wrapBuilder,
            callback,
          } = {
            span: 1,
            keyPrefix: null,
            header: '',
            description: '',
            inner: null,
            wrapBuilder: null,
            callback: null,
            ...item,
          };

          return this.buildControlItem({
            index,
            keyPrefix,
            header,
            description,
            config,
            span: customSpan
              ? span
              : index === listCount - 1 && index % 2 === 0
                ? 2
                : span,
            inner,
            wrapBuilder,
            callback,
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

  buildSimpleItemInner = (inner) => {
    if (isArray(inner)) {
      if (inner.length === 1) {
        return inner;
      }

      return inner.map((one) => {
        return one;
      });
    }

    return inner;
  };

  renderContent = () => {
    return null;
  };

  renderContentView = () => {
    const { id, name, description } = {
      id: '',
      name: '',
      description: '',
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

export { ContentPageBase };
