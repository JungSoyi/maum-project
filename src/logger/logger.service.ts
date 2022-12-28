import { Injectable, Scope } from "@nestjs/common";

@Injectable({
    scope: Scope.TRANSIENT,
})
export class LoggerService {
    private prefix?: string;

    log(message: string) {
        let formattedMessage = message;

        if (this.prefix) {
            formattedMessage = `[${this.prefix}] ${message}`;
        }
        console.log(formattedMessage);
    }
    warn(message: string) {
        let formattedMessage = message;

        if (this.prefix) {
            formattedMessage = `[${this.prefix}] ${message}`;
        }
        console.warn(formattedMessage);
    }

    setPrefix(prefix: string) {
        this.prefix = prefix;
    }
}