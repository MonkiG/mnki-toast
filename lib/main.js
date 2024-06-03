import MnkiToast from './MnkiToast'
export default function toast (text, options) {
  const toast = new MnkiToast(text, options)
  return toast.show()
}
