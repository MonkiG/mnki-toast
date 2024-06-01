import { keyFrameEndBot, keyFrameEndTop, keyFrameInitBot, keyframeInitTop } from './keyframes'
import { botCenter, botLeft, botRight, topCenter, topLeft, topRight } from './positionClasses'

const toasts = []

export default class MnkiToast extends HTMLElement {
  POSITIONS = {
    'top-left': 'top-left',
    'top-center': 'top-center',
    'top-right': 'top-right',
    'bot-left': 'bot-left',
    'bot-center': 'bot-center',
    'bot-right': 'bot-right'
  }

  DEFAULT_OPTIONS = {
    TIME: 5 * 1000, // Miliseconds
    POSITION: 'top-center',
    ANIMATION_TIME: 0.3
  }

  options = {
    description: undefined,
    time: undefined,
    position: undefined
  }

  text
  id
  onHover = false
  #rootNode = document.body
  #toastPosition
  #removeTimeout
  constructor (text, { description, position, time } = {}) {
    super()
    this.id = crypto.randomUUID()
    this.text = text
    this.options.description = description
    this.options.position = this.POSITIONS[position] ?? this.DEFAULT_OPTIONS.POSITION
    this.options.time = time ?? this.DEFAULT_OPTIONS.TIME

    this.attachShadow({ mode: 'open' })
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

  show (text, options) {
    // console.log(this.)
    this.text = text || this.text
    this.options = options ? { ...options } : this.options

    this.#render() // Insert the html to the shadow root
    this.#rootNode.insertAdjacentElement('afterbegin', this) // Connect the element to the html

    this.#remove(this.options.time)
    return this
  }

  // Method inherited from the HTMLElement class that handles the logic when the element is connected
  connectedCallback () {
    this.#handleProps()

    toasts.push(this)
    this.#reposition()

    this.addEventListener('mouseenter', (e) => {
      e.stopPropagation()

      this.onHover = true
      this.#render()
      clearTimeout(this.#removeTimeout)
    })
    this.addEventListener('mouseleave', (e) => {
      this.onHover = false
      this.#render()
      this.#remove(1000)
    })
  }

  #reposition () {
    const position = this.options.position.split('-')[0]

    const boundingData = this.getBoundingClientRect()

    let j = 0 // Index of the first element in the array (first toast)
    for (let i = toasts.length - 1; i >= 0; i--) {
      const isCenterPosition = toasts[j].options.position.split('-')[1] === 'center'
      if (toasts[j].onHover) continue
      if (toasts.length > 0) {
        this.#toastPosition = ((i) * boundingData.height) + 10 // Get the position to set the toast due current index (i)
        toasts[j].style.transform = isCenterPosition
          ? `translate(-50%, ${position === 'bot' ? '-' : ''}${this.#toastPosition}px)`
          : `translateY(${position === 'bot' ? '-' : ''}${this.#toastPosition}px)`
      }
      j = j + 1
    }
  }

  // Method that render the html into the shadow root
  #render () {
    const animation = this.options.position.startsWith('top') ? 'init-top' : 'init-bot'
    this.style.animationName = animation
    this.style.animationDuration = `${this.DEFAULT_OPTIONS.ANIMATION_TIME}s`

    this.shadowRoot.innerHTML = /* html */`
        <style>
          ${MnkiToast.Styles}
        </style>
        ${this.options.description ? /* html */`<header>${this.text}</header>` : ''}
        <section>
          <p>${this.options.description ? this.options.description : this.text ?? 'Undefined text'}</p>
        </section>
    `
  }

  #remove (timeoutTime) {
    this.#removeTimeout = setTimeout(() => {
      const endAnimation = this.options.position.startsWith('top') ? 'end-top' : 'end-bot'
      this.style.animationName = endAnimation
      this.style.animationDuration = `${this.DEFAULT_OPTIONS.ANIMATION_TIME}s`
      this.addEventListener('animationend', () => {
        this.remove()
      }, { once: true })
    }, timeoutTime)
  }

  // Method that handles the attributes in cases that the element is connected via html and not constructor
  #handleProps () {
    // if the component is used as an html elemet "<mnki-toast></mnki-toast>" set the properties from the data-* attributes
    const { text, description, position, time } = this.dataset

    this.text = text || this.text
    this.options.description = description ?? this.options.description
    this.options.position = position ?? this.options.position
    this.options.time = !isNaN(parseFloat(time)) ? parseFloat(time) : this.options.time
    this.classList.add(...[this.options.position])

    if (!this.text) throw new Error('Text must be defined')
  }
}

customElements.define('mnki-toast', MnkiToast)
