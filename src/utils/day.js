import Vue from 'vue'
// 初始化day.js
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

//  配置相对时间
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

// 日期格式化
// dayjs().format('YYYY-MM-DDTHH:mm:ss')
// 相对时间使用
// console.log(dayjs('2021-9-1 15:30:32').from(dayjs())); // 输出具体几天前

// 将相对时间封装为过滤器
Vue.filter('relativeTime',time =>{
    return dayjs(time).from(dayjs())
})