<template>
  <div class="whStyle box-padding format-date-study-box">
    <h2>FormatDateStudy</h2>
    <br />
    <div>
      <h3>2024-05-25T12:00:00Z</h3>
      <br />
      <p>yyyy -> {{ formatDate('yyyy', '2024-05-25T12:00:00Z') }}</p>
      <p>yyyy-MM -> {{ formatDate('yyyy-MM', '2024-05-25T12:00:00Z') }}</p>
      <p>yyyy-MM-dd -> {{ formatDate('yyyy-MM-dd', '2024-05-25T12:00:00Z') }}</p>
      <p>yyyy-MM-dd HH -> {{ formatDate('yyyy-MM-dd HH', '2024-05-25T12:00:00Z') }}</p>
      <p>yyyy-MM-dd HH:mm -> {{ formatDate('yyyy-MM-dd HH:mm', '2024-05-25T12:00:00Z') }}</p>
      <p>yyyy-MM-dd HH:mm:ss -> {{ formatDate('yyyy-MM-dd HH:mm:ss', '2024-05-25T12:00:00Z') }}</p>
      <p>HH -> {{ formatDate('HH', '2024-05-25T12:00:00Z') }}</p>
      <p>HH:mm -> {{ formatDate('HH:mm', '2024-05-25T12:00:00Z') }}</p>
      <p>HH:mm:ss -> {{ formatDate('HH:mm:ss', '2024-05-25T12:00:00Z') }}</p>
    </div>
    <br />
    <div>
      <h3>Wed Nov 11 00:00:00 CST 2020</h3>
      <br />
      <p>yyyy -> {{ formatDate('yyyy', 'Wed Nov 11 00:00:00 CST 2020') }}</p>
      <p>yyyy-MM -> {{ formatDate('yyyy-MM', 'Wed Nov 11 00:00:00 CST 2020') }}</p>
      <p>yyyy-MM-dd -> {{ formatDate('yyyy-MM-dd', 'Wed Nov 11 00:00:00 CST 2020') }}</p>
      <p>yyyy-MM-dd HH -> {{ formatDate('yyyy-MM-dd HH', 'Wed Nov 11 00:00:00 CST 2020') }}</p>
      <p>yyyy-MM-dd HH:mm -> {{ formatDate('yyyy-MM-dd HH:mm', 'Wed Nov 11 00:00:00 CST 2020') }}</p>
      <p>yyyy-MM-dd HH:mm:ss -> {{ formatDate('yyyy-MM-dd HH:mm:ss', 'Wed Nov 11 00:00:00 CST 2020') }}</p>
      <p>HH -> {{ formatDate('HH', 'Wed Nov 11 00:00:00 CST 2020') }}</p>
      <p>HH:mm -> {{ formatDate('HH:mm', 'Wed Nov 11 00:00:00 CST 2020') }}</p>
      <p>HH:mm:ss -> {{ formatDate('HH:mm:ss', 'Wed Nov 11 00:00:00 CST 2020') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts" name="FormatDateStudy">

/**
 * 日期时间格式化
 * @param type 日期时间格式
 * @param dateTime 日期时间
 * @ string.padStart(targetLength padString) -> 在字符串开头添加指定字符以达到指定长度，常用于格式化字符串，如确保表格列宽相同或格式化日期时间
 * @ targetLength -> 要达到的字符串长度，必须为一个正整数
 * @ padString -> 可选的填充字符串，如果不指定，则默认为一个空格
 */
const formatDate = (type: string, dateTime: string): string => {
  let dealDateTime = ''

  const date = new Date(dateTime)
  const yyyy = date.getFullYear()
  const MM = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const HH = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  const ss = String(date.getSeconds()).padStart(2, '0')

  switch (type) {
    /** 年 */
    case 'yyyy':
      dealDateTime = `${yyyy}`
      break
    /** 年-月 */
    case 'yyyy-MM':
      dealDateTime = `${yyyy}-${MM}`
      break
    /** 年-月-日 */
    case 'yyyy-MM-dd':
      dealDateTime = `${yyyy}-${MM}-${dd}`
      break
    /** 年-月-日 时 */
    case 'yyyy-MM-dd HH':
      dealDateTime = `${yyyy}-${MM}-${dd} ${HH}`
      break
    /** 年-月-日 时:分 */
    case 'yyyy-MM-dd HH:mm':
      dealDateTime = `${yyyy}-${MM}-${dd} ${HH}:${mm}`
      break
    /** 年-月-日 时:分:秒 */
    case 'yyyy-MM-dd HH:mm:ss':
      dealDateTime = `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`
      break
    /** 时 */
    case 'HH':
      dealDateTime = `${HH}`
      break
    /** 时:分 */
    case 'HH:mm':
      dealDateTime = `${HH}:${mm}`
      break
    /** 时:分:秒 */
    case 'HH:mm:ss':
      dealDateTime = `${HH}:${mm}:${ss}`
      break
    default:
      break
  }

  return dealDateTime
}

</script>

<style scoped lang="scss">
.format-date-study-box {

}
</style>
