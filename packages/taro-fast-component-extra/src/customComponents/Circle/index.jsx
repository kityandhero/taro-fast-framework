import { Canvas, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import {
  roundToTarget,
  getGuid,
  getSystemInfo,
  inCollection,
} from 'taro-fast-common/es/utils/tools';
import { isNumber } from 'taro-fast-common/es/utils/typeCheck';
import { toNumber } from 'taro-fast-common/es/utils/typeConvert';
import { ComponentBase } from 'taro-fast-common/es/customComponents';
import {
  CenterBox,
  VerticalBox,
} from 'taro-fast-component/es/customComponents';

import './index.less';

const classPrefix = `tfc-circle`;

const lineAdjust = 0;
const step = 0.01;

const lineCapCollection = ['butt', 'round', 'square'];

const defaultColor = '#d81e06';

const defaultProps = {
  style: {},
  backRingStyle: {},
  percent: 0,
  size: 400,
  color: defaultColor,
  backRingColor: '#fff',
  lineCap: 'round',
  lineWidth: 18,
  useLineColorGradient: false,
  lineColorStart: defaultColor,
  lineColorEnd: defaultColor,
};

class Circle extends ComponentBase {
  id = null;

  currentProcess = 0;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        show: true,
      },
    };

    this.id = getGuid();
  }

  componentDidMount() {
    const that = this;

    setTimeout(() => {
      that.drawPercent(this.getPercent());
    }, 200);
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(preProps, preState, snapshot) {
    this.drawPercent(this.getPercent());
  }

  getColor = () => {
    const { color } = this.props;

    return color || defaultProps.color;
  };

  getBackRingColor = () => {
    const { backRingColor } = this.props;

    return backRingColor || defaultProps.backRingColor;
  };

  getLineColorStart = () => {
    const { lineColorStart } = this.props;

    return lineColorStart || defaultProps.color;
  };

  getLineColorEnd = () => {
    const { lineColorEnd } = this.props;

    return lineColorEnd || defaultProps.color;
  };

  getPercent = () => {
    const { percent } = this.props;

    return roundToTarget(percent, 2);
  };

  getLineCap = () => {
    const { lineCap } = this.props;

    return inCollection(lineCapCollection, lineCap)
      ? lineCap
      : defaultProps.lineCap;
  };

  getLineWidth = () => {
    const { lineWidth } = this.props;

    const w = toNumber(lineWidth);

    return w ? lineWidth : defaultProps.lineWidth;
  };

  getSize = () => {
    const { size: sizeSource } = this.props;

    return isNumber(sizeSource)
      ? sizeSource > 0
        ? sizeSource
        : defaultProps.size
      : defaultProps.size;
  };

  drawPercent = (percent) => {
    const { useLineColorGradient } = this.props;

    this.draw(
      this.id,
      this.getColor(),
      this.getLineWidth(),
      this.getLineCap(),
      percent,
      !!useLineColorGradient,
      this.getLineColorStart(),
      this.getLineColorEnd(),
    );
  };

  draw = (
    id,
    color,
    lineWidth,
    lineCap,
    percent,
    useLineColorGradient = false,
    lineColorStart = '',
    lineColorEnd = '',
  ) => {
    if (this.currentProcess == percent) {
      return;
    }

    let systemInfo = getSystemInfo();

    const dpr = systemInfo.pixelRatio;

    const that = this;

    const query = Taro.createSelectorQuery();
    query
      .select(`#${id}`)
      .fields({ node: true, size: true })
      .exec((res) => {
        const n = res[0];

        if (!n) {
          return;
        }

        const canvas = n.node;

        canvas.width = n.width * dpr;
        canvas.height = n.height * dpr;

        const ctx = canvas.getContext('2d');

        ctx.lineWidth = lineWidth;
        ctx.lineCap = lineCap;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(canvas.width / 2, canvas.height / 2);

        if (useLineColorGradient) {
          var g = ctx.createLinearGradient(0, 0, 180, 0); //创建渐变对象  渐变开始点和渐变结束点

          g.addColorStop(0, lineColorStart); //添加颜色点
          g.addColorStop(1, lineColorEnd); //添加颜色点

          ctx.strokeStyle = g; //使用渐变对象作为圆环的颜色
        } else {
          ctx.strokeStyle = color;
        }

        const radius = canvas.width / 2 - lineAdjust - lineWidth;
        if (this.currentProcess < percent) {
          that.increase(ctx, canvas.width, canvas.height, radius, percent);
        }

        if (this.currentProcess > percent) {
          that.reduce(ctx, canvas.width, canvas.height, radius, percent);
        }
      });
  };

  increase = (ctx, width, height, radius, percent, drawBegin = false) => {
    if (this.currentProcess >= percent) {
      return;
    }

    if (!drawBegin) {
      this.facileCanvas(ctx, radius, 0, this.currentProcess);
    }

    const next = roundToTarget(this.currentProcess + step, 2);

    this.facileCanvas(ctx, radius, this.currentProcess, next);

    this.currentProcess = next;

    const that = this;

    setTimeout(function () {
      that.increase(ctx, width, height, radius, percent, true);
    }, 10);
  };

  reduce = (ctx, width, height, radius, endPercent) => {
    const that = this;

    if (this.currentProcess < endPercent) {
      if (this.currentProcess < 0) {
        ctx.clearRect(0 - width / 2, 0 - height / 2, width, height);
        this.currentProcess = 0;
      }
      return;
    }

    ctx.clearRect(0 - width / 2, 0 - height / 2, width, height);

    this.facileCanvas(ctx, radius, 0, this.currentProcess);

    const next = roundToTarget(this.currentProcess - step, 2);

    this.currentProcess = next;

    if (this.currentProcess === 0) {
      ctx.clearRect(0 - width / 2, 0 - height / 2, width, height);
    }

    setTimeout(function () {
      that.reduce(ctx, width, height, radius, endPercent, true);
    }, 20);
  };

  facileCanvas = (ctx, radius, startPercent, endPercent) => {
    ctx.beginPath();
    ctx.arc(
      0,
      0,
      radius,
      startPercent - 0.5 * Math.PI,
      2 * endPercent * Math.PI - 0.5 * Math.PI,
      false,
    );
    ctx.stroke();
    ctx.closePath();
  };

  render() {
    const { style, backRingStyle, children } = this.props;

    const size = this.getSize();
    const lineWidth = this.getLineWidth();
    const backRingColor = this.getBackRingColor();

    return (
      <CenterBox>
        <VerticalBox>
          <View
            className={classPrefix}
            style={{
              ...style,
              ...{
                width: `${size}rpx`,
                height: `${size}rpx`,
              },
            }}
          >
            <View
              className={`${classPrefix}_body`}
              style={{
                width: `${size}rpx`,
                height: `${size}rpx`,
                padding: '0',
                border: '0',
              }}
            >
              <View
                className={`${classPrefix}_body_inner`}
                style={{
                  ...backRingStyle,
                  ...{
                    zIndex: '10',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                  },
                }}
              >
                <CenterBox>
                  <VerticalBox>{children}</VerticalBox>
                </CenterBox>
              </View>
              <View
                className={`${classPrefix}_body_back_ring`}
                style={{ top: 0, left: 0 }}
              >
                <View
                  style={{
                    ...backRingStyle,
                    ...{
                      width: `${size - 1 - 2 * lineWidth}rpx`,
                      height: `${size - 1 - 2 * lineWidth}rpx`,
                      borderRadius: '50%',
                      border: `${
                        lineAdjust + lineWidth
                      }rpx solid ${backRingColor}`,
                    },
                  }}
                ></View>
              </View>
              <Canvas
                type="2d"
                style={{
                  width: `${size}rpx`,
                  height: `${size}rpx`,
                  zIndex: '5',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
                id={this.id}
              ></Canvas>
            </View>
          </View>
        </VerticalBox>
      </CenterBox>
    );
  }
}

Circle.defaultProps = {
  ...defaultProps,
};

export default Circle;
