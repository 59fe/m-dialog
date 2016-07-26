# m-dialog

---

移动端模态对话框。

## 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 `Dialog` 在当前页面正中打开一个浮层，承载相应的操作。

另外当需要一个简洁的确认框询问用户时，可以使用封装好的 `Dialog.confirm()` 等方法。


## API
对话框容器`<Dialog>`的属性说明如下：

| 参数       | 说明           | 类型             | 默认值       | 
|------------|----------------|------------------|--------------|
| visible    | 对话框是否可见 | Boolean          | 无           |  
| title      | 标题           | React.Element    | 无           |   
| onOk       | 点击确定回调       | function     | `function() {}`           |
| onCancel   | 点击遮罩层或右上角叉或取消按钮的回调  | function  | `function() {}`           |  
| hasFoot     | 是否有底部内容 (确定取消按钮)      | Boolean    |  true|   
| okText     | 确认按钮文字    | String           | 确定       |    
| cancelText | 取消按钮文字    | String           | 取消       |  
| withCloseIcon | 是否显示右上角的关闭按钮    | Boolean           | false       |  
| content | 内容    | React.Element              | 无        |    
| dialogMarginTop | 弹框顶部的margin值   | Number             | 0       |    
| transitionStart | 弹框出现和消失的时候是否有过渡效果    | Boolean              | false       |   





### Dialog.xxx()

包括：

- `Dialog.alert`
- `Dialog.confirm`

以上均为一个函数，参数为 object，具体属性上


