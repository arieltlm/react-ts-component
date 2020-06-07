import React, { useState, useEffect, ReactElement } from 'react'
import PropTypes from 'prop-types'

export interface IResizeHeightProps {
    [propertys: string]: any;
}

const WindowResizeHeight = (WapperComponent, otherHeight: number): React.FC<IResizeHeightProps> => function ({
    ...other
}): ReactElement { 
    const [divHeight, setDivHeight] = useState(100)
    useEffect(() => {
        const handleWindowResize = (): void => {
            const bodyHeight = document.body.clientHeight
            const height = bodyHeight - otherHeight
            setDivHeight(height)
        }
        handleWindowResize()

        window.addEventListener('resize', handleWindowResize)

        return (): void => {
            window.removeEventListener('resize', handleWindowResize)
        }
    })
    return (
        <WapperComponent
            divHeight={divHeight} 
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...other} 
        />
    )
}

WindowResizeHeight.propTypes = {
    otherHeight: PropTypes.number.isRequired
}

export default WindowResizeHeight
