import styled from 'styled-components'
import logoPic from '../../statics/nav-logo.png'

export const HeaderWrapper = styled.div`
    height:58px;
    background-color: #fff;
    border-bottom: 1px solid #f0f0f0;
    position:retative;
`

export const Logo = styled.a.attrs({
        href:'/'
    })`
    position:absolute;
    width:100px;
    height:50px;
    top:0;
    left:0;
    background:url(${logoPic});
    background-size:contain;
`

export const Nav = styled.div`
    width:980px;
    height:100%;
    margin:0 auto;
`

export const NavItem = styled.div`
    line-height:56px;
    padding:0 15px;
    font-size:17px;
    color:#333;

    &.left{
        float:left;
    }

    &.right{
        float:right;
        color: #969696;
    }

    &.active{
        color: #ea6f5a;
    }
`

export const SearchWrapper = styled.div`
  position:relative;
  float:left;
  .icon-search{
      position:absolute;
      right:5px;
      bottom:5px;
      width:30px;
      line-height:30px;
      border-radius:15px;
      text-align:center;
      &.focused{
        background:#777;
        color:#fff;
    }
  }
`

export const NavSearch = styled.input.attrs({
    placeholder:'搜索'
})`
    width:160px;
    height:38px;
    padding:0 30px 0 20px;
    margin-top:9px;
    margin-left:20px;
    box-sizing:border-box;
    border:0;
    outline:0;
    border-radius:19px;
    font-size:14px;
    background:#eee;
    color:#666;
    &::placeholder{
        color:#999;
    }

    &.focused{
        width:240px;
    }
    &.slide-enter{
        transition:all .2s ease-out;
    }
    
    &.slide-enter-active{
    width:240px;
    }
    
    &.slide-exit{
    transition:all .2s ease-out;
    }

    &.slide-exit-active{
    width:160px;
    }
`
export const SearchInfo = styled.div`
  position:absolute;
  left:0px;
  top:56px;
  width:240px;
  padding:0 20px;
  box-shadow: 0 0 8px rgba(0,0,0,.2);
`
export const SearchInfoTitle = styled.div`
 margin-top:20px;
 margin-bottom:15px;
 line-height:20px;
 font-size:14px;
 color:#969696;
`

export const SearchInfoSwitch = styled.span`
    float:right;
    font-size:13px;
`

export const SearchInfoItem = styled.a`
    display:block;
    float:left;
    line-height:20px;
    padding:0 5px;
    margin:0 10px 15px 0px;
    font-size:12px;
    border:1px solid #ddd;
    color:#787878; 
    border-radius:3px;
`
export const Addition = styled.div`
    position:absolute;
    top:0;
    right:0;
    height:56px;
`
export const Button = styled.div`
    float:right;
    height:38px;
    line-height:38px;
    padding:0 20px;
    margin-top:9px;
    margin-left:20px;
    border-radius:19px;
    border:1px solid #ea6f5a;
    font-size:14px;
    &.red{
        color:#ea6f5a;
    }
    &.writting{
        color:#fff;
        background:#ea6f5a;
    }
`