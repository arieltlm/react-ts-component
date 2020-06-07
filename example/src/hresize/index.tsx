import React, { ReactElement } from 'react'
import { HResize } from '../../../src'
import './index.scss'

const leftDiv = (
    <div className="left child-box">
        <div>left box</div>
        <div>min-width:100</div>
    </div>
)
const rightDiv = (
    <div className="right child-box">
        <div>right box</div>
        <div>min-width:300</div>
    </div>
)


class Table extends React.Component<{}, {}>{
    constructor(props) {
        super(props)
        this.state = {
           
        }
    }
    
    onResizeStop = (leftWidth): void => {
        console.log('====onResizeStop: ', leftWidth)
    }

    onResizeStart = (leftWidth): void => {
        console.log('===== onResizeStart: ', leftWidth)
    }

    render(): ReactElement{
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
}


export default Table
