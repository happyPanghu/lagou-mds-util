/**
 * 深度克隆一个对象
 *
 * @param obj 要克隆的对象
 */
export default function cloneDeep(obj: any): any {
  // @fixme 修复any类型
  let result: any;
  if (obj === null || typeof obj !== 'object') return obj;

  if (obj instanceof Date) {
    result = new Date();
    result.setTime(obj.getTime());
    return result;
  }

  if (obj instanceof Array) {
    result = [];
    for (let i = 0; i < obj.length; i++) {
      result[i] = cloneDeep(obj[i]);
    }
    return result;
  }

  /* istanbul ignore else */
  if (obj instanceof Object) {
    result = {};
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      result[key] = cloneDeep(obj[key]);
    }
    return result;
  }

  /* istanbul ignore next */
  throw new Error("Unable to copy values! Its type isn't supported.");
}