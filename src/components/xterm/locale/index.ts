import en from './en-US'
import cn from './zh-CN'

export const t = (key: string, lang: string) => {
  let data: any = {}
  if (lang == 'en-US') {
    data = en
  }
  if (lang == 'zh-CN') {
    data = cn
  }
  return data[key]
}
