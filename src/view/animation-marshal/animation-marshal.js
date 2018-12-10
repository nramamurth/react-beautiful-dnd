// @flow
import memoizeOne from 'memoize-one';
import invariant from 'tiny-invariant';
import getStyles, { type Styles } from './get-styles';
import { prefix } from '../data-attributes';
import type { StyleMarshal } from './style-marshal-types';
import type { DropReason } from '../../types';

let count: number = 0;

// Required for server side rendering as count is persisted across requests
export const resetStyleContext = () => {
  count = 0;
};

const getHead = (): HTMLHeadElement => {
  const head: ?HTMLHeadElement = document.querySelector('head');
  invariant(head, 'Cannot find the head to append a style to');
  return head;
};

const createStyleEl = (): HTMLStyleElement => {
  const el: HTMLStyleElement = document.createElement('style');
  el.type = 'text/css';
  return el;
};

export default () => {
  const context: string = `${count++}`;
  const styles: Styles = getStyles(context);
  const el: ?HTMLStyleElement = null;

  // using memoizeOne as a way of not updating the innerHTML
  // unless there is a new value required
  const setStyle = memoizeOne((proposed: string) => {
    invariant(el, 'Cannot set style of style tag if not mounted');
    // This technique works with ie11+ so no need for a nasty fallback as seen here:
    // https://stackoverflow.com/a/22050778/1374236
    el.innerHTML = proposed;
  });

  // exposing this as a seperate step so that it works nicely with
  // server side rendering
  const mount = () => {
    invariant(!el, 'Animation marshal already mounted');

    el = createStyleEl();
    el.setAttribute(prefix('animation'), context);

    // add style tags to head
    getHead().appendChild(el);
  };

  const unmount = (): void => {
    invariant(
      el,
      'Cannot unmount annoucement marshal as it is already unmounted',
    );

    // Remove from head
    getHead().removeChild(el);
    // Unset
    el = null;
  };

  const setProp

  const marshal: AnimationMarshal = {
    styleContext: context,
    mount,
    unmount,
    setProperties,
  };

  return marshal;
};
