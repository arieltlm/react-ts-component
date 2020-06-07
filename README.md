# HResize

本组件实现左右两个div的伸缩处理。

## Installation

使用npm：

```shell
$ npm i h-resize
```

## Usage
Import:

```jsx
import Hresize from 'h-resize';
```

Render in your component:

```jsx
render() {
    // ...
    return (
        <div className="hresize-box">
            <HResize 
                leftDiv={leftDiv}
                rightDiv={rightDiv}
                vNumInit={300}
                vNumLeftLimit={100}
                vNumRightLimit={300}
                vMidWidth={1}
                midHandlerClassName="mid-mouse"
                onResizeStop={this.onResizeStop}
                onResizeStart={this.onResizeStart}
            />
        </div>
    )
}
```

## API
**参数：**

```tsx
/**
* leftDiv 左边元素
* rightDiv 右边元素
* vNumInit 左边元素的初始宽度
* vNumLeftLimit 左边最小宽度
* vNumRightLimit 右边最小宽度
* vMidWidth 中间的拖拽区宽度
* midHandlerClassName 中间拖拽时的类
* onResizeStart 开始拖拽的回调
* onResizeStop  结束拖拽的回调
*/
static propTypes = {
    vNumInit: PropTypes.number.isRequired,
    leftDiv: PropTypes.element.isRequired,
    rightDiv: PropTypes.element.isRequired,
    vNumLeftLimit: PropTypes.number,
    vNumRightLimit: PropTypes.number,
    vMidWidth: PropTypes.number,
    midHandlerClassName: PropTypes.string,
    onResizeStart: PropTypes.func,
    onResizeStop: PropTypes.func
}

static defaultProps = {
    vNumLeftLimit: 30,
    vNumRightLimit: 30,
    vMidWidth: 4,
    midHandlerClassName: '',
    onResizeStart: (): void => {},
    onResizeStop: (): void => {}
}
```

## Keywords

horizontal, resize
