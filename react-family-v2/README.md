我目前项目里将组件分为 展示组件components,控件controls，管理组件（容器，连接=.=组件）containers，和路由组件routes

components 定义为无状态的用来组合组件的纯函数形式
controls 定义为自有状态，生命周期，控制自身渲染的类形式
containers 定义为连接数据，负责管理调用复用级别组件，并和其他containers通信
routes 就是特殊的containers，和路由有着一对一的映射关系，无法复用
注意的是containers的属性只传递于props，不允许存在state，它可以从redux里，父级别组件，defaultPorps接受数据
containers负责渲染（调用）展示组件，数据可以来自于model和state，其实不管是setState还是dispatch本质都是一样的，可以相互转换，建议一些非组件共享的数据建议放在state里，可能不那么直观但是减少了代码量，还有异步数据建议放到model里，发挥dva的对异步数据的操控优势，但是有的时候页面上存在大量依赖异步数据的组件，我建议还是使用controls，也是为了减少代码量

除了routes，其他都具有天然的复用属性，将不同层级的特性封装，依次是组合关系