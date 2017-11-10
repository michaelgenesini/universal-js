const utils = {

  ChildrenWithProps: (chidren, props) => React.Children.map(chidren, child => React.cloneElement(child, {...props}))

}