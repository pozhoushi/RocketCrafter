# window.JSON

# JSON.stringify(value[, replacer [, space]])
+ arg
  - value [js合法值]
    * [Undefined|Function] => undefined
    * [Null] => null
    * NaN|Infinity => null
    * [SNB 的包装类] => [SNB 的原始值]
    * [Array]
      + [Undefined|Function|Symbol] => null
    * [Object]
      + 忽略成员
        - 值为[Undefined|Function]
        - 键值为[Symbol]
      + 成员顺序不可保证
      + 有循环引用的成员 => error
    * 其他类型的对象
      + 不可枚举的成员被忽略
    * 有成员方法 toJSON, 该 toJSON 方法覆盖该对象默认的序列化行为
  - replacer [Function | Array | Null/Empty]
    * Null/Empty: replacer 不生效
    * Array:
    * Function:
  - space [Number | String | Null/Empty]