import PropError from '../../errors/PropError'
import { ToastPositions } from '../../consts'

const DEFAULT_TIME = 5 * 1000 // Miliseconds
const ANIMATION_TIME = 0.3 // Seconds
export default class MnkiToast extends HTMLElement {
  constructor (text, { description, position, time } = {}) {
    super()
    this.text = text
    this.description = description
    this.time = time ?? DEFAULT_TIME
    this.position = ToastPositions[position] ?? 'top-center'
    this.attachShadow({ mode: 'open' })

    this.#render()
    document.body.insertAdjacentElement('afterbegin', this)
    this.#handleDisconnected()
  }

  static Styles = /* css */`
    :host * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }
    
    :host {
      display: inline-block;
      position: fixed;
      box-sizing: border-box;
      padding: 5px 10px;
      z-index: 1000;
      margin: 0;
      width: 40%;
      background: gray;
    }
    
    :host(.top-right){
      top:10px;
      right: 10px;
    }
    :host(.top-left){
      top:10px;
      left: 10px;
    }
    :host(.top-center){
      top:10px;
      left: 50%;
      transform: translateX(-50%);
    }

    :host(.bot-left){
      bottom: 10px;
    }
    :host(.bot-center){
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    }
    :host(.bot-right){
      bottom: 10px;
      right: 10px
    }

    @keyframes init-top {
      from {
        opacity: 0%;
        top: 0px
      }
      to {
        opacity: 100%;
        top: 10px
      }
    }

    @keyframes init-bot {
      from {
        opacity: 0%;
        bottom: 0px
      }
      to {
        opacity: 100%;
        bottom: 10px
      }
    }

    @keyframes end-top {
      from {
        opacity: 100%;
        top: 10px;
      }
      to{
        opacity: 0%;
        top: 0px;
      }
    }

    @keyframes end-bot {
      from {
        opacity: 100%;
        bottom: 10px;
      }
      to{
        opacity: 0%;
        bottom: 0;
      }
    }
  `

  connectedCallback () {
    this.#handleProps()
    // this.render()
  }

  disconnectedCallback () {
    console.log('desconectado')
  }

  #render () {
    const animation = this.position.startsWith('top') ? 'init-top' : 'init-bot'
    this.style.animationName = animation
    this.style.animationDuration = `${ANIMATION_TIME}s`

    this.shadowRoot.innerHTML = /* html */`
        <style>
          ${MnkiToast.Styles}
        </style>
        ${this.description ? /* html */`<header>${this.text}</header>` : ''}
        <section>
          <p>${this.description ? this.description : this.text ?? 'Undefined text'}</p>
        </section>
    `
  }

  again () {
    console.log(this)
    this.#render()
    document.body.insertAdjacentElement('afterbegin', this)
    this.#handleDisconnected()
  }

  #handleDisconnected () {
    setTimeout(() => {
      const endAnimation = this.position.startsWith('top') ? 'end-top' : 'end-bot'
      this.style.animationName = endAnimation
      this.style.animationDuration = `${ANIMATION_TIME}s`
      this.addEventListener('animationend', (e) => {
        console.log(e)
        this.remove()
      }, { once: true })
    }, this.time)
  }

  #handleProps () {
    // if the component is used as an html elemet "<mnki-toast></mnki-toast>" set the properties from the data-* attributes
    const { text, description, /* type, */ position, time } = this.dataset

    this.text = this.text ?? text
    this.description = this.description ?? description
    // this.type = this.type ?? ToastTypes[type] ?? ToastTypes.default
    this.position = this.position ?? position ?? ToastPositions['top-center']
    this.time = this.time ?? time ?? DEFAULT_TIME
    this.classList.add(...[this.position])

    if (!this.text) throw new PropError('text')
  }
}

customElements.define('mnki-toast', MnkiToast)
