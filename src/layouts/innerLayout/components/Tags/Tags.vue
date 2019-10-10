<template>
  <div class="layout-tags">
    <div
      class="layout-tags__item"
      :class="{active:isTagActive(tag.path)}"
      v-for="(tag,index) in tagList"
      :key="tag.path">
      <!-- 关闭标签需要自定义，不能使用el-tag，点击它的关闭按钮，close事件会冒泡而触发超链接的点击 -->
      <router-link class="link" :to="tag.path">{{tag.title}}</router-link>
      <i class="el-icon-circle-close icon" @click="closeTag(index)"></i>
    </div>
  </div>

</template>

<script>
  import bus from "@/utils/bus";

  export default {
    data() {
      return {
        tagList: []
      }
    },
    watch: {
      $route(route) {
        this.addTag(route);
      },
      tagList() {
        // 缓存页面
        const tagListNames = this.tagList.map(item => {
          // keep-alive会匹配组件的name属性进行缓存,组件设置了name选项，就会对这个页面就行缓存。
          if (item.name) {
            return item.name;
          }
        })
        bus.$emit("cachePage", tagListNames);
      }
    },
    created() {
      this.addTag(this.$route);
    },
    methods: {
      isTagActive(path) {
        return this.$route.path == path;
      },
      // 添加标签
      addTag(route) {
        let isTagExist = this.tagList.some(item => {
          return item.path == route.path;
        })
        if (!isTagExist) {
          if (this.tagList.length >= 8) {
            this.tagList.shift();
          }
          this.tagList.push({
            title: route.meta.title,
            path: route.path,
            name: route.matched[1].components.default.name //如果路由是命名路由，就做缓存
          });
        }
      },
      // 关闭标签
      closeTag(index) {
        // taglist中只有首页时不关闭首页
        if (this.tagList.length == 1 && this.tagList[0].path == "/dashboard") return false;
        const delTag = this.tagList.splice(index, 1)[0];
        //判断关闭的tag的下一个tag存不存在，存在就跳到下一个tag，不存在就跳到上一个tag。
        const toTag = this.tagList[index] ? this.tagList[index] : this.tagList[index - 1];
        if (toTag) {
          // 只有关闭的是当前页面才进行跳转
          delTag.path == this.$route.path && this.$router.push(toTag.path);
        } else {
          // 如果上一个tag也不存在就跳到首页(也就是关闭完所有tag了)
          this.$router.push("/dashboard");
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .layout-tags {
    display: flex;
    width: 100%;
    background-color: #fff;
    padding: 5px 10px;
    box-sizing: border-box;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.1),
      0 2px 1px -1px rgba(0, 0, 0, 0.1);
    z-index: 100;

    .layout-tags__item {
      padding: 5px 10px;
      border-radius: 4px;
      border: $base-border;
      background-color: var(--theme-white__9);
      color: #409eff;

      &+.layout-tags__item {
        margin-left: 10px;
      }

      .link {
        display: inline-block;
        font-size: 12px;
        margin-right: 5px;

        &:hover {
          color: $auxiliary-text-color !important;
        }
      }

      .icon {
        color: var(--theme);
        cursor: pointer;

        &:hover {
          color: $auxiliary-text-color;
        }
      }

      &.active {
        background-color: var(--theme);

        .link,
        .icon {
          color: #fff;
        }
      }
    }
  }
</style>
