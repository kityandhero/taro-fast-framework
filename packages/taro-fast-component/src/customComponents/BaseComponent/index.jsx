import { ComponentBase } from 'taro-fast-common/es/customComponents';

const defaultProps = {};

class BaseComponent extends ComponentBase {}

BaseComponent.defaultProps = {
  ...ComponentBase.defaultProps,
  ...defaultProps,
};

export default BaseComponent;
