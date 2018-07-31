//////////////////////////////
// HTML 编码
//////////////////////////////

export function htmlEncode(text) {
    return text.replace(/[<>&"']/g, function (match, pos, originalText) {
        return {
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
            '\"': '&quot;',
            '\'': '&apos;',
        }[match];
    });
}


//////////////////////////////
// 使用示例
//////////////////////////////

// htmlEncode('<p class="greeting">Hello world!</p>')
// => &lt;p class=&quot;greeting&quot;&gt;Hello world!&lt;/p&gt;
