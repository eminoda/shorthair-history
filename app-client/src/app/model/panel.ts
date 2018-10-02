// import { Property } from "./property";

import { Property } from "../interface/property";

export class Panel {
    type?: string;//text,button,template
    properties: Property = {
        height: '50px',
        width: '100px',
        'border-color': "#333",
        'border-style': "solid",
        'border-width': "1px",
        'background-color': "transparent"
    }
}