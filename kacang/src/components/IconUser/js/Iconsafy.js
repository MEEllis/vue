import React from 'react'
import Icon, {
    password,
    cellphone,
    hardware,
    wechat,
    ip,
} from '../../Icon/js/Icon'
import '../less/iconUser.less'


let Iconsafy = React.createClass({

    render(){
         const {props} =  this;
         const {glyphIcon} = props;
        return(
                  <i>
                      <Icon glyph={glyphIcon} />
                  </i>
        )
    }
})



export default Iconsafy;
