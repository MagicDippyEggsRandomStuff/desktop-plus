// Webpack mock stub for Android WebView/browser target compatibility
export const createRequire = () => () => ({})
export const join = (...args: string[]) => args.filter(Boolean).join('/').replace(/\/+/g, '/')
export const resolve = (...args: string[]) => args.filter(Boolean).join('/').replace(/\/+/g, '/')
export const basename = (p: string, ext?: string) => {
  let b = p.split('/').pop() || ''
  if (ext && b.endsWith(ext)) {
    b = b.slice(0, -ext.length)
  }
  return b
}
export const dirname = (p: string) => p.split('/').slice(0, -1).join('/') || '/'
export const extname = (p: string) => {
  const b = basename(p)
  const idx = b.lastIndexOf('.')
  return idx > 0 ? b.slice(idx) : ''
}
export const normalize = (p: string) => p.replace(/\/+/g, '/')
export const relative = (from: string, to: string) => to.replace(from, '').replace(/^\//, '')
export const isAbsolute = (p: string) => p.startsWith('/') || /^[a-zA-Z]:/.test(p)
export const sep = '/'

export const posix = { join, resolve, basename, dirname, extname, normalize, relative, isAbsolute, sep }
export const win32 = { join, resolve, basename, dirname, extname, normalize, relative, isAbsolute, sep: '\\' }

// Filesystem mock functions
export const mkdir = async () => {}
export const mkdirSync = () => {}
export const writeFile = async () => {}
export const writeFileSync = () => {}
export const readFile = async () => ''
export const readFileSync = () => ''
export const readdir = async () => []
export const readdirSync = () => []
export const unlink = async () => {}
export const unlinkSync = () => {}
export const rm = async () => {}
export const rmSync = () => {}
export const stat = async () => ({ isDirectory: () => false, isFile: () => true, size: 0 })
export const statSync = () => ({ isDirectory: () => false, isFile: () => true, size: 0 })
export const lstat = async () => ({ isDirectory: () => false, isFile: () => true, size: 0 })
export const lstatSync = () => ({ isDirectory: () => false, isFile: () => true, size: 0 })
export const access = async () => {}
export const accessSync = () => {}
export const copyFile = async () => {}
export const copyFileSync = () => {}
export const mkdtemp = async () => '/tmp/temp'
export const mkdtempSync = () => '/tmp/temp'
export const readlink = async () => ''
export const readlinkSync = () => ''
export const symlink = async () => {}
export const symlinkSync = () => {}
export const appendFile = async () => {}
export const appendFileSync = () => {}
export const open = async () => ({
  close: async () => {},
  read: async () => ({ bytesRead: 0 }),
  write: async () => {}
})
export const cp = async () => {}
export const cpSync = () => {}
export const existsSync = () => false

export const realpath: any = async (p: string) => p
realpath.native = async (p: string) => p
export const realpathSync = (p: string) => p

export const constants = { F_OK: 0, R_OK: 4, W_OK: 2, X_OK: 1 }

export const promises = {
  mkdir,
  mkdirSync,
  writeFile,
  writeFileSync,
  readFile,
  readFileSync,
  readdir,
  readdirSync,
  unlink,
  unlinkSync,
  rm,
  rmSync,
  stat,
  statSync,
  lstat,
  lstatSync,
  access,
  accessSync,
  copyFile,
  copyFileSync,
  mkdtemp,
  mkdtempSync,
  readlink,
  readlinkSync,
  symlink,
  symlinkSync,
  appendFile,
  appendFileSync,
  open,
  cp,
  cpSync,
  existsSync,
  realpath
}

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
  close: () => {},
  unref: () => {}
})

export const shell = {
  openExternal: async (url: string) => {
    if (typeof window !== 'undefined') {
      window.open(url, '_system') || window.open(url, '_blank') || (window.location.href = url)
      return true
    }
    return false
  }
}

export const ipcRenderer = {
  on: () => {},
  once: () => {},
  off: () => {},
  send: () => {},
  sendSync: () => {},
  invoke: async (channel: string, ...args: any[]) => {
    console.log("MOCK IPC INVOKE:", channel);
    if (channel === 'show-open-dialog') {
      const defaultPath = '/storage/emulated/0/Download'
      const res = typeof window !== 'undefined' && window.prompt
        ? window.prompt('Enter local folder path for the repository:', defaultPath)
        : defaultPath
      return res ? { canceled: false, filePaths: [res] } : { canceled: true, filePaths: [] }
    }
    if (channel === 'show-save-dialog') {
      const defaultPath = '/storage/emulated/0/Download'
      const res = typeof window !== 'undefined' && window.prompt
        ? window.prompt('Enter local path to create/save repository:', defaultPath)
        : defaultPath
      return res ? { canceled: false, filePath: res } : { canceled: true, filePath: null }
    }
    if (channel === 'get-path') {
      return '/storage/emulated/0/Download'
    }
    if (channel === 'get-current-window-zoom-factor') {
      return 1
    }
    if (channel === 'get-current-window-state') {
      return { x: 0, y: 0, width: 800, height: 600, isMaximized: false, isFullScreen: false }
    }
    if (channel === 'should-use-dark-colors') {
      return false
    }
    if (channel === 'get-notifications-permission') {
      return 'granted'
    }
    if (channel === 'get-main-process-config') {
      return { titleBarStyle: 'custom', hideWindowOnQuit: false }
    }
    if (channel === 'get-config-migration-result') {
      return null
    }
    return null
  }
}
export const webUtils = { getPathForFile: (f: any) => f.path || '' }
export const promisify = (fn: any) => fn
export const release = () => '1.0.0'
export const type = () => 'Android'
export const platform = () => 'android'
export const arch = () => 'arm64'
export const pathToFileURL = (p: string) => ({ href: p })
export const fileURLToPath = (p: string) => p
export const homedir = () => '/'
export const tmpdir = () => '/tmp'

