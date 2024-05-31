import PropError from '../../../errors/PropError'
import { ToastPositions, DEFAULT_TIME, ANIMATION_TIME } from '../../../consts'
import { keyFrameEndBot, keyFrameEndTop, keyFrameInitBot, keyframeInitTop } from './keyframes'
import { botCenter, botLeft, botRight, topCenter, topLeft, topRight } from './positionClasses'

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

    ${topLeft}
    ${topCenter}
    ${topRight}

    ${botLeft}
    ${botCenter}
    ${botRight}

    ${keyframeInitTop}
    ${keyFrameInitBot}
    ${keyFrameEndTop}
    ${keyFrameEndBot}    
  `

  connectedCallback () {
    this.#handleProps()
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

  #handleDisconnected () {
    setTimeout(() => {
      const endAnimation = this.position.startsWith('top') ? 'end-top' : 'end-bot'
      this.style.animationName = endAnimation
      this.style.animationDuration = `${ANIMATION_TIME}s`
      this.addEventListener('animationend', (e) => {
        this.remove()
      }, { once: true })
    }, this.time)
  }

  #handleProps () {
    // if the component is used as an html elemet "<mnki-toast></mnki-toast>" set the properties from the data-* attributes
    const { text, description, position, time } = this.dataset

    this.text = this.text ?? text
    this.description = this.description ?? description
    this.position = this.position ?? position ?? ToastPositions['top-center']
    this.time = this.time ?? time ?? DEFAULT_TIME
    this.classList.add(...[this.position])

    if (!this.text) throw new PropError('text')
  }
}

customElements.define('mnki-toast', MnkiToast)
