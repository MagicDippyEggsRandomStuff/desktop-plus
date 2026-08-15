const Buffer = require('buffer').Buffer

const processShim = {
  env: {
    TEST_ENV: '',
    NODE_ENV: 'production',
  },
  platform: 'android',
  version: 'v22.0.0',
  versions: { node: '22.0.0' },
  on: () => {},
  off: () => {},
  once: () => {},
  emit: () => {},
  listeners: () => [],
  removeListener: () => {},
  removeAllListeners: () => {},
  binding: (name: string) => {
    if (name === 'uv') {
      return { errname: () => 'unknown' }
    }
    return {}
  },
  cwd: () => '/',
  nextTick: (cb: any) => setTimeout(cb, 0),
}

if (typeof window !== 'undefined') {
  const existingProcess = (window as any).process || {}
  ;(window as any).process = Object.assign(existingProcess, processShim)
  ;(window as any).Buffer = (window as any).Buffer || Buffer
  ;(window as any).global = (window as any).global || window
  ;(window as any).setImmediate = (window as any).setImmediate || ((cb: any, ...args: any[]) => setTimeout(() => cb(...args), 0))
  ;(window as any).module = (window as any).module || { exports: {} }
}

export default processShim
