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

