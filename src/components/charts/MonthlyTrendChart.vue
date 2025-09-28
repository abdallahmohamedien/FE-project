<script>
// MonthlyTrendChart.vue
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

// تسجيل العناصر الأساسية لـ Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'MonthlyTrendChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
          {
            label: 'Average Attendance Rate',
            backgroundColor: '#4f46e5', // لون النيلي (Indigo)
            data: [75, 80, 78, 85, 92, 88, 90, 83], // بيانات وهمية
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false, // مهم للسماح بالتحكم في الارتفاع
        scales: {
            y: {
                min: 50,
                max: 100,
                title: {
                    display: true,
                    text: 'Attendance Percentage (%)'
                }
            }
        },
        plugins: {
            legend: {
                display: false // إخفاء العنوان الأسطوري
            }
        }
      }
    }
  }
}
</script>

<template>
  <Bar
    :data="chartData"
    :options="chartOptions"
  />
</template>