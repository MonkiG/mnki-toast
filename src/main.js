import MnkiToast from './components/toasts/MnkiToast/MnkiToast'
import toastFactory from './toastFactory'

const buttonSingle = document.querySelector('button[data-type="single"]')
const buttonFactory = document.querySelector('button[data-type="factory"]')

buttonSingle.addEventListener('click', () => {
  /* eslint-disable-next-line */
  new MnkiToast('Single toast title', {
    description: 'Single toast description',
    position: 'top-center',
    time: 5000
  })
})

buttonFactory.addEventListener('click', () => {
  toastFactory()
})

// setTimeout(() => {
//   document.querySelector('#app').innerHTML += '<mnki-toast data-text="Element toast" data-position="bot-center"></mnki-toast>'
// }, 3000)
