#### 实现pdf.js官方的demo效果

##### 1.下载构建好的包

[地址](http://mozilla.github.io/pdf.js/getting_started/#download)

![Kt47mn.png](https://s2.ax1x.com/2019/10/23/Kt47mn.png)

将解压的build和web两个文件夹放入/dist/static/pdf中，同时也放一份到/src/static/pdf中作为备份。



##### 2.使用远程服务器上的pdf文件

在web/viewer.js中注释掉以下代码：

```js
if (origin !== viewerOrigin && protocol !== 'blob:') {
  // throw new Error('file origin does not match viewer\'s');
}
```



使用iframe插入viewer.html：

```html
<iframe
  frameborder="0"
  width="100%"
  height="100%"
  :src="`./static/pdf/web/viewer.html?file=${encodeURIComponent('http://www.xdocin.com/xdoc?_key=fedii4dtyfhmvgryqyntfjavte&_func=down&_dir=pdfdemo.pdf')}`">
</iframe>
```

远程服务器上的文件地址最好使用encodeURIComponent()编码。



使用远程文件以后默认加载的本地pdf文件就不需要了，可以删除，然后最好将viewer.js中的默认设置取消：

```js
defaultUrl: {
  // value: 'compressed.tracemonkey-pldi-09.pdf',
  value: '',
  kind: OptionKind.VIEWER
}
```



##### 3.取消打印信息

​    pdf.j会在控制台输出一段信息：

![Ktoz6g.png](https://s2.ax1x.com/2019/10/23/Ktoz6g.png)

​    在viewer.js中注释掉：

```js
// console.log('PDF ' + pdfDocument.fingerprint + ' [' + info.PDFFormatVersion + ' ' + (info.Producer || '-').trim() + ' / ' + (info.Creator || '-').trim() + ']' + ' (PDF.js: ' + (_pdfjsLib.version || '-') + (_app_options.AppOptions.get('enableWebGL') ? ' [WebGL]' : '') + ')');
```





