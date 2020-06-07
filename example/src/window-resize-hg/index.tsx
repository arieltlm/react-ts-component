import React from 'react'
import { Button, Input } from 'antd'
import PropTypes from 'prop-types'
import { WindowResizeHg } from '../../../src'
import './index.scss'

const { Search } = Input

export interface IResizeHgProps{
    divHeight: number;
}

const navHg = 64
const paddingHg = 24 + 24
const btnGroupHg = 32 + 24
const otherHg = navHg + paddingHg + btnGroupHg

const resizeHgTest: React.FC<IResizeHgProps> = ({
    divHeight
}) => (
    <div className="resize-hg-box">
        <div className="btn-group">
            <Button>新增</Button>
            <Search />
        </div>
        <div className="resize-box" style={{ height: divHeight }}>
            height change by window resize
        </div>
    </div>
)

resizeHgTest.propTypes = {
    divHeight: PropTypes.number.isRequired
}

export default WindowResizeHg(resizeHgTest, otherHg)
