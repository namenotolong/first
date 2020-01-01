 <template>
   <div class="office-preview">
     <div>
       直接使用微软提供的在线预览非常慢，最好在服务端安装部署
       <a href="https://products.office.com/zh-cn/free-office-online-for-the-web" target="_blank">office-online</a>
       服务
     </div>

     <office :fileURL="fileURL" />
   </div>

 </template>

 <script>
   import Office from '@/components/office';

   export default {
     name: 'OfficePreview',
     components: {
       Office
     },
     data() {
       return {
         fileURL: 'http://www.xdocin.com/xdoc?_key=t7t7z6j54vezfdnwptijcmo63i&_func=down&_dir=math.pdf'
       }
     }
   }
 </script>

 <style scoped>
   .office-preview {
     height: 100%
   }
 </style>
