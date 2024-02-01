export interface MResponse<T = unknown> {
  code: number
  message: string
  data?: T
}
