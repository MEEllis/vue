import React from 'react'
import {
    IndexRedirect,  // 用于访问根路由的时候，将用户重定向到另一个路由。
    Link,           // 用于取代 `<a>` 元素，生成一个连接，允许用户点击后跳转到另一个路由。
    IndexLink,      // 用于连接到跟路由。
} from 'react-router';
import '../less/pageNotFound'

const PageNotFound = (props) => (
    <div className = 'notFound'>
        <div className = 'notFoundPics'></div>
        <div className = 'notFoundHint'>
            <h3>抱歉，您访问的页面没找到</h3>
            <p>· 该页面可能已经删除或更名，请返回首页或搜索查找 / · 检查输入的地址是否正确，或稍后再试</p>
        </div>
        <div className='notFoundBtn'>
            <Link to='/' className='notFoundA'/>
        </div>
    </div>
)

export default PageNotFound
