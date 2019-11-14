<template>
  <div class="setting">
    <i class="el-icon-setting setting__icon" @click="drawer = true"> </i>

    <el-drawer title="系统界面设置" :visible.sync="drawer" size="300px">
      <el-form label-width="100px">
        <el-form-item label="导航标签：">
          <el-switch v-model="tagVisible" />
        </el-form-item>

        <el-form-item label="系统风格：">
          <el-radio-group v-model="style">
            <el-radio label="round">圆润</el-radio>
            <el-radio label="square">方正</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="元素大小：">
          <el-select v-model="size" :key="sizeSelectKey">
            <el-option label="big" value="default"></el-option>
            <el-option label="medium" value="medium"> </el-option>
            <el-option label="small" value="small"></el-option>
            <el-option label="mini" value="mini"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
  const styleContent = require('!css-loader!./style.css')[0][1];

  export default {
    data() {
      return {
        drawer: false,
        tagVisible: this.$store.getters.tagVisible,
        style: this.$store.getters.style,
        size: this.$store.getters.size,
        sizeSelectKey: 0
      };
    },
    watch: {
      tagVisible(value) {
        this.$store.commit('SET_TAG_VISIBLE', value);
      },
      style(value) {
        if (value === 'round') {
          this.addStyle();
        } else if (value === 'square') {
          const systemStyleElem = document.head.querySelector('#systemStyle');
          document.head.removeChild(systemStyleElem);
        }
        this.$store.commit('SET_STYLE', value);
      },
      size(value) {
        this.$ELEMENT.size = value;
        this.$store.commit('SET_CACHE_PAGES', []);
        this.$store.commit('SET_SIZE', value);
        this.sizeSelectKey++;
        this.$router.replace('/reload');
      }
    },
    mounted() {
      if (this.style === 'round') {
        this.addStyle();
      }
    },
    methods: {
      addStyle() {
        const styleElem = document.createElement('style');
        styleElem.setAttribute('id', 'systemStyle');
        styleElem.appendChild(document.createTextNode(styleContent));
        document.head.appendChild(styleElem);
      }
    },
  };
</script>

<style lang="scss" scoped>
  .setting {
    position: relative;

    .setting__icon {
      position: absolute;
      left: -40px;
      line-height: 60px;
      font-size: 28px;
      color: #fff;
      cursor: pointer;
    }
  }
</style>
