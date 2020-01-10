[TOC]

## 一、html

### 1、css引入的方式？页面导入样式时，使用link和@import有什么区别？

**css引入的方式有一下三种：**

- 页面上用link标签引用文件
- 页面上在<style>标签对里写css样式
- 行间距style标签里写样式



**link和@import的区别：**

- 引用的方式不同：

  ```css
  link（外部引用）
  <link ref="stylesheet" type="text/css" href="xxx.css">
  
  @import(导入式)
  @import url('xxx.css')
  ```

- 放置的位置不同：link一般放在head标签对中，而@import必须放在<style type="text/css"></style>标签中

- 加载的方式不同：link会和dom结构一同加载渲染，而@import只能等dom结构加载完成以后才能加载渲染页面。

- 兼容性不同：@import只能在IE6以上才能识别，而link是XHTML标签，无兼容性问题。

- 样式权重不同：link方式的样式权重高于@import

- 改变样式：link支持javascript改变样式，而@import不可以

- 加载内容不同：link除了可以加载css文件以外，还可以加载MIME类型文件，而@import只能加载css文件

  

## 二、css

### 1、圣杯布局和双飞翼布局的理解和区别，并用代码实现

**圣杯布局和双飞翼布局的理解：**

- 两侧固定宽度，中间宽度自适应

- 中间部分在DOM结构上优先，以便先行渲染

- 允许三列中的任何一列成为最高列

- 只需要使用一个额外的div

  

**圣杯布局和双飞翼布局的区别：**

圣杯布局和双飞翼布局解决问题的方案在前一半是相同的即：三栏全部float浮动，但左右两栏加上负margin让其跟中间栏div并排，已形成三栏布局。

不同在于解决“中间栏div内容不被遮挡”问题的思路不一样：

圣杯布局，为了中间div内容不被遮挡，将中间div设置了左右padding-left和padding-right后，将左右两个div用相对布局position:relative分别配合right属性和left属性，以便左右两栏div移动后不遮挡中间。

双飞翼布局，为了中间div内容不被遮挡，直接在div内部创建子div用于放置内容，在该子div里用margin-left和margin-right为左右两栏div流出位置。多了一个div，少用大致4个css属性（圣杯布局中间div，padding-left和padding-right这两个属性，加上左右两个div用相对布局position:relative及对应的right和left共四个属性，一共6个；而双飞翼布局子div里用matgin-left和margin-right共两个属性，6-2=4）比圣杯布局更直接和简洁一点。