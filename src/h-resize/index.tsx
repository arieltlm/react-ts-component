import React, { ReactElement } from 'react'
import * as PropTypes from 'prop-types'
import _ from 'lodash'
import { IHResizeState, IHResizeProps, IDOMInfoObj } from './interface'
import './index.scss'

class ResizeDiv extends React.Component<IHResizeProps, IHResizeState> {
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

    resizeDivRef: React.RefObject<HTMLDivElement>

    resizeOffsetInfo: IDOMInfoObj;

    containerWidth: any

    constructor(props: Readonly<IHResizeProps>) {
        super(props)
        this.state = {
            isVResize: false,
            isResizeStart: false,
            vNum: props.vNumInit
        }

        this.resizeOffsetInfo = {
            clientTop: 0,
            clientLeft: 0
        }
        this.resizeDivRef = React.createRef()
    }

    componentDidMount(): void {
        this.initResizeInfo()
        window.addEventListener('resize', _.debounce(this.initResizeInfo, 500))
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.initResizeInfo)
    }

    /**
     * 获取元素的偏移信息
     */
    getEleOffset = (ele: HTMLElement): IDOMInfoObj => {
        let clientTop = ele.offsetTop
        let clientLeft = ele.offsetLeft
        let current = ele.offsetParent
        while (current !== null) {
            clientTop += current.offsetTop
            clientLeft += current.offsetLeft
            current = current.offsetParent
        }
        return {
            clientTop,
            clientLeft,
            width: ele.offsetWidth
        }
    };

    /**
     * 初始化resize信息
     */
    initResizeInfo = (): void => {
        const hEle = this.resizeDivRef.current as HTMLElement
        if (hEle) {
            this.resizeOffsetInfo = this.getEleOffset(hEle)
            this.containerWidth = this.resizeOffsetInfo.width
        }

        const { onResizeStart } = this.props
        const { vNum } = this.state
        onResizeStart(vNum)
    };

    /**
     * 开始拖动垂直调整块
     */
    vResizeDown = (): void => {
        const { isResizeStart } = this.state
        const { vNumInit } = this.props

        if (!isResizeStart) {
            this.setState({
                vNum: vNumInit
            })
        }
        this.setState({
            isVResize: true,
            isResizeStart: true
        })
        const { onResizeStart } = this.props
        const { vNum } = this.state
        onResizeStart(vNum)
    };

    /**
     * 拖动垂直调整块
     */
    vResizeOver = (e: { clientX: number }): void => {
        const { isVResize, vNum } = this.state
        const { vNumLeftLimit, vNumRightLimit } = this.props
        const { containerWidth } = this
        if (isVResize && vNum >= vNumLeftLimit && containerWidth - vNum >= vNumRightLimit) {
            let newValue = e.clientX - this.resizeOffsetInfo.clientLeft
            // 左边最小宽度
            if (newValue < vNumLeftLimit) {
                newValue = vNumLeftLimit
            }
            // 右边最小宽度
            if (containerWidth - newValue < vNumRightLimit) {
                newValue = containerWidth - vNumRightLimit
            }
            if (newValue > containerWidth - vNumLeftLimit) {
                newValue = containerWidth - vNumLeftLimit
            }
            this.setState({
                vNum: newValue
            })
        }
    };

    /**
     * 只要鼠标松开或者离开区域，那么就停止resize
     */
    stopResize = (): void => {
        this.setState({
            isVResize: false
        })

        const { onResizeStop } = this.props
        const { vNum } = this.state
        onResizeStop(vNum)
    };


    render(): ReactElement {
        const { isVResize, vNum, isResizeStart } = this.state
        const { vNumInit, leftDiv, rightDiv, vMidWidth, midHandlerClassName } = this.props
        const vNumVal = isResizeStart ? vNum : vNumInit
        const hCursor = isVResize ? 'col-resize' : 'default'
        return (
            <div
                className="hresize-container"
                role="presentation"
                ref={this.resizeDivRef}
                onMouseUp={this.stopResize}
                onMouseMove={this.vResizeOver}
                onMouseLeave={this.stopResize}
            >
                <div
                    style={{ width: vNumVal, cursor: hCursor, }}
                    className="hresize-left"
                >
                    {leftDiv}
                </div>
                <div
                    role="presentation"
                    style={{ left: vNumVal, width: vMidWidth }}
                    draggable={false}
                    onMouseDown={this.vResizeDown}
                    className={`h-resize ${isVResize && midHandlerClassName}`}
                />
                <div
                    style={{ left: vNumVal + vMidWidth, cursor: hCursor, }}
                    className="hresize-right"
                >
                    {rightDiv}
                </div>
            </div>
        )
    }
}


export default ResizeDiv
