import React from 'react'
import PopperJs from 'popper.js'
import Tooltip from '@material-ui/core/Tooltip'

export default function ValueLabelComponent(props: any) {
    const { children, open, value } = props;

    const popperRef = React.useRef<PopperJs | null>(null);
    React.useEffect(() => {
        if (popperRef.current) {
            popperRef.current.update();
        }
    });

    return (
        <Tooltip
            PopperProps={{
                popperRef,
            }}
            open={open}
            enterTouchDelay={0}
            placement="top"
            title={value}
        >
            {children}
        </Tooltip>
    );
}