import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Route, Switch, Redirect, withRouter, NavLink } from 'react-router-dom'

import Master from '../master'
import Table from '../table'
import HResizeBox from '../hresize'
import ReactResiableDemo from '../react-resiable-demo'
import WindowResizeHg from '../window-resize-hg'

import './index.scss'

const Root = (props): React.ReactElement => {
    const { match: { url } } = props

    return (
        <div className="root-container">
            <ul className="nav-box">
                <li>
                    <NavLink to="/home" activeClassName="active">首页</NavLink>
                </li>
                <li>
                    <NavLink to="/table" activeClassName="active">表格</NavLink>
                </li>
                <li>
                    <NavLink to="/hresize" activeClassName="active">resize-box</NavLink>
                </li>
                <li>
                    <NavLink to="/react-resize" activeClassName="active">react-resiable</NavLink>
                </li>
                <li>
                    <NavLink to="/window-resize-hg" activeClassName="active">window-resize-hg</NavLink>
                </li>
            </ul>
            <div className="main-content">
                <Switch>
                    <Route path="/home" component={Master} />
                    <Route path="/table" component={Table} />
                    <Route path="/hresize" component={HResizeBox} />
                    <Route path="/react-resize" component={ReactResiableDemo} />
                    <Route path="/window-resize-hg" component={WindowResizeHg} />
                    <Route path={url} exact render={(): React.ReactNode => <Redirect to="/hresize" />} />
                </Switch>
            </div>
        </div>
    )
}

Root.propTypes = {
    match: PropTypes.object.isRequired
}

export default withRouter(Root)
