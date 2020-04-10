<template>
  <div>
    <statistic @onChangeType="hanldeChangeType" />
    <line-chart :statistic-type="statisticType" />
  </div>
</template>

<script>
  import Statistic from './components/Statistic';
  import LineChart from './components/LineChart';

  export default {
    name: 'Dashboard',
    components: {
      Statistic,
      LineChart,
    },
    data() {
      return {
        statisticType: 'visit'
      }
    },
    methods: {
      hanldeChangeType(type) {
        this.statisticType = type;
      }
    },
  }
</script>
