import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLocaleStore = defineStore('locale', () => {
  const currentLocale = ref(localStorage.getItem('locale') || 'zh-CN')
  
  const setLocale = (locale: string) => {
    currentLocale.value = locale
    localStorage.setItem('locale', locale)
  }
  
  const toggleLocale = () => {
    const newLocale = currentLocale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
    setLocale(newLocale)
  }
  
  const isEnglish = () => {
    return currentLocale.value === 'en-US'
  }
  
  return {
    currentLocale,
    setLocale,
    toggleLocale,
    isEnglish
  }
})