# 常见问题
> 记录整个项目大部分的问题，便于回溯

## Template parse errors:Can't bind to 'ngModel' since it isn't a known property of 'input'
Although ngModel is a valid Angular directive, it isn't available by default.
It belongs to the optional FormsModule and you must opt-in to using it.

````js
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule, FormsModule
  ]
})
````

## Template parse errors:'router-outlet' is not a known element:
导入RouterOutlet即可解决，但最好导出RouterModule解决，因为可能还会缺失其他指令
````
import { RouterModule, Routes } from '@angular/router';
@NgModule({
  exports: [
    RouterModule
  ]
})
````

## angular.json 怎么配置
[https://github.com/angular/angular-cli/wiki/angular-workspace](https://github.com/angular/angular-cli/wiki/angular-workspace)

如：css更改scss解析
````json
"schematics": {
    "@schematics/angular:component": {
      "styleext": "scss"
    }
  }
````

## (不要在constructor调用某些function做初始化)[https://angular.io/tutorial/toh-pt4#call-it-in-ngoninit]
构造函数简单用于属性赋值，不应该做方法的调用。甚至异步http等请求。
最佳实践放在lifecycle hook处理。

## 如何引入UI库（ng-zorro）
执行如下命令即可，建议在新建项目时执行，因为会对原有项目部分文件自动做修改
````
ng add ng-zorro-antd
````
当然也可以通过 npm install xx来执行，需要自行配置，[点击查看官网即可](https://ng.ant.design/docs/getting-started/zh)

## Property 'xxx' does not exist on type 'XXComponent'
注意ts中constructor和属性的用法。
````js
// 添加private public ...
constructor(private route: ActivatedRoute) { }
foo(){
  this.route //is ok
}
````

## [如何监听Router的变化](https://angular.io/api/router/Router#properties)
Router.events

## More than one component matched on this element.
ng-zorro的tr和checkbox不可写在一起

## If ngModel is used within a form tag, either the name attribute must be set or the form control must be defined as 'standalone' in ngModelOptions
form 标签中需要如果有ngModel，则必须再添加name属性

## router定义无错，但访问xx链接无法更新xxComponent
考虑是否有类似 **:id**的配置，会被匹配掉

## 怎么做proxy
angular.json
定义proxy文件，proxy.conf.json中和webpack proxy类似配置即可
````js
"serve": {
  "builder": "@angular-devkit/build-angular:dev-server",
  "options": {
    "browserTarget": "app-client:build",
    "proxyConfig": "src/proxy.conf.json"
  }
}
````

## Error: Cannot match any routes. URL Segment: 'page/detail'
区分restful参数和query参数在路由配置上的区别
````
[routerLink]="['/page/detail']" [queryParams]="{id:id}" //not i need
[routerLink]="['/page/detail/'+item.id]"
````

## 