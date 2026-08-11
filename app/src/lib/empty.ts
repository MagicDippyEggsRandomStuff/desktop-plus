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

export const realpath: any = async (p: string) => p
realpath.native = async (p: string) => p

export const promises = { stat, existsSync, realpath }
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
  tmpdir
}
