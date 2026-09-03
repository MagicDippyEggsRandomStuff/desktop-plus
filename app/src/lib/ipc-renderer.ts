import { RequestResponseChannels, RequestChannels } from './ipc-shared'
import type { IpcRendererEvent } from 'electron'

function pickDirectoryWithInput(): Promise<string[] | null> {
  return new Promise(resolve => {
    const input = document.createElement('input')
    input.type = 'file'
    input.setAttribute('webkitdirectory', '')
    input.setAttribute('directory', '')

    input.onchange = () => {
      if (input.files && input.files.length > 0) {
        const firstFile = input.files[0] as any
        const relativePath = firstFile.webkitRelativePath
        let folderPath = ''

        if (firstFile.path) {
          const topDir = relativePath ? relativePath.split('/')[0] : ''
          const fullPath = (firstFile.path as string).replace(/\\/g, '/')
          if (topDir && fullPath.includes('/' + topDir + '/')) {
            folderPath = fullPath.substring(0, fullPath.indexOf('/' + topDir + '/') + topDir.length + 1)
          } else {
            folderPath = fullPath.substring(0, fullPath.lastIndexOf('/'))
          }
        } else if (relativePath) {
          const topDir = relativePath.split('/')[0]
          folderPath = `/storage/emulated/0/Documents/${topDir}`
        }

        resolve(folderPath ? [folderPath] : null)
      } else {
        resolve(null)
      }
    }

    input.oncancel = () => resolve(null)
    input.click()
  })
}

// Safe fallback for non-electron web environments (e.g. Android WebView)
let ipcRenderer: any = {
  invoke: async (channel: string, ...args: any[]) => {
    if (channel === 'show-open-dialog') {
      return pickDirectoryWithInput()
    }
    return ({})
  },
  send: () => {},
  sendSync: () => ({}),
  on: () => {},
  once: () => {},
  removeListener: () => {}
}

try {
  // eslint-disable-next-line no-restricted-imports
  const electron = require('electron')
  if (electron && electron.ipcRenderer) {
    ipcRenderer = electron.ipcRenderer
  }
} catch (e) {
  // Gracefully fallback
}

/**
 * Send a message to the main process via channel and expect a result
 * asynchronously. This is the equivalent of ipcRenderer.invoke except with
 * strong typing guarantees.
 */
export function invoke<T extends keyof RequestResponseChannels>(
  channel: T,
  ...args: Parameters<RequestResponseChannels[T]>
): ReturnType<RequestResponseChannels[T]> {
  return ipcRenderer.invoke(channel, ...args) as any
}

/**
 * Send a message to the main process via channel asynchronously. This is the
 * equivalent of ipcRenderer.send except with strong typing guarantees.
 */
export function send<T extends keyof RequestChannels>(
  channel: T,
  ...args: Parameters<RequestChannels[T]>
): void {
  return ipcRenderer.send(channel, ...args) as any
}

/**
 * Send a message to the main process via channel synchronously. This is the
 * equivalent of ipcRenderer.sendSync except with strong typing guarantees.
 */
export function sendSync<T extends keyof RequestChannels>(
  channel: T,
  ...args: Parameters<RequestChannels[T]>
): void {
  // eslint-disable-next-line no-sync
  return ipcRenderer.sendSync(channel, ...args) as any
}

/**
 * Subscribes to the specified IPC channel and provides strong typing of
 * the channel name, and request parameters. This is the equivalent of
 * using ipcRenderer.on.
 */
export function on<T extends keyof RequestChannels>(
  channel: T,
  listener: (
    event: IpcRendererEvent,
    ...args: Parameters<RequestChannels[T]>
  ) => void
) {
  ipcRenderer.on(channel, listener as any)
}

/**
 * Subscribes to the specified IPC channel and provides strong typing of
 * the channel name, and request parameters. This is the equivalent of
 * using ipcRenderer.once
 */
export function once<T extends keyof RequestChannels>(
  channel: T,
  listener: (
    event: IpcRendererEvent,
    ...args: Parameters<RequestChannels[T]>
  ) => void
) {
  ipcRenderer.once(channel, listener as any)
}

/**
 * Unsubscribes from the specified IPC channel and provides strong typing of
 * the channel name, and request parameters. This is the equivalent of
 * using ipcRenderer.removeListener
 */
export function removeListener<T extends keyof RequestChannels>(
  channel: T,
  listener: (
    event: IpcRendererEvent,
    ...args: Parameters<RequestChannels[T]>
  ) => void
) {
  ipcRenderer.removeListener(channel, listener as any)
}
