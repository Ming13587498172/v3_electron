/**
 * 节流 Hooks
 * @param fn 需要节流的函数
 * @param delay 节流的时间
 */
export const useThrottle = (fn: Function, delay: number) => {
  let timer: NodeJS.Timeout | null = null
  if (!timer) {
    timer = setTimeout(() => {
      fn.apply(this)
      timer = null
    }, delay)
  }
}
