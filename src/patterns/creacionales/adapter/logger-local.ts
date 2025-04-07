export interface ILogger {
    log(msg: string): void
    error(msg: string): void
    warn(msg: string): void
}

enum Level {
    LOG = 'log',
    ERROR = 'error',
    WARN = 'warn'
}

export class LocalLogger implements ILogger {
    constructor(private file: string) {
        this.file = file
    }

    private formatMessage(level: Level, msg: string) {
        const timestamp = new Date().toISOString()
        return `[${timestamp} ${level}] [${this.file}] ${msg}`
    }

    log(msg: string) {
        console.log(this.formatMessage(Level.LOG, msg))
    }

    error(msg: string) {
        console.error(this.formatMessage(Level.ERROR, msg))
    }

    warn(msg: string) {
        console.log(this.formatMessage(Level.WARN, msg))
    }
}
