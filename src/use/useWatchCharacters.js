import { watch } from 'vue'

export function useWatchCharacters(valueToWatch, amount) {
  watch(valueToWatch, (newValue, oldValue) => {
    if(newValue.length == amount) {
      alert(`Only ${ amount} characters allowed`)
    }
  })
}