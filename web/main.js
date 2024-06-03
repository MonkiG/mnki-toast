import toast from '@monkig/mnki-toast'
const colors = ['success', 'error', 'warn']

for (let i = 0; i <= colors.length; i++) {
  toast('Single toast title', { color: colors[i] })
  toast('Single toast title', {
    color: colors[i],
    position: 'bot-left',
    description: 'Non labore irure excepteur laborum veniam est culpa laboris in sint voluptate et aute.Tempor dolor voluptate ipsum aute labore.'

  })
}
