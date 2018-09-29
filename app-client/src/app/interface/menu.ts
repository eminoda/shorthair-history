export interface Menu {
    url: string;
    name: string;
    type: string;
    icon?: string;
    menus?: Menu[];
}