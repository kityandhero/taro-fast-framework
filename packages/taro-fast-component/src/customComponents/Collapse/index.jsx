import classNames from 'classnames';
import { View } from '@tarojs/components';

import { isArray } from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import CenterBox from '../CenterBox';
import Item from '../Item';
import Icon from '../Icon';

import './index.less';

const classPrefix = `tfc-collapse`;

const { IconChevronDown } = Icon;

const defaultProps = {
  style: {},
  options: [],
  border: true,
  iconUncheck: null,
  iconCheck: null,
  list: [],
  single: false,
};

class Collapse extends ComponentBase {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        listStage: [],
        openList: [],
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { list: listNext, single } = nextProps;
    const { listStage: listPrev } = prevState;

    if (JSON.stringify(listNext) !== JSON.stringify(listPrev)) {
      let firstOpen = false;

      const openList = (isArray(listNext) ? listNext : []).map((o) => {
        if (o.open && !firstOpen) {
          firstOpen = true;
        }

        return o.open ? (single && firstOpen ? false : true) : false;
      });

      return {
        listStage: listNext,
        openList,
      };
    }

    return {};
  }

  triggerClick = (o, i) => {
    const { single } = this.props;
    const { openList } = this.state;

    if (single) {
      openList = openList.map((item, index) => {
        if (i !== index) {
          return false;
        }

        return item;
      });

      openList[i] = !!!openList[i];
    } else {
      openList[i] = !!!openList[i];
    }

    this.setState({ openList: [...openList] });
  };

  renderFurther() {
    const { style, border, list } = this.props;
    const { openList } = this.state;

    return (
      <View style={style}>
        {(isArray(list) ? list : []).map((o, index) => {
          const {
            prefix,
            title,
            label,
            description,
            style: styleItem,
            disabled,
            body,
            extraContainerStyle,
          } = o;

          const key = `item_${index}`;

          const bodyVisible = openList[index];

          return (
            <Item
              key={key}
              prefix={prefix}
              title={title}
              label={label}
              style={styleItem}
              description={description}
              clickable
              arrow={false}
              disabled={disabled}
              border={border}
              showBody={bodyVisible}
              body={body}
              bodyAnimate
              extra={
                <CenterBox>
                  <View
                    className={classNames(classPrefix, {
                      [`${classPrefix}__arrow`]: true,
                      [`${classPrefix}__arrow__close`]: !bodyVisible,
                      [`${classPrefix}__arrow__open`]: bodyVisible,
                    })}
                  >
                    <IconChevronDown size={38} color="#969799" />
                  </View>
                </CenterBox>
              }
              extraContainerStyle={extraContainerStyle}
              onClick={() => {
                this.triggerClick(o, index);
              }}
            />
          );
        })}
      </View>
    );
  }
}

Collapse.defaultProps = {
  ...defaultProps,
};

export default Collapse;
