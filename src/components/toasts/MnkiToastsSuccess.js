import MnkiToast from './MnkiToast'

export default class MnkiToastSuccess extends MnkiToast {
  constructor () {
    super({ type: 'success' })
    this.attachShadow({ mode: 'open' })
  }

  static Styles = /* css */`
        :host{
            backgroud: green
        }
    `
  #render () {
    this.shadowRoot = /* html */`
        <style>${MnkiToast.Styles} ${MnkiToastSuccess.Styles} </style>
    `
  }
}

customElements.define('mnki-toast-success', MnkiToastSuccess)
