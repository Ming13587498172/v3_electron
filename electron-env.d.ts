export interface IElectronAPI {
  setEchartsOptions: () => (Promise<void>),
}
export {}
declare global {
  interface Window {
    electron: IElectronAPI
  }
}
