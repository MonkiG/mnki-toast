import { getIcon } from './icons'
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
    warn: 'warn',
    info: 'info'
  }

  DEFAULT_OPTIONS = {
    POSITION: 'top-center',
    ICON: true
  }

  options = {
    description: undefined,
    time: undefined,
    position: undefined,
    icon: undefined,
    color: undefined
  }

  text
  id
  onHover = false
  #rootNode = document.body

  constructor (text, { description, position, time, color, icon } = {}) {
    super()
    this.id = crypto.randomUUID()
    this.options.color = this.COLORS[color] || 'default'
    this.text = text
    this.options.description = description
    this.options.position = this.POSITIONS[position] ?? this.DEFAULT_OPTIONS.POSITION
    this.options.time = time
    this.options.icon = icon ?? this.DEFAULT_OPTIONS.ICON

    this.attachShadow({ mode: 'open' })
  }

  styles = /* css */`
    :host * {
      padding: 0 1%;
      margin: 0;
      box-sizing: border-box;
    }
    
    /* Default */
    :host {
      display: flex;
      font-family:  ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial,
      Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
      position: fixed;
      align-items: center;
      box-sizing: border-box;
      margin: 0;
      z-index: 1000;
      width: 25%;
      min-height: 6%;
      box-shadow: 1px 1px 20px 2px rgba(0, 0, 0, 10%);
      
    }
    :host header {
      font-weight: bold;
      margin: 2% 0;
    }
    :host section {
      margin: 2% 0;
      flex-grow: 1;
    }
    :host p {
      width: 100%;
      
    }
    :host aside {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      align-self: stretch;
      background: gray;
      margin: 0;
    }

    :host button {
      background: none;
      border: none;
      cursor: pointer;
    }
    /*:host(.nodesc){
      display: flex;
      flex-direction: column;
      justify-content: center;
    }*/

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
      
      & aside {
        background: #707B7C ;
      }
    }
    :host(.success) {
      
      & aside {
        background-color: #229954 ;
      }

    }
    :host(.error) {
      & aside {
        background-color: #A93226 ;
        color: white;
      }

    }

    :host(.warn) { 
      & aside {
        background-color: #CA6F1E ;
      }

    }

    :host(.info) { 
      & aside {
        background-color: #7D3C98/*#2471A3*/ ;
      }

    }

    /* media query */

    @media (prefers-color-scheme: dark) {
      :host {
        background-color: #262726;
        color: white;
        
      }
      :host aside {
        background-color: initial;
        color: initial;
      }
      :host button{
        color: white;
      }
      
    }
  `

  show (text, options) {
    this.text = text || this.text
    this.options = options ? { ...options } : this.options

    this.#render() // Insert the html to the shadow root
    this.#rootNode.insertAdjacentElement('afterbegin', this) // Connect the element to the html

    if (this.options.time) {
      this.#removeTimer(this.options.time)
    }
    return this
  }

  // Method inherited from the HTMLElement class that handles the logic when the element is connected
  connectedCallback () {
    this.#handleProps()
    const { type } = this.dataset
    if (type === 'declarative') {
      this.#render()
      if (this.options.time) {
        this.#removeTimer(this.options.time)
      }
    }

    toasts[this.options.position].push(this)
    this.#reposition()
    this.shadowRoot.querySelectorAll('button[data-type="close"]').forEach((x) => {
      x.addEventListener('click', () => this.#handleRemove())
    })

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

  disconnectedCallback () {
    const indexToRemove = toasts[this.options.position].indexOf(this)
    toasts[this.options.position].splice(indexToRemove, 1)
    this.#reposition()
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
        <aside>${this.options.icon ? getIcon(this.options.color) : ''}</aside>
        <div>
          <header style="display: flex; justify-content: space-between;  align-items: center">
            ${this.text}
            <button type="button" data-type="close" style="padding: 0 10px 0 0">X</button>
          </header>
          <section>
            <p>${this.options.description ? this.options.description : this.text ?? 'Undefined text'}</p>
          </section>
        </div>
      `
      : /* html */`
        <aside>${this.options.icon ? getIcon(this.options.color) : ''}</aside>
        <section style="display: flex; justify-content: space-between; align-items: center">
          <p>${this.text}</p>
          <button type="button" data-type="close" style="padding: 0 10px 0 0">X</button>
        </section>
      `}
    `
  }

  #handleRemove () {
    this.classList.add(`end-${this.options.position.split('-')[0]}`)
    this.addEventListener('animationend', () => {
      this.remove()
    }, { once: true })
  }

  #removeTimer (timeoutTime) {
    setTimeout(() => {
      this.#handleRemove()
      // this.classList.remove('init-top')
    }, timeoutTime)
  }

  // Method that handles the attributes in cases that the element is connected via html and not constructor
  #handleProps () {
    // if the component is used as an html elemet "<mnki-toast></mnki-toast>" set the properties from the data-* attributes
    const { text, description, position, time, color, icon } = this.dataset
    if (!this.text) {
      this.setAttribute('data-type', 'declarative')
    }
    this.options.color = color || this.options.color
    this.text = text || this.text
    this.options.description = description ?? this.options.description
    this.options.position = position ?? this.options.position
    this.options.time = !isNaN(parseFloat(time)) ? parseFloat(time) : this.options.time
    this.options.icon = !icon ?? this.options.icon

    this.classList.add(this.options.position)
    this.classList.add(this.options.color)
    if (!this.text) throw new Error('Text must be defined')
    if (!this.options.description) {
      this.classList.add('nodesc')
    }
  }
}

customElements.define('mnki-toast', MnkiToast)
