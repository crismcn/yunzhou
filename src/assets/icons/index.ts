export const ExtensionMap: { [key: string]: any } = {
  folder: 'folder.png',
  json: 'json.png',
  md: 'md.png',

  js: 'js.png',
  ts: 'js.png',
  css: 'css.png',
  less: 'css.png',
  scss: 'css.png',
  htm: 'html.png',
  html: 'html.png',
  mht: 'html.png',
  mhtml: 'html.png',

  zip: 'zip.png',
  rar: 'zip.png',
  '7z': 'zip.png',
  gz: 'zip.png',
  tar: 'zip.png',
  tgz: 'zip.png',

  xml: 'xml.png',
  xmls: 'xml.png',

  xmind: 'xmind.png',
  xmap: 'xmind.png',

  xls: 'xls.png',
  xlsx: 'xls.png',
  csv: 'xls.png',

  doc: 'word.png',
  docx: 'word.png',
  rtf: 'word.png',

  ppt: 'ppt.png',
  pptx: 'ppt.png',

  pdf: 'pdf.png',
  pdx: 'pdf.png',
  pdfx: 'pdf.png',

  txt: 'txt.png',

  jpg: 'img.png',
  jpeg: 'img.png',
  png: 'img.png',
  tif: 'img.png',
  tiff: 'img.png',
  bmp: 'img.png',
  psd: 'img.png',
  ico: 'img.png',
  svg: 'img.png',
  pic: 'img.png',
  webp: 'img.png',

  mp4: 'mv.png',
  avi: 'mv.png',
  mov: 'mv.png',
  wmv: 'mv.png',
  flv: 'mv.png',
  mkv: 'mv.png',
  rmvb: 'mv.png',
  mpeg: 'mv.png',

  mp3: 'mp3.png',
  wav: 'mp3.png',
  acc: 'mp3.png',
  m4a: 'mp3.png',
  ogg: 'mp3.png',
  mid: 'mp3.png',
  midi: 'mp3.png',
}

export const getExtIcon = (f: string) => {
  const i = f.lastIndexOf('.')
  const key = i == -1 ? 'folder' : f.substring(i + 1).toLowerCase()
  const icon = ExtensionMap[key] || `unknown.png`
  return new URL(`./${icon}`, import.meta.url).href
}
