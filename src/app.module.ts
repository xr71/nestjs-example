import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from "@nestjs/core";


@Module({
    imports: [
      ConfigModule.forRoot(),
      CacheModule.register(),
      AuthModule,
      ThrottlerModule.forRoot({ttl:60, limit: 5})
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ],
})

export class AppModule {}
