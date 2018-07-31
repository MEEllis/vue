import React from 'react'
import {
    IndexRedirect,  // 用于访问根路由的时候，将用户重定向到另一个路由。
    Link,           // 用于取代 `<a>` 元素，生成一个连接，允许用户点击后跳转到另一个路由。
    IndexLink,      // 用于连接到跟路由。
} from 'react-router';
import '../less/pageServerError'

const PageServerError = (props) => (
    <div className='pageServerError'>
        <div className='pageTop'></div>
        <div className='pageHint'>
            <p>
                <span>500</span>
                哎呀~ 出错呐~
            </p>
            <h4>请检查输入网址是否正确或者服务器报错</h4>
        </div>

    </div>
)

export default PageServerError
