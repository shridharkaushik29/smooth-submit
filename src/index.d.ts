declare global {
    interface JQuery<TElement = HTMLElement> {
        smoothSubmit(options: SmoothSubmitOptions): JQuery<TElement>;
    }
    interface Element {
        smoothSubmitOptions: SmoothSubmitOptions;
    }
}
export interface SmoothSubmitOptions {
    action?: string;
    type?: "get" | "post" | string;
    preConfirm?: (target: Element, data: FormData | Object) => Promise<any>;
}
