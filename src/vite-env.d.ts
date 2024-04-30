/// <reference types="vite/client" />

interface Data<T> {
  code: string
  msg: string
  result: T
}

export declare module "axios" {
  interface AxiosResponse extends Data<T> {}
}
