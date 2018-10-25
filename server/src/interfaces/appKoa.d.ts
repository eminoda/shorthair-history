import * as Koa from 'Koa';
interface Context extends Koa.Context {
    db: any;
}
export interface AppKoa extends Koa {
    context: Context;
}