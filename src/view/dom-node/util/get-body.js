// @flow
import invariant from 'tiny-invariant';

export default (): HTMLBodyElement => {
  invariant(document.body, 'Cannot find document.body');
  return document.body;
};
