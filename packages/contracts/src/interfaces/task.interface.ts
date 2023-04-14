import { IBase } from './base.interface'

export interface ITask extends IBase {
  title: string
  description?: string
  complete?: boolean
}
