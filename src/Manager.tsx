import * as React from 'react';
import Popper from "popper.js";

export interface IManagerProps {
 tag: string
} 

export class Manager extends React.Component<IManagerProps> {
  static childContextTypes = {
    popperManager: Popper
  }

  static defaultProps = {
    tag: 'div',
  }

  private _targetNode: React.ReactNode;

  getChildContext() {
    return {
      popperManager: {
        setTargetNode: this._setTargetNode,
        getTargetNode: this._getTargetNode,
      },
    }
  }

  _setTargetNode = (node: React.ReactNode) => {
    this._targetNode = node
  }

  _getTargetNode = () => {
    return this._targetNode
  }

  render() {
    const { tag, children, ...restProps } = this.props
    if (tag !== null) {
      return React.createElement(tag, restProps, children)
    } else {
      return children
    }
  }
}
