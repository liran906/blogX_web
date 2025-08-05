import { createI18n } from 'vue-i18n'
import zh from './zh-CN'
import en from './en-US'

// 确保翻译文件正确加载
const messages = {
  'zh-CN': zh,
  'en-US': en
}

// 翻译文件加载验证（仅开发环境）

type SupportedLocale = 'zh-CN' | 'en-US'

// 检测浏览器首选语言
function detectBrowserLanguage(): SupportedLocale {
  const acceptLanguages = navigator.languages || [navigator.language]
  
  for (const lang of acceptLanguages) {
    if (lang.startsWith('zh')) {
      return 'zh-CN'
    } else if (lang.startsWith('en')) {
      return 'en-US'
    }
  }
  
  // 兜底方案：检查单个navigator.language
  const browserLocale = navigator.language
  if (browserLocale.startsWith('zh')) {
    return 'zh-CN'
  }
  
  // 最终兜底：默认中文
  return 'zh-CN'
}

// 获取默认语言
function getDefaultLocale(): SupportedLocale {
  // 检测浏览器首选语言
  const browserLanguage = detectBrowserLanguage()
  
  // 检查保存的语言偏好
  const savedLocale = localStorage.getItem('locale')
  const isManualSelection = localStorage.getItem('isManualLanguageSelection') === 'true'
  
  // 如果没有保存的语言偏好，或者不是手动选择，使用浏览器检测的语言
  if (!savedLocale || !isManualSelection) {
    localStorage.setItem('locale', browserLanguage)
    localStorage.setItem('detectedBrowserLanguage', browserLanguage)
    return browserLanguage
  }
  
  // 如果是手动选择，使用保存的语言
  if (savedLocale && (savedLocale === 'zh-CN' || savedLocale === 'en-US')) {
    return savedLocale as SupportedLocale
  }
  
  // 最终兜底
  return 'zh-CN'
}

const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'zh-CN',
  messages,
  globalInjection: true,
  warnHtmlMessage: false,
  silentTranslationWarn: import.meta.env.PROD,
  silentFallbackWarn: import.meta.env.PROD,
  fallbackWarn: !import.meta.env.PROD,
  missingWarn: !import.meta.env.PROD
})

// i18n初始化完成

export default i18n

// 导出 i18n 实例用于在其他地方直接使用
export const i18nInstance = i18n.global

// 强制重新检测语言(用于调试)
export function forceLanguageDetection(): SupportedLocale {
  localStorage.removeItem('locale')
  localStorage.removeItem('detectedBrowserLanguage')
  localStorage.removeItem('isManualLanguageSelection')
  
  const detectedLocale = getDefaultLocale()
  i18n.global.locale.value = detectedLocale
  
  return detectedLocale
}

// 清除手动选择标记，立即重新自动检测
export function resetToAutoDetection() {
  localStorage.removeItem('isManualLanguageSelection')
  localStorage.removeItem('detectedBrowserLanguage')
  const detectedLocale = getDefaultLocale()
  i18n.global.locale.value = detectedLocale
  return detectedLocale
}

// 在控制台暴露调试函数
if (typeof window !== 'undefined') {
  (window as any).debugLanguage = {
    forceDetection: forceLanguageDetection,
    resetToAuto: resetToAutoDetection,
    currentLocale: () => i18n.global.locale.value,
    languages: () => navigator.languages,
    language: () => navigator.language,
    isManual: () => localStorage.getItem('isManualLanguageSelection') === 'true',
    savedBrowserLang: () => localStorage.getItem('detectedBrowserLanguage')
  }
}