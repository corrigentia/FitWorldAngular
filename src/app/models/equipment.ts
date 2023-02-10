import { Name } from './name'

export class Equipment implements Name {
  constructor (public name: string, public price: number) {}
}
