import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

const Master = (): ReactElement => (
    <div className="master-container">
        <ul>
            {/* <li><Link to="/basic">Basic Example</Link></li> */}
            <li><Link to="/table">table</Link></li>
        </ul>
    </div>
)

export default Master
