<template>
  <div class="trend">
    <h6 class="subtitle">评分详细</h6>

    <div id="trendChart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
]);

export default {
  name: "RateTrend",

  props: {
    months: {
      type: Array,
      default: () => [],
    },
  },

  watch: {
    months: {
      handler(val) {
        if (val.length) {
          setTimeout(() => {
            this.drawChart();
          }, 0);
        }
      },
      deep: true,
    },
  },

  methods: {
    drawChart() {
      let chart = echarts.init(document.getElementById("trendChart"));
      const option = this.getChartOption();
      chart.setOption(option);
    },

    getChartOption() {
      let xAxis = [];
      let yData = [];

      for (let item of this.months) {
        xAxis.push(item.date);
        yData.push(item.rating);
      }

      let option = {
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: 20,
          left: 10,
          right: 10,
          bottom: 10,
          containLabel: true,
        },

        xAxis: {
          type: "category",
          // name: '时间',
          // nameTextStyle: {
          //   color: '#aaa',
          //   fontSize: 10
          // },
          boundaryGap: false,
          data: xAxis,
          // data: ["12月", "1月", "二月", "三月", "四月", "本月"],
          axisLine: {
            show: true,
            lineStyle: {
              color: "#e5e5e5",
              type: "dashed",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#aaa",
            fontSize: 10,
            margin: 12,
          },
        },
        yAxis: {
          type: "value",
          // name: "分",
          // nameTextStyle: {
          //   color: '#aaa',
          //   fontSize: 10
          // },
          // nameGap: 10,
          // nameLocation: 'end',
          min: 0,
          max: 10,
          interval: 2,
          splitLine: {
            lineStyle: {
              color: "#e5e5e5",
              type: "dashed",
            },
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: "#aaa",
            fontSize: 10,
            margin: 12,
            formatter: function (value) {
              return value === 10 ? value : value + ".0";
            },
          },
        },
        series: [
          {
            name: "平均评分",
            type: "line",
            // symbol: "none",
            symbolSize: 1,
            label: {
              show: true,
              position: "top",
              color: "#ffbe10",
            },
            itemStyle: {
              normal: {
                color: "#ffbe10",
              },
            },
            lineStyle: {
              width: 2,
              color: "#ffbe10",
              shadowColor: "#eee",
              shadowBlur: 2,
              shadowOffsetY: 6,
            },
            smooth: true,
            data: yData,
            // data: [7.3, 9.2, 8.1, 8.2, 8.2, 8.4],
          },
        ],
      };

      return option;
    },
  },
};
</script>

<style scoped lang="scss">
.trend {
  margin: 40px 20px 20px;
  border-radius: 8px;
  background-color: #fff;
  // box-shadow: 0 4px 12px #e5e5e5;
  .subtitle {
    position: relative;
    margin: 0 20px;
    height: 80px;
    line-height: 80px;
    font-size: 28px;
    font-weight: bold;
    padding-left: 16px;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 24px;
      height: 30px;
      width: 8px;
      background-color: $color-theme;
      border-radius: 4px;
    }
  }
}
#trendChart {
  padding: 0 20px 10px;
  width: 100%;
  height: 420px;
}
</style>