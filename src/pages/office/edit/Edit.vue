 <template>
   <div class="office-edit">
     <div>在线编辑需要在服务端部署office-online，才能在线编辑远程文件</div>
     <!-- <office mode="edit" :fileURL="fileURL" /> -->
   </div>

 </template>

 <script>
   import Office from '@/components/office';

   export default {
     name: 'OfficeEdit',
     components: {
       Office
     },
     data() {
       return {
         fileURL: ''
       }
     }
   }
 </script>

 <style scoped>
   .office-edit {
     height: 100%
   }
 </style>
