//////////////////////////////
// HTML 解码
//////////////////////////////

export function htmlDecode(text) {
    return text.replace(/&(lt|gt|amp|quot|apos|nbsp);/g, function (match, pos, originalText) {
        return {
            '&lt;': '<',
            '&gt;': '>',
            '&amp;': '&',
            '&quot;': '\"',
            '&apos;': '\'',
            '&nbsp;': ' ',
        }[match];
    });
}


//////////////////////////////
// 使用示例
//////////////////////////////

// htmlEncode('&lt;p class=&quot;greeting&quot;&gt;Hello world!&lt;/p&gt;')
// => <p class="greeting">Hello world!</p>
