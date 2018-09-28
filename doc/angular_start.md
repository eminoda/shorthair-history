# angular再次起步
## 为何选用angular代替vue
> 备注：现在的三大框架都很好，或许ng在这里更为合适，再带上自己的主观色彩
- 对比新的vue3.0，类似ts，polyfill，pwa，unit等功能，ng走的更早些。大品牌我信赖
- 更适合后端管理系统。开箱即用
- 学习曲线大，但此项目有助于知识面的扩展。面向未来
- react暂没用过，个人适应不了jsx

## quickstart
配置环境
````
npm install -g @angular/cli

ng new app-client
````

启动
````
cd app-client
ng serve --open
````

文件新增
````
ng generate class model/page
ng generate component pages
ng generate service ./page/page
ng generate module app-routing --flat -m=app
````

ui库
````
ng add ng-zorro-antd --theme
````

## [使用的一些问题](./angular_question.md)

## 插件（vscode）
- Auto Import
- Angular v6 Snippets
- ng-zorro snippets