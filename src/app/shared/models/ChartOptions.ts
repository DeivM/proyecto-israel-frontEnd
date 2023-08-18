import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ApexTooltip } from "ng-apexcharts";


export  interface ChartOptions
 {
  series?: ApexNonAxisChartSeries;
  chart?: ApexChart;
  responsive?: ApexResponsive[];
  labels?: any;
  tooltip?: ApexTooltip;
}