export interface SmoothSubmitOptions {
    action?: string;
    type?: "get" | "post" | string;
    preConfirm?: (target: Element, data: FormData | Object) => Promise<any>;
}
