export const ANIMATION_TIME = 0.3
export const keyframeInitTop = /* css */`
    :host(.init-top){
        animation: init-top ${ANIMATION_TIME}s;
    }
    @keyframes init-top {
        from {
            opacity: 0%;
            top: 0px
        }
        to {
            opacity: 100%;
        }
    }
`

export const keyFrameInitBot = /* css */`
    :host(.init-bot){
        animation: init-bot ${ANIMATION_TIME}s;
    }
    @keyframes init-bot {
        from {
            opacity: 0%;
            bottom: 0px
        }
        to {
            opacity: 100%;
        }
    }
`

export const keyFrameEndTop = /* css */`
    :host(.end-top){
        animation: end-top ${ANIMATION_TIME}s;
    }
    @keyframes end-top {
        from {
            opacity: 100%;
        }
        to{
            opacity: 0%;
            top: 20%;
        }
    }
`

export const keyFrameEndBot = /* css */`

    :host(.end-bot){
        animation: end-bot ${ANIMATION_TIME}s;
    }
    @keyframes end-bot {
        from {
            opacity: 100%;
        }
        to{
            opacity: 0%;
            bottom: 20%;
        }
    }
`
