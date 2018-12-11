// @flow

export type DomNodeInterface = {
  unmount: () => void,
};

export type DomNode = () => DomNodeInterface;
