import toast from './components'

async function addToast (text, { position, time }, waitTime) {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      /* eslint-disable-next-line */
        
      resolve(toast(text, { position, time }))
    }, waitTime)
  })
}

export default async function toastFactory () {
  const t1 = await addToast('Primer', { position: 'top-left', time: 5000 }, 0)
  await addToast('Segundo', { position: 'top-center', time: 5000 }, t1.options.time)
  await addToast('Tercero', { position: 'top-right', time: 5000 }, 5000)

  await addToast('Cuarto', { position: 'bot-left', time: 5000 }, 5000)
  await addToast('Quinto', { position: 'bot-center', time: 5000 }, 5000)
  await addToast('Sexto', { position: 'bot-right', time: 5000 }, 5000)
}
