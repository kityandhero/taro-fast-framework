import { Canvas, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import {
  checkInCollection,
  envCollection,
  getGuid,
  isNumber,
  logException,
  logExecute,
  logWarn,
  toNumber,
  toRound,
} from 'easy-soft-utility';

import { ComponentBase } from 'taro-fast-common/es/customComponents';
import {
  getFields,
  getSystemInfo,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import {
  HorizontalCenterBox,
  VerticalBox,
} from 'taro-fast-component/es/customComponents';

import './index.less';

const classPrefix = `tfc-circle`;

const lineAdjust = 0;
const step = 0.01;

const lineCapCollection = ['butt', 'round', 'square'];

const defaultColor = '#d81e06';

const defaultProps = {
  ...ComponentBase.defaultProps,
  ...{
    style: {},
    backRingStyle: {},
    percent: 0,
    size: 200,
    color: defaultColor,
    backRingColor: '#fff',
    lineCap: 'round',
    lineWidth: 18,
    useLineColorGradient: false,
    lineColorStart: defaultColor,
    lineColorEnd: defaultColor,
  },
};

class Circle extends ComponentBase {
  id = null;

  canvasId = null;

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
    this.canvasId = getGuid();
  }

  doWorkAdjustDidMount = () => {
    const that = this;

    setTimeout(() => {
      that.drawPercent(this.getPercent());
    }, 400);
  };

  // eslint-disable-next-line no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    this.drawPercent(this.getPercent());
  };

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

    return toRound(percent, 2);
  };

  getLineCap = () => {
    const { lineCap } = this.props;

    return checkInCollection(lineCapCollection, lineCap)
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

    logExecute('draw');

    let systemInfo = getSystemInfo();

    const dpr = systemInfo.pixelRatio;

    const that = this;

    getFields(`#${id}`)
      .then((n) => {
        if (!n) {
          return;
        }

        const width = n.width * dpr;
        const height = n.height * dpr;

        let ctx = null;
        let supportLineColorGradient = false;

        const env = this.getEnv();

        // 标签栏滚动
        switch (env) {
          case envCollection.WEAPP:
            const canvas = n.node;

            canvas.width = width;
            canvas.height = height;

            ctx = canvas.getContext('2d');
            supportLineColorGradient = true;
            break;

          case envCollection.ALIPAY:
            logWarn(`framework with env [${env}] has no adaptation`);
            break;

          case envCollection.SWAN:
            logWarn(`framework with env [${env}] has no adaptation`);
            break;

          case envCollection.WEB:
            ctx = Taro.createCanvasContext(that.canvasId, that);
            ctx.canvas.width = width;
            ctx.canvas.height = height;

            break;

          default:
            logWarn(`framework with env [${env}] has no adaptation`);
            break;
        }

        if (ctx == null) {
          logWarn(`framework with env [${env}] has no adaptation`);

          return;
        }

        ctx.lineWidth = lineWidth;
        ctx.lineCap = lineCap;

        ctx.clearRect(0, 0, width, height);
        ctx.translate(width / 2, height / 2);

        if (useLineColorGradient && supportLineColorGradient) {
          const g = ctx.createLinearGradient(0, 0, 180, 0); //创建渐变对象  渐变开始点和渐变结束点

          g.addColorStop(0, lineColorStart); //添加颜色点
          g.addColorStop(1, lineColorEnd); //添加颜色点

          ctx.strokeStyle = g; //使用渐变对象作为圆环的颜色
        } else {
          ctx.strokeStyle = color;
        }

        const radius = width / 2 - lineAdjust - lineWidth;
        if (that.currentProcess < percent) {
          that.increase(ctx, width, height, radius, percent);
        }

        if (that.currentProcess > percent) {
          that.reduce(ctx, width, height, radius, percent);
        }

        return n;
      })
      .catch((error) => {
        logException(error.message);
      });
  };

  increase = (ctx, width, height, radius, percent, drawBegin = false) => {
    if (this.currentProcess >= percent) {
      return;
    }

    if (!drawBegin) {
      this.facileCanvas(ctx, radius, 0, this.currentProcess);
    }

    const next = toRound(this.currentProcess + step, 2);

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

    const next = toRound(this.currentProcess - step, 2);

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

  renderFurther() {
    const { style, backRingStyle, children } = this.props;

    const size = this.getSize();
    const lineWidth = this.getLineWidth();
    const backRingColor = this.getBackRingColor();

    return (
      <HorizontalCenterBox>
        <VerticalBox>
          <View
            className={classPrefix}
            style={{
              ...style,
              ...{
                width: transformSize(size),
                height: transformSize(size),
              },
            }}
          >
            <View
              className={`${classPrefix}_body`}
              style={{
                width: transformSize(size),
                height: transformSize(size),
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
                <HorizontalCenterBox>
                  <VerticalBox>{children}</VerticalBox>
                </HorizontalCenterBox>
              </View>
              <View
                className={`${classPrefix}_body_back_ring`}
                style={{ top: 0, left: 0 }}
              >
                <View
                  style={{
                    ...backRingStyle,
                    ...{
                      width: transformSize(size - 1 - 2 * lineWidth),
                      height: transformSize(size - 1 - 2 * lineWidth),
                      borderRadius: '50%',
                      border: `${transformSize(
                        lineAdjust + lineWidth,
                      )} solid ${backRingColor}`,
                    },
                  }}
                ></View>
              </View>
              <Canvas
                type="2d"
                style={{
                  width: transformSize(size),
                  height: transformSize(size),
                  zIndex: '5',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
                id={this.id}
                canvasId={this.canvasId}
              ></Canvas>
            </View>
          </View>
        </VerticalBox>
      </HorizontalCenterBox>
    );
  }
}

Circle.defaultProps = {
  ...defaultProps,
};

export default Circle;
