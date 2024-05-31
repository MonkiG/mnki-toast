import MnkiToast from './components/toasts/MnkiToast/MnkiToast'

async function addToast (text, { position, time }, waitTime) {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      /* eslint-disable-next-line */
        new MnkiToast(text, { position, time })
      resolve()
    }, waitTime)
  })
}

export default async function toastFactory () {
  await addToast('Primer', { position: 'top-left', time: 5000 }, 0)
  await addToast('Primer', { position: 'top-center', time: 5000 }, 5000)
  await addToast('Primer', { position: 'top-right', time: 5000 }, 5000)

  await addToast('Primer', { position: 'bot-left', time: 5000 }, 5000)
  await addToast('Primer', { position: 'bot-center', time: 5000 }, 5000)
  await addToast('Primer', { position: 'bot-right', time: 5000 }, 5000)
}
