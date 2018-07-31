import React from 'react'
import {Tooltip} from 'antd'
import Icon, {
    iDelete,
    iPost,
    iPostTo,
    iEdit,

} from '../../Icon/js/Icon'
import '../../CardType/less/cardType.less'
import '../less/iconComponent'


let IconComponentNotClick = React.createClass({

    render(){
        const {props} =  this;
        const {title,click,glyphIcon,color} = props;

        return(
            <div className = 'IconCompontNotClick'>
                <Tooltip title={title} arrowPointAtCenter>
                    <a href="javascript:;" onClick={click}>
                        <Icon className={color+' '+'icon'} glyph={glyphIcon} />
                    </a>
                </Tooltip>
            </div>

        )
    }
})



export default IconComponentNotClick;
