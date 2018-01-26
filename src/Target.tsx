import * as React from 'react'

export interface ITargetChildProps {
  targetProps: {
    ref: React.Ref<any>
  };
}

export interface ITargetProps {
  componentFactory: (props: ITargetChildProps) => React.ReactNode,
}

export class Target extends React.Component<ITargetProps> {
  render() {
    
  const { component = 'div', innerRef, children, ...restProps } = this.props
  const { popperManager } = this.context;
  const targetRef = node => {
    popperManager.setTargetNode(node)
    if (typeof innerRef === 'function') {
      innerRef(node)
    }
  }

  if (typeof children === 'function') {
    const targetProps = { ref: targetRef }
    return children({ targetProps, restProps })
  }

  const componentProps = {
    ...restProps,
  };

  if (typeof component === 'string') {
    componentProps.ref = targetRef;
  } else {
    componentProps.innerRef = targetRef;
  }

  return React.createElement(component, componentProps, children);
  }
}