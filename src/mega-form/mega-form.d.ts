
declare class MegaForm {
    constructor(options: iMegaForm.Options);
    inputs(obj: iMegaForm.Options['inputs']): MegaForm;
    rules(obj: iMegaForm.Options['rules']): MegaForm;
    message(obj: iMegaForm.Options['message']): MegaForm;
    after(data: any, errors: iMegaForm.Errors)
    subscribe(callback: iMegaForm.Subscriber): void;
    reset(): void;
    remove(): void;
    static extend(name: string, extendedRule: iMegaForm.ExtendedRule): void;
}


declare namespace iMegaForm {
    interface Options {
        inputs: Inputs;
        rules: Rules;
        message: Message;
        attributes: Attributes;
    }

    interface Inputs {
        [name: string]: string;
    }
    interface Rules {
        [element_path: string]: string;
    }
    interface Message {
        [element_path: string]: string;
    }
    interface Attributes {
        [attribute: string]: string;
    }

    interface Errors { }

    interface Subscriber {
        (valid: boolean, data: any, errors: Errors): void
    }

    interface ExtendedRule {
        (attribute: string, value: any, parameters: any[], validator: MegaForm): void;
    }
}
