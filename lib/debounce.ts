/**
 * 函数节流，避免频繁触发
 *
 * @param func 需要执行的方法
 * @param wait 触发间隔
 * @param immediate 是否立即执行
 * @example
 * ```javascript
 * // 如果要保证立刻执行，请设置immediate=true。该值默认为false。
 * // 如绑定click事件。保证在300ms内只触发第一次。
 *
 * // 如果要保证最后一次执行，请设置immediate=false。
 * // 比如resize触发，保证最后一次触发完执行一些逻辑。
 *
 *
 * window.addEventListener('resize', debounce(()=>{
 *  console.log(1);
 * }, 300));
 * // 绑定window resize事件，但是第二次执行至少会在300ms以后
 * ```
 */
export default function debounce(func: Function, wait: number, immediate = false) {
  let timeout: number;
  return function (...args: any[]) {
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    const carry = immediate && !timeout;
    clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
    if (carry) func.apply(this, args);
  };
}
