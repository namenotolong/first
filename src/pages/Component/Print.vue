<template>
    <div>
        <div id="print">
            <div class="print">要打印的内容要打印的内容要打印的内容要打印的内容要打印的内容要打印的内容要打印的内容要打印的内容要打印的内容要打印的内容</div>
        </div>
        <el-button type="primary" @click="print1('print')">使用window.print()方式打印</el-button>
        <p>#这种方式要注意将页面恢复后，页面中元素绑定的事件处理程序会失效。比如点击打印按钮，会将页面内容设置为要打印的内容，打印按钮被移除，按钮绑定的事件也会随之销毁，打印完成后再将按钮DOM恢复后，打印按钮就会失效。可以在打印完成后执行location.reload方法来刷新一遍页面。</p>
        </br>
        <p>#如果在打印完成后仍然需要保持页面状态，不希望刷新页面，可以使用iframe的方式打印。使用这种方式时如果需要对打印内容重新设置样式，iframe中引入的外部样式表无效，只有在MS Edge浏览器有效。</p>
        <el-button type="primary" @click="print2">使用iframe方式打印</el-button>
        </br></br></br>
        <p>#如果打印内容的样式是继承而来的将会无效，比如父元素设置了文字颜色，打印时这个CSS属性不会生效。</p>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            print1(id) {
                // 备份页面的内容
                const body = document.body.innerHTML;
                // 获取要打印的部分
                const printContent = document.getElementById(id).innerHTML;
                // 将页面内容替换为要打印的部分
                document.body.innerHTML = printContent;
                // 打印
                window.print();
                // 恢复页面内容
                document.body.innerHTML = body;
                location.reload();
            },
            print2() {
                var iframe = document.createElement("IFRAME");
                iframe.setAttribute('style', 'overflow:hidden;width:0px;height:0px; ');
                document.body.appendChild(iframe);
                var doc = iframe.contentWindow.document;
                // 外部样式表无效
                // doc.write(
                //     "<link rel='stylesheet' type='text/css' media='print' href='./src/assets/css/expertPrint.css'>"
                // )
                doc.write(document.querySelector("#print").innerHTML);
                doc.close();
                iframe.contentWindow.focus();
                iframe.contentWindow.print();
                document.body.removeChild(iframe);
            }

        }
    }
</script>
<style scoped>
    .print {
        font-size: 18px;
        text-indent: 2em;
        color: brown
    }
</style>