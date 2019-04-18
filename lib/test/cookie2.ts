/**
 * 设置cookie
 *
 * @param name cookie名称
 * @param value cookie值
 * @param expires 过期时间
 *
 * @example
 * ```javascript
 *
 * set('a','1',new Date(Date.now() + 86400*1000 ));
 * ```
 */
export const set = function (name: string, value: string, expires: Date): void {
  document.cookie = `${name}=${value};expires=${expires}`;
};

/**
 * 根据名称获取cookie
 *
 * @param name cookie名称
 *
 * @example
 * ```javascript
 *
 * const value  = get('a');
 * ```
 */
export const get = function (name: string): string {
  const cookieArr = document.cookie.replace(/\s/g, '').split(';');
  for (let i = 0; i < cookieArr.length; i++) {
    const [key, value] = cookieArr[i].split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return '';
};

/**
 * 根据cookie名称，删除一个cookie
 *
 * @param name cookie名称
 *
 * @example
 * ```javascript
 *
 * remove('a');
 * ```
 */
export const remove = function (name: string): void {
  set(name, '', new Date(Date.now() - 1));
};