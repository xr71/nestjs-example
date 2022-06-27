import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import Strategy from "passport-headerapikey";
import {ConfigService} from "@nestjs/config";


@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key')
{
    constructor(private readonly configService: ConfigService)
    {
        super({header: 'X-API-KEY', prefix: ''},
              true,
              async (apiKey, done) => {
                  return this.validate(apiKey, done);
              });
    }


    public validate = (apiKey: string, done: (error: Error, data) => {}) =>
    {
        // console.log(apiKey);
        // console.log(this.configService.get("NEST_API_KEY"));
        if (this.configService.get<string>('NEST_API_KEY') === apiKey)
        {
            done(null, true);
        }
        done(new UnauthorizedException(), null);
    }
}
