<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = path+"/YSHomePage";
%>
<jsp:include  page="include/head.jsp"/>
    <link rel="stylesheet" href="<%=basePath%>/css/legalDeclaration.css"/>
    <title>法律声明</title>
</head>
<body>
<jsp:include  page="include/navbar.jsp"/> 
<div id="ld" class="lg-container">
    <h3>法律声明</h3>
    <p>规则及云盛软件网址访问条件</p>
    <span>以下规则适用于所有访问本网站的用户或浏览者，云盛联达信息技术有限公司（"云盛软件"）保留随时修改这些规则的权利。访问本网站的权利由云盛软件根据下列条款授予。如果您不同意下列任何条款、请停止使用本网址。对于违反这些规则的行为，云盛软件有权采取法律和公平的补救措施。</span>
    <br/><br/>
    <p>不承诺责任声明</p>
    <span>本网站所载的材料和信息，包括但不限于文本、图片、数据、观点、建议、网页或链路，虽然云盛软件力图在网站上提供准确的材料和信息，但云盛软件并不保证这些材料和内容的准确、完整、充分和可靠性，并且明确声明不对这些材料和内容的错误或遗漏承担责任，也不对这些材料和内容作出任何明示或默示的、包括但不限于有关所有权担保、没有侵犯第三方权利、质量和没有计算机病毒的保证。</span>
   <br/>
   <br/>
    <span>
   	 云盛软件可以在没有任何通知或提示的情况下随时对本网站上的内容进行修改，为了得到最新版本的信息，请定时访问本网站。云盛软件在本网站上所提及的非云盛软件产品或服务仅仅是为了提供相关信息，并不构成对这些产品、服务的认可或推荐。
    </span>
    <br/><br/>
    <p>著作权说明</p>
    <span>本网站所载的所有材料或内容受版权法的保护，所有版权由云盛软件拥有，但注明引用其他方的内容除外。未经云盛软件或其他方事先书面许可，任何人不得将本网站上的任何内容以任何方式进行复制、经销、翻印、播放、以超级链路连接或传送、以"镜像法"载入其他服务器上、存储于信息检索系统或者其他任何商业目的的使用，但对于非商业目的的、个人使用的下载或打印（条件是不得修改，且须保留该材料中的版权说明或其他所有权的说明）除外。</span>
    <br/><br/>
    <p>商标</p>
    <span>云盛软件网站上使用和显示的所有商标、标志皆属云盛软件所有，但注明属于其他方拥有的商标、标志、商号除外。云盛软件网站所载的任何内容不应被视作未经云盛软件或其他方书面许可，以暗示、不反对或其他形式授予使用前述任何商标、标志的许可或权利。未经事先书面许可，任何人不得以任何方式使用云盛软件名称及云盛软件的商标、标记。</span>
</div>
<jsp:include  page="include/foot.jsp"/> 



