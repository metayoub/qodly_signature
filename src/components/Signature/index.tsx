import config, { ISignatureProps } from './Signature.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './Signature.build';
import Render from './Signature.render';

const Signature: T4DComponent<ISignatureProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

Signature.craft = config.craft;
Signature.info = config.info;
Signature.defaultProps = config.defaultProps;

export default Signature;
