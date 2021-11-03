// /D:\Datas\codeworks\JavaScript\javascript_practice
console.log("开始获取全部属性")
var all_attrs = []
i = 100
do {
    attr_id_str = "provisioningForm:provisioningSubview:dataAttributeTbl:" + i + ":attrLdapName"
    var attr_html = document.getElementById(attr_id_str)
    if (attr_html) {
        var attr_txt = attr_html.innerText
        console.log(attr_txt)
        all_attrs.push(attr_txt)
    }
    else
    {
        console.log("退出")
        break
    }
    i++
}
while (attr_html)