export const inherits = (ctor: any, superCtor: any) => {
  if (superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    })
  }
}

// Dugite Mock Exports
export enum GitError {
  HTTPSAuthenticationFailed = 0,
  SSHAuthenticationFailed = 1,
  SSHPermissionDenied = 2,
  SSHKeyAuditUnverified = 3,
  BadConfigValue = 4,
  RemoteDisconnection = 5,
  HostDown = 6,
  RebaseConflicts = 7,
  MergeConflicts = 8,
  HTTPSRepositoryNotFound = 9,
  SSHRepositoryNotFound = 10,
  PushNotFastForward = 11,
  BranchDeletionFailed = 12,
  DefaultBranchDeletionFailed = 13,
  RevertConflicts = 14,
  EmptyRebasePatch = 15,
  NoMatchingRemoteBranch = 16,
  NothingToCommit = 17,
  NoSubmoduleMapping = 18,
  SubmoduleRepositoryDoesNotExist = 19,
  InvalidSubmoduleSHA = 20,
  LocalPermissionDenied = 21,
  InvalidMerge = 22,
  InvalidRebase = 23,
  NonFastForwardMergeIntoEmptyHead = 24,
  PatchDoesNotApply = 25,
  BranchAlreadyExists = 26,
  BadRevision = 27,
  NotAGitRepository = 28,
  ProtectedBranchForcePush = 29,
  ProtectedBranchRequiresReview = 30,
  PushWithFileSizeExceedingLimit = 31,
  HexBranchNameRejected = 32,
  ForcePushRejected = 33,
  InvalidRefLength = 34,
  CannotMergeUnrelatedHistories = 35,
  PushWithPrivateEmail = 36,
  LFSAttributeDoesNotMatch = 37,
  ProtectedBranchDeleteRejected = 38,
  ProtectedBranchRequiredStatus = 39,
  BranchRenameFailed = 40,
  PathDoesNotExist = 41,
  InvalidObjectName = 42,
  OutsideRepository = 43,
  LockFileAlreadyExists = 44,
  NoMergeToAbort = 45,
  NoExistingRemoteBranch = 46,
  LocalChangesOverwritten = 47,
  UnresolvedConflicts = 48,
  ConfigLockFileAlreadyExists = 49,
  RemoteAlreadyExists = 50,
  TagAlreadyExists = 51,
  MergeWithLocalChanges = 52,
  RebaseWithLocalChanges = 53,
  GPGFailedToSignData = 54,
  ConflictModifyDeletedInBranch = 55,
  MergeCommitNoMainlineOption = 56,
  UnsafeDirectory = 57,
  PathExistsButNotInRef = 58,
  PushWithSecretDetected = 59,
}

export const parseError = () => null
export const parseBadConfigValueErrorInfo = () => null
export class ExecError extends Error {
  public code: string = ''
  public stdout: string = ''
  public stderr: string = ''
  public cause: any = null
}
export const exec = async () => ({ exitCode: 0, stdout: '', stderr: '' })
export const resolveGitBinary = () => 'git'

// Registry-js Mock Exports
export const HKEY = {
  HKEY_CURRENT_USER: 'HKEY_CURRENT_USER',
  HKEY_LOCAL_MACHINE: 'HKEY_LOCAL_MACHINE',
  HKEY_CLASSES_ROOT: 'HKEY_CLASSES_ROOT',
  HKEY_USERS: 'HKEY_USERS',
  HKEY_PERFORMANCE_DATA: 'HKEY_PERFORMANCE_DATA',
  HKEY_CURRENT_CONFIG: 'HKEY_CURRENT_CONFIG',
  HKEY_DYN_DATA: 'HKEY_DYN_DATA'
}

export enum RegistryValueType {
  REG_SZ = 'REG_SZ',
  REG_EXPAND_SZ = 'REG_EXPAND_SZ',
  REG_BINARY = 'REG_BINARY',
  REG_DWORD = 'REG_DWORD',
  REG_MULTI_SZ = 'REG_MULTI_SZ'
}

export const enumerateValues = () => []
export const enumerateKeys = () => []
export const getValue = () => null
export const setValue = () => {}

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
  realpath,
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
  fileURLToPath,
  inherits,
  GitError,
  parseError,
  parseBadConfigValueErrorInfo,
  ExecError,
  exec,
  resolveGitBinary,
  HKEY,
  RegistryValueType,
  enumerateValues,
  enumerateKeys,
  getValue,
  setValue,
  homedir,
  tmpdir,
  mkdir,
  mkdirSync,
  writeFile,
  writeFileSync,
  readFile,
  readFileSync,
  readdir,
  readdirSync,
  unlink,
  unlinkSync,
  rm,
  rmSync,
  lstat,
  lstatSync,
  access,
  accessSync,
  copyFile,
  copyFileSync,
  mkdtemp,
  mkdtempSync,
  readlink,
  readlinkSync,
  symlink,
  symlinkSync,
  appendFile,
  appendFileSync,
  open,
  cp,
  cpSync,
  constants
}