import { CrudRequest } from "crud-sk";
import { RequestOptions } from "crud-sk/src";
declare global {
    interface JQuery<TElement = HTMLElement> {
        smoothSubmit(options: SmoothSubmitOptions): JQuery<TElement>;
    }
    interface JQueryStatic {
        crud(): CrudRequest;
        smoothSubmitConfig: (config: SmoothSubmitOptions) => this;
    }
    interface Element {
        smoothSubmitOptions: SmoothSubmitOptions;
    }
}
export interface SmoothSubmitOptions {
    action?: string;
    type?: "get" | "post" | string;
    preConfirm?: (target: Element, data: FormData | Object) => Promise<any>;
    crudOptions?: RequestOptions;
}
