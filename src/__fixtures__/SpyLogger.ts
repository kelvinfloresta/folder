import { Logger } from '../Logger/Logger'

export class SpyLogger implements Logger {
  readonly info = jest.fn()
  readonly warn = jest.fn()
  readonly error = jest.fn()
}
