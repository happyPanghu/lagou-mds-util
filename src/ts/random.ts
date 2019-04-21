/**
 * 请求散列工具函数
 *
 * @param fn 被散列的函数, promise
 * @param time 随机时间，单位秒。api 请求将在 0 -time 中散列。
 * @example
 * ```javascript
 *
 * const sendRequest = random(function(url){
 *   // do something
 * }, 3);
 * sendRequest(url); // 调用后，将在 0-3s内发起真正请求
 * ```
 */
export function random(fn: Function, time: number) {
  return (...args: any) => {
    setTimeout(
      () => {
        fn(...args);
      },
      Math.random() * time * 1000,
    );
  };
}

/**
 * 请求散列工具函数 Promise 版
 *
 * @param fn 被散列的函数, promise
 * @param time 随机时间，单位秒。api 请求将在 0 -time 中散列。
 * @example
 * ```javascript
 *
 * const sendRequest = randomPromise(function(){
 *   return Promise.resolve(10);
 * }, 3); // 调用后，将在 0-3s内发起真正请求
 *
 * sendRequest().then(data=> {
 *   console.log(data); // 10
 * });
 * ```
 */
// export function randomPromise(fn: Function, time: number) {
//   return (...args: any) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(
//         () => {
//           fn(...args)
//             .then((data: any) => { resolve(data); })
//             .catch((err: any) => { reject(err); });
//         },
//         Math.random() * time * 1000,
//       );
//     });
//   };
// }