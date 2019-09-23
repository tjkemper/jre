import L from 'react-loadable';
import JreLoading from './JreLoading';

const JreLoadable = opts =>
  L({
    loading: JreLoading,
    delay: 300,
    ...opts
  });

export default JreLoadable;
