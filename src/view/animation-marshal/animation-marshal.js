// @flow
import invariant from 'tiny-invariant';
import type { BoxModel } from 'css-box-model';
import type { Placeholder } from '../../types';
import { prefixDataAttribute } from '../data-attributes';
import getHead from '../dom-node/util/get-head';
import createStyleElement from '../dom-node/util/create-style-element';

const full = (box: BoxModel): string => `
  height: ${box.borderBox.height}px;
  width: ${box.borderBox.width}px;
  margin-top: ${box.margin.top}px;
  margin-right: ${box.margin.right}px;
  margin-bottom: ${box.margin.bottom}px;
  margin-left: ${box.margin.left}px;
`;

const empty: string = `
  height: 0px;
  width: 0px;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
`;

const getAnimations = (context: string, placeholder: Placeholder): string => `
  @keyframes in-${context} {
    from {
      ${empty}
    }

    to {
      ${full(placeholder.client)}
    }
  }

  @keyframes out-${context} {
    from {
      ${full(placeholder.client)}
    }

    to {
      ${empty}
    }
  }
`;

export default (styleContext: string) => {
  let el: ?HTMLStyleElement = null;

  // exposing this as a seperate step so that it works nicely with
  // server side rendering
  const mount = () => {
    invariant(!el, 'Animation marshal already mounted');

    el = createStyleElement();
    // for easy identification
    el.setAttribute(prefixDataAttribute('animation'), styleContext);

    // add style tags to head
    getHead().appendChild(el);
  };

  const unmount = (): void => {
    invariant(
      el,
      'Cannot unmount animation marshal as it is already unmounted',
    );

    // Remove from head
    getHead().removeChild(el);
    // Unset
    el = null;
  };

  const setPlaceholder = (placeholder: Placeholder) => {
    invariant(el, 'Animation marshal must be mounted to set placeholder');

    el.innerHTML = getAnimations(styleContext, placeholder);
  };

  const marshal: AnimationMarshal = {
    setPlaceholder,
    mount,
    unmount,
  };

  return marshal;
};
