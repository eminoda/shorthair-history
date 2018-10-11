export class BoardElement {
    id: number = new Date().getTime();
    type: string = 'button';
    position: string = "absolute";
    display: string = "inline-block";
    height: any = 35;
    width: any = 100;
    'font-size': number = 12;
    'color': string = "#333";
    'border-radius': number = 0;
    'border-color': string = "#333";
    'border-style': string = "solid";
    'border-width': number = 1;
    'background-color': string = "#FFF";
    top: number = 0;
    bottom?: number = 0;
    left: number = 0;
    right?: number = 0;
}