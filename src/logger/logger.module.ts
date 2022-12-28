import { DynamicModule } from '@nestjs/common';
import { createLoggerProviders } from './logger.providers';
import { LoggerService } from './logger.service';

export class LoggerModule {
    static forRoot(): DynamicModule {
        const prefixeLoggerProviders = createLoggerProviders();
        return {
            module: LoggerModule,
            providers: [LoggerService, ...prefixeLoggerProviders],
            exports: [LoggerService, ...prefixeLoggerProviders],
        };
    }
}