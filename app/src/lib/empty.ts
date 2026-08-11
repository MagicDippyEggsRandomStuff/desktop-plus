// Webpack mock stub for Android WebView/browser target compatibility
export const createRequire = () => () => ({})
export const join = (...args: string[]) => args.join('/')
export const resolve = (...args: string[]) => args.join('/')
export const basename = (p: string) => p.split('/').pop() || ''
export const dirname = (p: string) => p.split('/').slice(0, -1).join('/') || '/'
export const posix = { join, resolve, basename, dirname }
export const win32 = { join, resolve, basename, dirname }
export const existsSync = () => false
export const stat = async () => ({ isDirectory: () => false })
export const statSync = () => ({ isDirectory: () => false })
export const promises = { stat, existsSync }
export const randomUUID = () => '00000000-0000-0000-0000-000000000000'
export const spawn = () => ({
  on: () => {},
  stdout: { on: () => {} },
  stderr: { on: () => {} }
})
export class Socket {
  public on() {}
  public connect() {}
  public write() {}
  public end() {}
}
export class Writable {
  public on() {}
  public end() {}
  public write() {}
}
export class Readable {
  public on() {}
}
export class Transform {}
export class PassThrough {}
export const createServer = () => ({
  listen: () => {},
  on: () => {},
  close: () => {}
})
export const shell = { openExternal: async () => true }
export const ipcRenderer = {
  on: () => {},
  once: () => {},
  off: () => {},
  send: () => {},
  sendSync: () => {},
  invoke: async () => ({})
}
export const webUtils = { getPathForFile: (f: any) => f.path || '' }
export const promisify = (fn: any) => fn
export const release = () => '1.0.0'
export const type = () => 'Android'
export const platform = () => 'android'
export const arch = () => 'arm64'
export const pathToFileURL = (p: string) => ({ href: p })
export const fileURLToPath = (p: string) => p

export default {
  createRequire,
  join,
  resolve,
  basename,
  dirname,
  posix,
  win32,
  existsSync,
  stat,
  statSync,
  promises,
  randomUUID,
  spawn,
  Socket,
  Writable,
  Readable,
  Transform,
  PassThrough,
  createServer,
  shell,
  ipcRenderer,
  webUtils,
  promisify,
  release,
  type,
  platform,
  arch,
  pathToFileURL,
  fileURLToPath
}
