import { keyFrameEndBot, keyFrameEndTop, keyFrameInitBot, keyframeInitTop } from './keyframes'
import { botCenter, botLeft, botRight, topCenter, topLeft, topRight } from './positionClasses'

const toasts = {
  'top-left': [],
  'top-center': [],
  'top-right': [],
  'bot-left': [],
  'bot-center': [],
  'bot-right': []
}

export default class MnkiToast extends HTMLElement {
  POSITIONS = {
    'top-left': 'top-left',
    'top-center': 'top-center',
    'top-right': 'top-right',
    'bot-left': 'bot-left',
    'bot-center': 'bot-center',
    'bot-right': 'bot-right'
  }

  COLORS = {
    success: 'success',
    error: 'error',
    warn: 'warn'
  }

  DEFAULT_OPTIONS = {
    TIME: 5 * 1000, // Miliseconds
    POSITION: 'top-center'
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
  constructor (text, { description, position, time, color } = {}) {
    super()
    this.id = crypto.randomUUID()
    this.color = color || 'default'
    this.text = text
    this.options.description = description
    this.options.position = this.POSITIONS[position] ?? this.DEFAULT_OPTIONS.POSITION
    this.options.time = time ?? this.DEFAULT_OPTIONS.TIME

    this.attachShadow({ mode: 'open' })
  }

  styles = /* css */`
    :host * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }
    
    /* Default */
    :host {
      display: inline-block;
      position: fixed;
      box-sizing: border-box;
      margin: 0;
      padding: 5px 10px;
      z-index: 1000;
      width: 25%;
      min-height: 10%;
      box-shadow: 1px 1px 20px 2px rgba(0, 0, 0, 10%);
      border-radius: 10px;
    }

    :host header {
      font-weight: bold;
      margin: 5px 0;

    }

    :host(.nodesc){
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    /* Toast positions */
    ${topLeft}
    ${topCenter}
    ${topRight}

    ${botLeft}
    ${botCenter}
    ${botRight}

    /* Toast animations */
    ${keyframeInitTop}
    ${keyFrameInitBot}
    ${keyFrameEndTop}
    ${keyFrameEndBot}    

    /* colors */
    :host(.default){
      background: white;
    }
    :host(.success) {
      background-color: #dff0d8;
      color: #3c763d;
    }

    :host(.error) {
      background-color: #f2dede;
      color: #a94442;
    }

    :host(.warn) {
      background-color: #fcf8e3;
      color: #8a6d3b;
    }
  `

  show (text, options) {
    // console.log(this.)
    this.text = text || this.text
    this.options = options ? { ...options } : this.options

    this.#render() // Insert the html to the shadow root
    this.#rootNode.insertAdjacentElement('afterbegin', this) // Connect the element to the html

    // this.#remove(this.options.time)
    return this
  }

  // Method inherited from the HTMLElement class that handles the logic when the element is connected
  connectedCallback () {
    this.#handleProps()

    toasts[this.options.position].push(this)
    this.#reposition()

    // this.addEventListener('mouseenter', (e) => {
    //   e.stopPropagation()

    //   this.onHover = true
    //   this.#render()
    //   clearTimeout(this.#removeTimeout)
    // })
    // this.addEventListener('mouseleave', (e) => {
    //   this.onHover = false
    //   this.#render()
    //   this.#remove(1000)
    // })
  }

  #reposition () {
    const margin = 10
    let currentPosition = 0 // Position acumulator for toasts

    for (let i = toasts[this.options.position].length - 1; i >= 0; i--) {
      const toast = toasts[this.options.position][i]
      const isCenterPosition = toast.options.position.endsWith('center')
      const isBotPosition = this.options.position.startsWith('bot')
      if (toast.onHover) continue

      // Get the height of the current toast

      const toastMovePosition = currentPosition
      currentPosition += toast.offsetHeight + margin // Actualizar la posición acumulada

      // Aplicar la transformación para posicionar el toast
      toast.style.transform = isCenterPosition
        ? `translate(-50%, ${isBotPosition ? '-' : ''}${toastMovePosition}px)`
        : `translateY(${isBotPosition ? '-' : ''}${toastMovePosition}px)`
      // toast.style.transition = 'transform 0.3s ease'
    }
  }

  // Method that render the html into the shadow root
  #render () {
    this.classList.add(`init-${this.options.position.split('-')[0]}`)
    this.shadowRoot.innerHTML = /* html */`
    <style>
          ${this.styles}
        </style>
        ${this.options.description /* html */
        ? `
        <header>${this.text}</header>
        <section>
        <p>${this.options.description ? this.options.description : this.text ?? 'Undefined text'}</p>
        </section>
        `
        : /* html */`
        <p>${this.text}</p>
        `}
        
        `
  }

  #remove (timeoutTime) {
    setTimeout(() => {
      this.classList.add(`end-${this.options.position.split('-')[0]}`)
      this.addEventListener('animationend', () => {
        this.remove()
      }, { once: true })
      // this.classList.remove('init-top')
    }, timeoutTime)
  }

  // Method that handles the attributes in cases that the element is connected via html and not constructor
  #handleProps () {
    // if the component is used as an html elemet "<mnki-toast></mnki-toast>" set the properties from the data-* attributes
    const { text, description, position, time, color } = this.dataset
    this.color = color || this.color
    this.text = text || this.text
    this.options.description = description ?? this.options.description
    this.options.position = position ?? this.options.position
    this.options.time = !isNaN(parseFloat(time)) ? parseFloat(time) : this.options.time

    this.classList.add(this.options.position)
    this.classList.add(this.color)
    if (!this.text) throw new Error('Text must be defined')
    if (!this.options.description) {
      this.classList.add('nodesc')
    }
  }
}

customElements.define('mnki-toast', MnkiToast)
