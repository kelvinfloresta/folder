import { Logger } from './Logger'

/**
 * It's only an example of a real implementation of `Logger`
 */
export class Console implements Logger {
  public readonly info = console.log
  public readonly warn = console.warn
  public readonly error = console.error
}
