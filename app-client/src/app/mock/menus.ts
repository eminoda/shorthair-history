import { Menu } from './../interface/menu';
export const MENUS: Menu[] = [{
    type: 'page',
    url: '/page',
    name: '页面管理',
    icon: 'anticon-html5',
    menus: [{
        type: 'page',
        url: '/page/pages',
        name: '页面查询'
    }, {
        type: 'page',
        url: '/page/draw',
        name: '页面绘制'
    }, {
        type: 'page',
        url: '/page/templates',
        name: '模板查询'
    }]
}, {
    type: 'domain',
    url: '/page',
    name: '域名管理',
    icon: 'anticon-cloud',
    menus: [{
        type: 'page',
        url: '/page/pages',
        name: '查询域名'
    }, {
        type: 'page',
        url: '/page/draw',
        name: '修改记录'
    }, {
        type: 'page',
        url: '/page/templates',
        name: '模板查询'
    }]
}, {
    type: 'setting',
    url: '/page',
    name: '个人设置',
    icon: 'anticon-setting'
}]