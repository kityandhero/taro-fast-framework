import { ComponentBase } from 'taro-fast-common/es/customComponents';

const defaultProps = {};

class BaseComponent extends ComponentBase {
  // eslint-disable-next-line no-unused-vars
  adjustShowRenderCountInConsole = (nextProps, nextState) => {
    {
      const { showRenderCount } = nextProps;

      this.showRenderCountInConsole = !!showRenderCount || false;
    }
  };
}

BaseComponent.defaultProps = {
  ...ComponentBase.defaultProps,
  ...defaultProps,
};

export default BaseComponent;
