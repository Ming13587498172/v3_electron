/**
 * @params {Function} fn  需要防抖的函数 delay 防抖时间
 * @returns {Function} debounce 防抖函数
 * @example
 */
export const useDebounce = (callback: (val: any) => void, delay: number): Function => {
  let timer: NodeJS.Timeout | null = null
  const debounceFun = (val: any) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      callback(val)
    }, delay)
  }
  return debounceFun
}
