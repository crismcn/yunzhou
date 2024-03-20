export const GUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0
    // eslint-disable-next-line no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const getItem = (key: string) => {
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : null
}

export const setItem = (key: string, value: any) => {
  return localStorage.setItem(key, JSON.stringify(value))
}

let timeout: any
type DebounceFunction = (func: Function, wait?: number, immediate?: boolean) => Function
export const Debounce: DebounceFunction = (func, wait = 100, immediate = false) => {
  return function (this: any, ...args: any[]) {
    const context = this

    const later = function () {
      timeout = undefined
      if (!immediate) {
        func.apply(context, args)
      }
    }

    const callNow = immediate && !timeout

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)

    if (callNow) {
      func.apply(context, args)
    }
  }
}

export const TraverseFiles = (e: any) => {
  return new Promise((resolve, reject) => {
    const result: any = {
      dirList: [],
      fileList: [],
    }
    const traverseFilesAndFolders = (items: any) => {
      const promises = []
      for (let i = 0; i < items.length; i++) {
        const entry = items[i].webkitGetAsEntry()
        if (entry) {
          if (entry.isFile) {
            promises.push(
              new Promise<void>((resolve, reject) => {
                entry.file((file: any) => {
                  file.fullPath = entry.fullPath
                  result.fileList.push(file)
                  resolve()
                }, reject)
              })
            )
          } else if (entry.isDirectory) {
            promises.push(traverseFolder(entry))
          }
        }
      }
      return Promise.all(promises)
    }

    const traverseFolder = (folder: { createReader: () => any }) => {
      return new Promise((resolve, reject) => {
        const reader = folder.createReader()
        reader.readEntries((entries: any[]) => {
          if (entries.length === 0) {
            result.dirList.push(folder)
          }
          const promises = entries.map((entry: any) => {
            if (entry.isFile) {
              return new Promise<void>((resolve, reject) => {
                entry.file((file: { fullPath: string }) => {
                  file.fullPath = entry.fullPath
                  result.fileList.push(file)
                  resolve()
                }, reject)
              })
            } else if (entry.isDirectory) {
              return traverseFolder(entry)
            }
          })
          Promise.all(promises).then(resolve).catch(reject)
        })
      })
    }

    traverseFilesAndFolders(e)
      .then(() => {
        resolve(result)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const FormatBytes = (byteSize: number) => {
  const ByteSize = 1024
  if (byteSize < ByteSize) {
    return byteSize + 'B'
  } else if (byteSize < Math.pow(ByteSize, 2)) {
    return (byteSize / ByteSize).toFixed(2) + 'K'
  } else if (byteSize < Math.pow(ByteSize, 3)) {
    return (byteSize / Math.pow(ByteSize, 2)).toFixed(2) + 'M'
  } else if (byteSize < Math.pow(ByteSize, 4)) {
    return (byteSize / Math.pow(ByteSize, 3)).toFixed(2) + 'G'
  } else {
    return (byteSize / Math.pow(ByteSize, 4)).toFixed(2) + 'T'
  }
}

// 分片上传
export const UploadMFC = async (file: any, fn: Function) => {
  let seek = 0
  let OFFSET = 0
  let FLAG = false
  const FILE_SIZE = file.size
  const CHUNK_SIZE = 1024 * 1024 // 每个分片的大小为 1MB
  const uploadNextChunk = async (): Promise<boolean> => {
    if (OFFSET >= FILE_SIZE) return FLAG
    seek = parseFloat(((OFFSET + CHUNK_SIZE) / FILE_SIZE).toFixed(2))
    seek = seek > 1 ? 1 : seek
    const BUFFER = await readNextChunk(file, OFFSET, CHUNK_SIZE)
    FLAG = await fn(BUFFER, seek)
    // 上传错误了直接传下一个文件
    if (!FLAG) return FLAG
    OFFSET += CHUNK_SIZE
    // 继续上传下一个块
    return await uploadNextChunk()
  }
  if (file.isDirectory) {
    return await fn([], 1)
  }
  return await uploadNextChunk()
}

const readNextChunk = (file: File, OFFSET: number, CHUNK_SIZE: number) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    const result = file.slice(OFFSET, OFFSET + CHUNK_SIZE)
    reader.onloadend = function (e) {
      if (reader.readyState === FileReader.DONE) {
        const arrayBuffer = e.target?.result as ArrayBuffer
        const uint8Array = new Uint8Array(arrayBuffer)
        resolve(Array.from(uint8Array))
      }
    }
    reader.onerror = function () {
      reject(new Error('文件读取错误'))
    }
    reader.onabort = function () {
      reject(new Error('文件读取被中止'))
    }
    reader.readAsArrayBuffer(result)
  })
}
