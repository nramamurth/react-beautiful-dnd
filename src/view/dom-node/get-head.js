// @flow
import invariant from 'tiny-invariant';

export default (): HTMLHeadElement => {
  const head: ?HTMLHeadElement = document.head;
  invariant(head, 'Cannot find document.head');
  return head;
};
