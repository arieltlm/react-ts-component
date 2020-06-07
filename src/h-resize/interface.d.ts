import { ReactNode } from 'react'

export interface IHResizeState{
    isVResize: boolean;
    isResizeStart: boolean;
    vNum: number;
}

export interface IHResizeProps{
    vNumInit: number;
    leftDiv: ReactNode;
    rightDiv: ReactNode;
    vNumLeftLimit: number;
    vNumRightLimit: number;
    vMidWidth: number;
    onResizeStart: function;
    onResizeStop: function;
    midHandlerClassName?: string;
}

export interface IDOMInfoObj {
    clientTop: number;
    clientLeft: number;
    width?: number;
}
