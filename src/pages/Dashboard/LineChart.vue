<template>
  <div id="line_chart">

  </div>
</template>

<script>
export default {
  data() {
    return {
        chartData:[{
            week:
        }]
    };
  },
  created() {

  },
  methods: {
    createChart() {
      let chart = new G2.Chart({
        container: "line_chart",
        forceFit: true
      });
      chart.source()
    }
  }
};
</script>
<style scoped>
#line_chart {
    width: 100%;
}
</style>
