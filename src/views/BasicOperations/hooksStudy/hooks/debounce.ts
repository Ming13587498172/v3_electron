/**
 * 防抖 Hooks
 * @param fn 需要防抖的函数
 * @param delay 防抖的时间
 */
export const useDebounce = (fn: Function, delay: number) => {
  let timer: NodeJS.Timeout | null = null
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    fn.apply(this)
  }, delay) 
}
