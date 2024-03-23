class Logger {
  component: string;

  private constructor(component: string) {
    this.component = component;
  }

  /**
   * Create a new logger instance.
   * @param component Component name.
   * @returns A new logger instance.
   */
  static new(component: string) {
    return new Logger(component);
  }

  /**
   * Prefix a function name with the component name.
   * @param func The function name.
   * @returns A string with the component and function name.
   */
  private prefix(func: string) {
    return `[${this.component}][${func}]`;
  }

  /**
   * Log a message with a function name.
   * @param func The function name.
   * @param args The arguments to log.
   */
  log(func: string, ...args: any[]) {
    console.log(this.prefix(func), ...args);
  }

  /**
   * Log an error with a function name.
   * @param func The function name.
   * @param args The arguments to log.
   */
  error(func: string, ...args: any[]) {
    console.error(this.prefix(func), ...args);
  }
}

export { Logger };
