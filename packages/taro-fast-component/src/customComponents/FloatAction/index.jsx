import { useState, useEffect, pxTransform } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui';

import { generateId, isFunction, isArray } from '@/utils/tools';
import ImageBox from '@/customComponents/ImageBox';

import FloatLayout from '../FloatLayout';

import './index.less';

export const switchTypeCollection = {
  icon: 'icon',
  image: 'image',
  text: 'text',
};

const defaultSwitchOpenText = {
  value: '',
  color: '#fff',
  backgroundColor: '#b2b2b2',
};

const defaultSwitchCloseText = {
  value: '',
  color: '#fff',
  backgroundColor: '#b2b2b2',
};

const defaultSwitchOpenTaroUIIcon = {
  value: 'add',
  color: '#fff',
  backgroundColor: '#b2b2b2',
};

const defaultSwitchCloseTaroUIIcon = {
  value: 'close',
  color: '#fff',
  backgroundColor: '#b2b2b2',
};

const defaultSwitchOpenImage = {
  value: '',
};

const defaultSwitchCloseImage = {
  value: '',
};

const defaultPosition = {
  top: 'auto',
  right: 40,
  bottom: 120,
  left: 'auto',
};

function FloatButton(props) {
  const [show, setShow] = useState(false);
  const [hasTransition, setHasTransition] = useState(false);
  const [rotate, setRotate] = useState(0);
  const [] = useState({});
  const [actionListState, setActionListState] = useState(props.actionList);
  const {
    mask,
    open,
    backgroundColor,
    direction,
    shadow,
    shape,
    actionList,
    onItemClick,
    closeAfterItemClick,
    closeWithShadow,
    stretchDirection,
    switchOpenOpacity: switchOpenOpacityValue,
    switchCloseOpacity: switchCloseOpacityValue,
    switchOpenType: switchOpenTypeValue,
    switchCloseType: switchCloseTypeValue,
    switchOpenText: switchOpenTextObject,
    switchCloseText: switchCloseTextObject,
    switchOpenTaroUIIcon: switchOpenTaroUIIconObject,
    switchCloseTaroUIIcon: switchCloseTaroUIIconObject,
    switchOpenImage: switchOpenImageObject,
    switchCloseImage: switchCloseImageObject,
  } = props;

  useEffect(() => {
    const list = (isArray(actionList) ? actionList : []).reverse();
    setActionListState(
      list.map((item) => {
        item.cu_floatAction_id = generateId();
        return item;
      }),
    );
  }, [actionList, props.actionList]);

  const dealBgColor = backgroundColor || '#b2b2b2';
  const dealShadow = shadow ? 'tfc-float-action__icon_box_shadow' : '';
  let dealActionList = actionListState || [];

  const switchOpenOpacity =
    switchOpenOpacityValue < 0 || switchOpenOpacityValue > 1
      ? 1
      : switchOpenOpacityValue;

  const switchCloseOpacity =
    switchCloseOpacityValue < 0 || switchCloseOpacityValue > 1
      ? 1
      : switchCloseOpacityValue;

  const switchOpenType =
    switchOpenTypeValue !== switchTypeCollection.icon &&
    switchOpenTypeValue !== switchTypeCollection.image
      ? switchTypeCollection.icon
      : switchOpenTypeValue;

  const switchCloseType =
    switchCloseTypeValue !== switchTypeCollection.icon &&
    switchCloseTypeValue !== switchTypeCollection.image
      ? switchTypeCollection.icon
      : switchCloseTypeValue;

  const switchOpenTaroUIIcon = {
    ...defaultSwitchOpenTaroUIIcon,
    ...(switchOpenTaroUIIconObject || {}),
  };

  const switchCloseTaroUIIcon = {
    ...defaultSwitchCloseTaroUIIcon,
    ...(switchCloseTaroUIIconObject || {}),
  };

  const switchOpenText = {
    ...defaultSwitchOpenText,
    ...(switchOpenTextObject || {}),
  };

  const switchCloseText = {
    ...defaultSwitchCloseText,
    ...(switchCloseTextObject || {}),
  };

  const switchOpenImage = {
    ...defaultSwitchOpenImage,
    ...(switchOpenImageObject || {}),
  };

  const switchCloseImage = {
    ...defaultSwitchCloseImage,
    ...(switchCloseImageObject || {}),
  };

  let sharpValue = '';

  switch (shape) {
    case 'round':
      sharpValue = 'tfc-float-action__icon_box_round';
      break;

    default:
      break;
  }

  let stretch = 'translateY';

  switch (stretchDirection) {
    case 'top':
      stretch = 'translateY';
      break;

    case 'bottom':
      stretch = 'translateY';
      break;

    case 'left':
      stretch = 'translateX';
      break;

    case 'right':
      stretch = 'translateX';
      break;

    default:
      stretch = 'translateY';

      break;
  }

  const actionListComponent = dealActionList.map((item, index, source) => {
    const { closeAfterClick } = item;

    const length = source.length;

    return (
      <View
        key={item.cu_floatAction_id}
        // style={{ position: show ? "relative" : "absolute" }}
        style={{
          position: show ? 'absolute' : 'absolute',
          transform: show
            ? `${stretch}(${-100 * (index + 1)}%)`
            : hasTransition
            ? `${stretch}(0%)`
            : 'null',
          transition: show
            ? `all ${
                (0.15 * (index + 1)) / (length <= 3 ? 1 : length / 3)
              }s ease-out`
            : hasTransition
            ? `all ${
                (0.15 * (index + 1)) / (length <= 3 ? 1 : length / 3)
              }s ease-out`
            : 'null',
        }}
      >
        <View>
          <FloatLayout
            padding="small"
            paddingDirection={direction === 'vertical' ? 'bottom' : 'right'}
          >
            <View
              className={`tfc-float-action__icon_box ${sharpValue} ${dealShadow}`}
              style={{
                backgroundColor: item.backgroundColor
                  ? item.backgroundColor
                  : dealBgColor,
              }}
              onClick={(e) => {
                e.stopPropagation();
                isFunction(onItemClick) && onItemClick(item.key);
                (closeAfterItemClick || closeAfterClick) && clickButton();
              }}
            >
              <View
                className={`${
                  item.type === switchTypeCollection.image
                    ? 'tfc-float-action__image_box'
                    : ''
                }`}
              >
                {item.type === switchTypeCollection.icon ? (
                  <AtIcon
                    value={item.value || ''}
                    size={24}
                    color={item.color || '#000'}
                  />
                ) : null}

                {item.type === switchTypeCollection.image ? (
                  <View className="tfc-float-action__imageContainor">
                    <View className="tfc-float-action__imageContainorInner">
                      <ImageBox src={item.value} />
                    </View>
                  </View>
                ) : null}

                {item.type === switchTypeCollection.text ? (
                  <View className="tfc-float-action__textContainor">
                    <View className="tfc-float-action__textContainorInner">
                      <Text>{item.value}</Text>
                    </View>
                  </View>
                ) : null}
              </View>
            </View>
          </FloatLayout>
        </View>
      </View>
    );
  });

  const clickButton = () => {
    open && setShow(!show);
    !hasTransition && setHasTransition(true);
    open && setRotate(rotate ? 0 : 45);
  };

  const position = props.position || {
    top: 'auto',
    right: 50,
    bottom: 200,
    left: 'auto',
  };

  return (
    <View style={Object.assign({}, props.style)}>
      {mask ? (
        <View
          className={`tfc-float-action__mask ${
            show
              ? 'tfc-float-action__mask_active'
              : 'tfc-float-action__mask_no_active'
          }`}
          style={{
            transition: show ? null : 'z-index 0.01s ease 0.15s',
          }}
        >
          <View
            className={`tfc-float-action__mask_content ${
              show
                ? 'tfc-float-action__mask_content_active'
                : 'tfc-float-action__mask_content_no_active'
            }`}
            style={{
              transition: 'opacity 0.15s ease 0.01s',
            }}
            onTouchMove={(e) => {
              e.stopPropagation();
            }}
            onClick={() => {
              closeWithShadow && clickButton();
            }}
          ></View>
        </View>
      ) : null}

      <View
        className="tfc-float-action__fixed"
        style={{
          opacity: show ? switchCloseOpacity : switchOpenOpacity,
          top:
            position.top && position.top !== 'auto'
              ? pxTransform(position.top)
              : 'auto',
          right:
            position.right && position.right !== 'auto'
              ? pxTransform(position.right)
              : 'auto',
          bottom:
            position.bottom && position.bottom !== 'auto'
              ? pxTransform(position.bottom)
              : 'auto',
          left:
            position.left && position.left !== 'auto'
              ? pxTransform(position.left)
              : 'auto',
        }}
      >
        <View className="tfc-float-action__content">
          {actionListComponent}
          <View
            className={`tfc-float-action__icon_box ${
              show ? 'tfc-float-action__icon_box_active' : ''
            } ${sharpValue} ${dealShadow}`}
            style={{
              backgroundColor: dealBgColor,
            }}
            onClick={(e) => {
              e.stopPropagation();
              clickButton();
            }}
          >
            <View
              className={`tfc-float-action__switch_box ${
                show
                  ? 'tfc-float-action__switch_open_box_dead'
                  : 'tfc-float-action__switch_open_box_active'
              } ${
                switchOpenType === switchTypeCollection.image
                  ? 'tfc-float-action__image_box'
                  : ''
              }`}
              style={{
                transition: 'opacity 0.3s',
              }}
            >
              {switchOpenType === switchTypeCollection.icon ? (
                <AtIcon
                  value={switchOpenTaroUIIcon.value || 'add'}
                  size={24}
                  color={switchOpenTaroUIIcon.color || '#fff'}
                />
              ) : null}

              {switchOpenType === switchTypeCollection.image ? (
                <View className="tfc-float-action__imageContainor">
                  <View className="tfc-float-action__imageContainorInner">
                    <ImageBox src={switchOpenImage.value} />
                  </View>
                </View>
              ) : null}

              {switchOpenType === switchTypeCollection.text ? (
                <View className="tfc-float-action__textContainor">
                  <View className="tfc-float-action__textContainorInner">
                    <Text>{switchOpenText.value}</Text>
                  </View>
                </View>
              ) : null}
            </View>

            <View
              className={`tfc-float-action__switch_box ${
                show
                  ? 'tfc-float-action__switch_close_box_active'
                  : 'tfc-float-action__switch_close_box_dead'
              } ${
                switchCloseType === switchTypeCollection.image
                  ? 'tfc-float-action__image_box'
                  : ''
              }`}
              style={{
                transition: 'opacity 0.15s',
              }}
            >
              {switchCloseType === switchTypeCollection.icon ? (
                <AtIcon
                  value={switchCloseTaroUIIcon.value || 'add'}
                  size={24}
                  color={switchCloseTaroUIIcon.color || '#fff'}
                />
              ) : null}

              {switchCloseType === switchTypeCollection.image ? (
                <View className="tfc-float-action__imageContainor">
                  <View className="tfc-float-action__imageContainorInner">
                    <ImageBox src={switchCloseImage.value} />
                  </View>
                </View>
              ) : null}

              {switchCloseType === switchTypeCollection.text ? (
                <View className="tfc-float-action__textContainor">
                  <View className="tfc-float-action__textContainorInner">
                    <Text>{switchCloseText.value}</Text>
                  </View>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

FloatButton.options = {
  addGlobalClass: true,
};

FloatButton.defaultProps = {
  mask: false,
  open: true,
  closeAfterItemClick: false,
  closeWithShadow: true,
  shadow: true,
  backgroundColor: '#b2b2b2',
  direction: 'vertical',
  stretchDirection: 'top',
  shape: 'round',
  switchOpenOpacity: 0.7,
  switchCloseOpacity: 1,
  switchOpenType: switchTypeCollection.icon,
  switchCloseType: switchTypeCollection.icon,
  switchOpenText: defaultSwitchOpenText,
  switchCloseText: defaultSwitchCloseText,
  switchOpenTaroUIIcon: defaultSwitchOpenTaroUIIcon,
  switchCloseTaroUIIcon: defaultSwitchCloseTaroUIIcon,
  switchOpenImage: defaultSwitchOpenImage,
  switchCloseImage: defaultSwitchCloseImage,
  position: defaultPosition,
  actionList: [],
  onItemClick: () => {},
};

export default FloatButton;
