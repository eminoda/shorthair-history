export class Page {
    id: number;
    name: string;
    brand: string;
    url: string;
    channel?: string;
    remark?: string;
    isDeleted?: number;
    isExported?: number;
    createDate: Date;
    updateDate?: Date;
}
