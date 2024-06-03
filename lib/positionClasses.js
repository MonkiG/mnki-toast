export const topLeft = /* css */`
    :host(.top-left){
        top:10px;
        left: 10px;
        transition: transform 0.3s ease;
    }
`
export const topRight = /* css */`
    :host(.top-right){
        top:10px;
        right: 10px;
        transition: transform 0.3s ease;
    }
`

export const topCenter = /* css */`
    :host(.top-center){
        top:10px;
        left: 50%;
        transform: translateX(-50%); /* Centra el elemento horizontalmente */
        transition: transform 0.3s ease;
    }
`

export const botLeft = /* css */`
    :host(.bot-left){
        bottom: 10px;
        left: 10px;
        transition: transform 0.3s ease;
    }
`

export const botCenter = /* css */`
    :host(.bot-center){
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%); /* Centra el elemento horizontalmente */
        transition: transform 0.3s ease;
    }
`

export const botRight = /* css */`
    :host(.bot-right){
        bottom: 10px;
        right: 10px
        transition: transform 0.3s ease;
    }
`
