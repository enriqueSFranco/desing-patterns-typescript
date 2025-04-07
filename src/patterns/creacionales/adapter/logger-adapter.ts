import winston from "winston";
import { ILogger } from "./logger-local";

export class WinstonAdapter implements ILogger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createWinstonLogger();
  }

  private createWinstonLogger() {
    return winston.createLogger({
      level: "info",
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message }) => {
              return `[${timestamp}] [${level}] ${message}`;
            })
          ),
        }),
        // Se podría añadir un archivo log si fuera necesario
        // new winston.transports.File({ filename: 'logs.log' })
      ],
    });
  }

  log(msg: string): void {
    this.logger.info(msg);
  }
  error(msg: string): void {
    this.logger.error(msg);
  }
  warn(msg: string): void {
    this.logger.warn(msg);
  }
}
