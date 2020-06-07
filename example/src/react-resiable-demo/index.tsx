import React, { ReactElement } from 'react'
import { Resizable, ResizableBox } from 'react-resizable'
import './index.scss'
import { Button, Tabs } from 'antd'

const { TabPane } = Tabs

export interface IResizableState{
    width: number;
    height: number;
}

class TestLayout extends React.Component<{}, IResizableState> {
    constructor(props) {
        super(props)
        this.state = { 
            width: 200, 
            height: 200 
        }
    }

    onClick = (): void => {
        this.setState({ width: 200, height: 200 })
    };

    onResize = (event, { element, size, handle }): void => {
        console.log('%c 🥦 handle: ', 'font-size:20px;background-color: #B03734;color:#fff;', handle)
        console.log('%c 🍮 element: ', 'font-size:20px;background-color: #6EC1C2;color:#fff;', element)
        this.setState({ width: size.width, height: size.height })
    };

    render(): ReactElement{
        const { height, width } = this.state
        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="Resizable" key="1" className="tab1">
                    <div className="first-box">
                        <Resizable
                            className="box" 
                            height={height}
                            width={width}
                            axis="x"
                            onResize={this.onResize}
                            resizeHandles={['e']}
                            minConstraints={[150, 700]}
                            maxConstraints={[500, 700]}
                        >
                            <div style={{ width: `${width}px`, height: '100%', backgroundColor: 'orange' }}>
                                <Button onClick={this.onClick} style={{ marginBottom: '10px' }}>
                                    Reset first s width/height
                                </Button>
                                <span className="text">{'Raw use of <Resizable> element. min:150,max:500, all Resize Handles.'}</span>
                            </div>
                        </Resizable>
                        <div className="rest-box box" style={{ backgroundColor: 'pink' }}>
                            rest-box
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="handle" key="2" className="tab-box tab2">
                    <div>
                        <ResizableBox className="box" style={{ backgroundColor: 'pink' }} width={200} height={200}>
                            <span className="text">{'<ResizableBox>'}</span>
                        </ResizableBox>
                        <ResizableBox
                            className="custom-box box"
                            width={200}
                            height={200}
                            handle={<span className="custom-handle custom-handle-se" />}
                            handleSize={[8, 8]}
                        >
                            <span className="text">{'<ResizableBox> with custom handle in SE corner.'}</span>
                        </ResizableBox>
                        <ResizableBox
                            className="custom-box box"
                            width={200}
                            height={200}
                            handle={(h): ReactElement => <span className={`custom-handle custom-handle-${h}`} />}
                            handleSize={[8, 8]}
                            resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}
                        >
                            <span className="text">{'<ResizableBox> with custom handles in all locations.'}</span>
                        </ResizableBox>
                        
                    </div>
                </TabPane>
                <TabPane tab="grid min max" key="3" className="tab-box tab3">
                    <>
                        <ResizableBox className="box" width={200} height={200} draggableOpts={{ grid: [25, 25] }}>
                            <span className="text">Resizable box that snaps to even intervals of 25px.</span>
                        </ResizableBox>
                        <ResizableBox className="box" width={200} height={200} minConstraints={[150, 150]} maxConstraints={[500, 300]}>
                            <span className="text">Resizable box, starting at 200x200. Min size is 150x150, max is 500x300.</span>
                        </ResizableBox>
                        <ResizableBox className="box box3" width={200} height={200} minConstraints={[150, 150]} maxConstraints={[500, 300]}>
                            <span className="text">Resizable box with a handle that only appears on hover.</span>
                        </ResizableBox>
                    </>
                </TabPane>
                <TabPane tab="aspectRatio" key="4" className="tab-box tab4">
                    <>
                        <ResizableBox className="box" width={200} height={200} lockAspectRatio>
                            <span className="text">Resizable square with a locked aspect ratio.</span>
                        </ResizableBox>
                        <ResizableBox className="box" width={200} height={120} lockAspectRatio>
                            <span className="text">Resizable rectangle with a locked aspect ratio.</span>
                        </ResizableBox>
                    </>
                </TabPane>
                <TabPane tab="axis" key="5" className="tab-box tab5">
                    <>
                        <ResizableBox className="box" width={200} height={200} axis="x">
                            <span className="text">Only resizable by x axis.</span>
                        </ResizableBox>
                        <ResizableBox className="box" width={200} height={200} axis="y">
                            <span className="text">Only resizable by y axis.</span>
                        </ResizableBox>
                        <ResizableBox className="box" width={200} height={200} axis="both">
                            <span className="text">Resizable (both axis).</span>
                        </ResizableBox>
                        <ResizableBox className="box" width={200} height={200} axis="none">
                            <span className="text">Not resizable (none axis).</span>
                        </ResizableBox>
                    </>
                </TabPane>
            </Tabs>
        )
    }
}

export default TestLayout
