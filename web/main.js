import toast from '@monkig/mnki-toast'
const colors = ['success', 'error', 'warn', 'info']

for (let i = 0; i <= colors.length; i++) {
  toast('Single toast title', { color: colors[i] })
  toast('Single toast title', { color: colors[i], icon: false })
  toast('Single toast title', {
    color: colors[i],
    position: 'bot-left',
    description: 'Non labore irure excepteur laborum veniam est culpa laboris in sint voluptate et aute.Tempor dolor voluptate ipsum aute labore.'
  })
}

document.body.insertAdjacentHTML('afterbegin', `
<mnki-toast
  data-color="error"
  data-text="Declarative insert toast"
  data-position="top-left"
  data-time="2000"

>
</mnki-toast>`)

const myToast = document.createElement('mnki-toast')
myToast.setAttribute('data-text', 'Imperative toast')
myToast.setAttribute('data-position', 'top-left')
myToast.setAttribute('data-color', 'warn')
myToast.setAttribute('data-icon', 'false')

document.body.append(myToast)

// I must handle this case
// document.body.innerHTML = `
//  <mnki-toast
//   data-color="success"
//   data-text="Declarative inner toast"
//   data-position="top-left"
//   data-time="2000"
//  >
//  </mnki-toast>
// `
