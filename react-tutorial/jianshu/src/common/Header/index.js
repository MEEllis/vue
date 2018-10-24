import React,{Component}  from 'react'
import {connect} from 'react-redux'
import { CSSTransition } from 'react-transition-group';
import {searchFocus,searchBlur,requestSearchList} from './store/acitonCreators'
import {HeaderWrapper,Logo,Nav,NavItem,NavSearch,Addition,Button,SearchWrapper,SearchInfo,SearchInfoTitle
    ,SearchInfoSwitch,SearchInfoItem} from './style'

class Header extends Component{
    render(){
        return (
            <HeaderWrapper>
                <Logo/>
                <Nav>
                    <NavItem className='left active'>首页</NavItem>
                    <NavItem className='left'>下载App</NavItem>
                    <NavItem className='right'>登录</NavItem>
                    <NavItem className='right'><i className='iconfont icon-Aa'></i></NavItem>
                    <SearchWrapper>
                        <CSSTransition
                            in={this.props.inputIsFocused}
                            timeout={200}
                            classNames='slide'
                            >
                                <NavSearch
                                    className={this.props.inputIsFocused?'focused':''}
                                    onFocus={this.props.handleInputFocus}
                                    onBlur={this.props.handleInputBlur}
                                /> 
                        </CSSTransition>
    
                        <i className={this.props.inputIsFocused?'iconfont icon-search focused':'iconfont icon-search'}/>
                        <SearchInfo className={this.props.inputIsFocused?'show':'hide'}>
                            <SearchInfoTitle>热门搜索
                                <SearchInfoSwitch>换一批</SearchInfoSwitch>
                            </SearchInfoTitle>
                           { this.getSearchList()}
                        </SearchInfo>
                    </SearchWrapper>
                </Nav>
                <Addition>
                    <Button className='writting'><i className='iconfont icon-weibiaoti1'></i>写文章</Button>
                    <Button className='red'>注册</Button>
                </Addition>
            </HeaderWrapper>
        )
    }

    getSearchList(){
        const {searchList} =this.props;
        return (
            <div >
                 {searchList.map((item,index)=>{
                return (
                    <SearchInfoItem key={item}>{item}</SearchInfoItem> 
                )
            })}
            </div>
          
        )
    }
}    


const mapStateToProps=(state)=>{
    return {
        inputIsFocused:state.get('header').get('inputIsFocused'),
        searchList:state.get('header').get('searchList'),
    }
}
const mapDispathToProps=(dispath)=>{
    return {
        handleInputFocus(){
            const action=searchFocus()
            const actionSearchList= requestSearchList()
            dispath(actionSearchList)
            dispath(action)
        },
        handleInputBlur(){
            const action=searchBlur()
            dispath(action)
        }
    }
}

export default connect(mapStateToProps,mapDispathToProps)(Header)