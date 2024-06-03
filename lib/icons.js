class SuccessIcon extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.#render()
  }

  styles = /* css */`
    :host {
        display: flex;
        flex-direction: column;
        justify-concent: center;
    }
  `

  #render () {
    this.shadowRoot.innerHTML = /* html */`
    <style>${this.styles}</style>
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#fff" stroke-width="5" width="20" height="20">
        <g id="SVGRepo_bgCarrier" stroke-width="1"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path d="M7 13.689l.637-.636 2.863 2.674 7.022-6.87.637.637L10.5 17zM22.8 12.5A10.3 10.3 0 1 1 12.5 2.2a10.297 10.297 0 0 1 10.3 10.3zm-1 0a9.3 9.3 0 1 0-9.3 9.3 9.31 9.31 0 0 0 9.3-9.3z"></path>
            <path fill="none" d="M0 0h24v24H0z"></path>
        </g>
    </svg>
    `
  }
}

class WarnIcon extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  styles = /* css */`
    :host {
        display: flex;
        flex-direction: column;
        justify-concent: center;
    }
  `
  connectedCallback () {
    this.#render()
  }

  #render () {
    this.shadowRoot.innerHTML = /* html */`
    <style>${this.styles}</style>
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#fff"  stroke-width="5" width="20" height="20">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path d="M12 7h1v7h-1zm1.5 9.5a1 1 0 1 0-1 1 1.002 1.002 0 0 0 1-1zm9.3-4A10.3 10.3 0 1 1 12.5 2.2a10.297 10.297 0 0 1 10.3 10.3zm-1 0a9.3 9.3 0 1 0-9.3 9.3 9.31 9.31 0 0 0 9.3-9.3z"></path>
            <path fill="none" d="M0 0h24v24H0z"></path>
            </g>
        </svg>
    `
  }
}

class ErrorIcon extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  styles = /* css */`
    :host {
        display: flex;
        flex-direction: column;
        justify-concent: center;
    }
  `
  connectedCallback () {
    this.#render()
  }

  #render () {
    this.shadowRoot.innerHTML = /* html */`
    <style>${this.styles}</style>
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#fff"  stroke-width="5" width="20" height="20">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path d="M1.225 21.225A1.678 1.678 0 0 0 2.707 22H22.28a1.68 1.68 0 0 0 1.484-.775 1.608 1.608 0 0 0 .003-1.656L13.995 1.827a1.745 1.745 0 0 0-2.969 0l-9.8 17.742a1.603 1.603 0 0 0 0 1.656zm.859-1.143l9.82-17.773A.71.71 0 0 1 12.508 2a.73.73 0 0 1 .629.342l9.751 17.708a.626.626 0 0 1 .017.662.725.725 0 0 1-.626.288H2.708a.723.723 0 0 1-.623-.286.605.605 0 0 1-.001-.632zM13 15h-1V8h1zm-1.5 2.5a1 1 0 1 1 1 1 1.002 1.002 0 0 1-1-1z"></path>
            <path fill="none" d="M0 0h24v24H0z"></path>
        </g>
    </svg>
    `
  }
}

class InfoIcon extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  styles = /* css */`
    :host {
        display: flex;
        flex-direction: column;
        justify-concent: center;
    }
  `
  connectedCallback () {
    this.#render()
  }

  #render () {
    this.shadowRoot.innerHTML = /* html */`
        <style>${this.styles}</style>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#fff"  stroke-width="5" width="20" height="20">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path d="M12.5 7.5a1 1 0 1 1 1-1 1.002 1.002 0 0 1-1 1zM13 18V9h-2v1h1v8h-1v1h3v-1zm9.8-5.5A10.3 10.3 0 1 1 12.5 2.2a10.297 10.297 0 0 1 10.3 10.3zm-1 0a9.3 9.3 0 1 0-9.3 9.3 9.31 9.31 0 0 0 9.3-9.3z">
                </path><path fill="none" d="M0 0h24v24H0z"></path>
            </g>
        </svg>  
    `
  }
}

customElements.define('mnki-success-icon', SuccessIcon)
customElements.define('mnki-warn-icon', WarnIcon)
customElements.define('mnki-error-icon', ErrorIcon)
customElements.define('mnki-info-icon', InfoIcon)

export const getIcon = (type) => {
  switch (type) {
    case 'success':
      return '<mnki-success-icon></mnki-success-icon>'
    case 'error':
      return '<mnki-warn-icon></mnki-warn-icon>'
    case 'warn':
      return '<mnki-error-icon></mnki-error-icon>'
    case 'info':
      return '<mnki-info-icon></mnki-info-icon>'
    default:
      return ''
  }
}
