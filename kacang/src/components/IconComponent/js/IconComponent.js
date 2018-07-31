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


let IconComponent = React.createClass({
    getInitialState(){
        return {
            title:this.props.title
        }
    },
    show(){
        this.setState({
            title:'尚未开通该权限，请联系管理员'
        })
    },
    onMouseLeave(){
        setTimeout(()=>{
            this.setState({
                title:this.props.title
            })
        },200)
    },
    render(){
        const {title,click,glyphIcon,disabled} = this.props;
        return(
            <div className = 'IconCompont'>
                {
                    !!disabled?
                    <Tooltip title={title} arrowPointAtCenter onMouseLeave={this.onMouseLeave}>
                            <span className="disabled" onClick={this.show}>
                                <Icon glyph={glyphIcon}/>
                            </span>
                    </Tooltip>
                    :
                    <Tooltip title={title} arrowPointAtCenter>
                        <a href="javascript:;" onClick={click}>
                            <Icon glyph={glyphIcon} />
                        </a>
                    </Tooltip>
                }
            </div>
        )
    }
})



export default IconComponent;
