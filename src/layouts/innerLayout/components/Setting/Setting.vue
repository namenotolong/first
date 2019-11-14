<template>
  <div class="setting">
    <i class="el-icon-setting setting__icon" @click="drawer = true"> </i>

    <el-drawer title="系统界面设置" :visible.sync="drawer" size="300px">
      <div class="setting__content">
        <ul>
          <li>
            <span>导航标签:</span>
            <el-switch v-model="tagVisible" />
          </li>
          <li>
            <span>系统风格：</span>
            <el-radio-group v-model="style">
              <el-radio label="round">圆润</el-radio>
              <el-radio label="square">方正</el-radio>
            </el-radio-group>
          </li>
          <li>
            <span>元素大小：</span>
            <el-select v-model="size">
              <el-option label="big" value="default"></el-option>
              <el-option label="medium" value="medium"> </el-option>
              <el-option label="small" value="small"></el-option>
              <el-option label="mini" value="mini"></el-option>
            </el-select>
          </li>
        </ul>

      </div>
    </el-drawer>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        drawer: false,
        tagVisible: this.$store.getters.tagVisible,
        style: 'round',
        size: this.$store.getters.size,
      };
    },

    watch: {
      tagVisible(value) {
        this.$store.commit('SET_TAG_VISIBLE', value);
      },
      size(value) {
        this.$ELEMENT.size = value;
        this.$store.commit('SET_SIZE', value);
        this.$router.replace('/reload');
      }
    },
    methods: {

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

    .setting__content {}
  }
</style>
