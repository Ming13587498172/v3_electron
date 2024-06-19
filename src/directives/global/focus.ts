import { DirectiveBinding } from 'vue'

/**
 * @ created - 元素初始化的时候：在绑定元素的 attribute 前，或事件监听器应用前调用
 * @ beforeMount - 指令绑定到元素后调用：在元素被插入到 DOM 前调用 - 只调用一次
 * @ mounted - 元素插入父级dom调用：在绑定元素的父组件及他自己的所有子节点都挂载完成后调用
 * @ beforeUpdate - 元素被更新之前调用：绑定元素的父组件更新前调用
 * @ updated - 在绑定元素的父组件，及他自己的所有子节点都更新后调用
 * @ beforeUnmount - 在元素被移除前调用：绑定元素的父组件卸载前调用
 * @ unmounted - 指令被移除后调用：绑定元素的父组件卸载后调用 - 只调用一次
 * @
 * - (el, binding, vnode, prevNode) {}
 * - * el: 指令绑定到的元素。这可以用于直接操作 DOM。
 * - * binding: 一个对象，包含以下属性。
 * - * - value: 传递给指令的值。例如在 v-my-directive="1 + 1" 中，值是 2。
 * - * - oldValue: 之前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否更改，它都可用。
 * - * - arg: 传递给指令的参数 (如果有的话)。例如在 v-my-directive:foo 中，参数是 "foo"。
 * - * - modifiers: 一个包含修饰符的对象 (如果有的话)。例如在 v-my-directive.foo.bar 中，修饰符对象是 { foo: true, bar: true }。
 * - * - instance: 使用该指令的组件实例。
 * - * - dir: 指令的定义对象。
 * - * vnode: 代表绑定元素的底层 VNode。
 * - * prevNode: 代表之前的渲染中指令所绑定元素的 VNode。仅在 beforeUpdate 和 updated 钩子中可用。
 */
export default {
  created(_: HTMLElement, __: DirectiveBinding) {},
  beforeMount(_: HTMLElement, __: DirectiveBinding) {},
  mounted(el: HTMLElement, _: DirectiveBinding) {
    el.focus()
  },
  beforeUpdate(_: HTMLElement, __: DirectiveBinding) {},
  updated(_: HTMLElement, __: DirectiveBinding) {},
  beforeUnmount(_: HTMLElement, __: DirectiveBinding) {},
  unmounted(_: HTMLElement, __: DirectiveBinding) {}
}
