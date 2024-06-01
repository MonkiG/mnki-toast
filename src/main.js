import toast from './components'
import toastFactory from './toastFactory'

const buttonSingle = document.querySelector('button[data-type="single"]')
const buttonFactory = document.querySelector('button[data-type="factory"]')

buttonSingle.addEventListener('click', () => {
  /* eslint-disable-next-line */
  const myToast = toast('Single toast title', {
    description: 'Single toast description',
    position: 'bot-left',
    time: 5000
  })
})

buttonFactory.addEventListener('click', () => {
  toastFactory()
})
