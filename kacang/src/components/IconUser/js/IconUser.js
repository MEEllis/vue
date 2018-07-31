import React from 'react'
import {Tooltip} from 'antd'
import Icon, {
    iEdit,
    iEnabled,
    iSetting,
    iDisabled,
} from '../../Icon/js/Icon'
import '../less/iconUser'


let IconUser = React.createClass({

    render(){
        const {props} =  this;
        const {title,click,glyphIcon} = props;
        return(
            <div className = 'IconUser'>
                <Tooltip title={title} arrowPointAtCenter>
                    <a href="javascript:;" onClick={click}>
                        <Icon glyph={glyphIcon} />
                    </a>
                </Tooltip>
            </div>

        )
    }
})



export default IconUser;
