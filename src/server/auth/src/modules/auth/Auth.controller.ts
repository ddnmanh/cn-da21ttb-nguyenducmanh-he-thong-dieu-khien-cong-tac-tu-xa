import { Body, Controller } from "@nestjs/common";
import { AuthService } from "./service/Auth.service";
import { ConfigService } from "@nestjs/config";
import { AUTH_SERVICE_NAME, SignInReq, CommonRes, RegisterReq, ValidateTokenReq, ResendOTPVerifyRegisterAccountReq, OTPVerifyRegisterAccountReq } from "./auth.pb";
import { GrpcMethod } from "@nestjs/microservices";
import StandardizeRes from "src/config/response/response.config";
import { ServiceRes } from "src/DTO/ServiceRes.dto";

@Controller()
export class AutController {

    private readonly authService: AuthService;
    private readonly configService: ConfigService;

    constructor(aS: AuthService, cS: ConfigService) {
        this.authService = aS;
        this.configService = cS;
    }

    @GrpcMethod(AUTH_SERVICE_NAME, 'Register')
    public async register(@Body() payload: RegisterReq): Promise<CommonRes> {

        let data:ServiceRes = await this.authService.registerUser(payload);

        await this.authService.sendEmailOTP(data.data);

        return new StandardizeRes().code(data.message.length > 0 ? 400 : 200).body(data).formatResponse();
    }

    @GrpcMethod(AUTH_SERVICE_NAME, 'resendOtpVerifyRegisterAccount')
    public async resendOTPVerifyRegisterAccount(body: ResendOTPVerifyRegisterAccountReq): Promise<CommonRes> {
        let data:ServiceRes = await this.authService.resendOTPVerifyRegisterAccount(body);
        return new StandardizeRes().code(data.message.length > 0 ? 400 : 200).body(data).formatResponse();
    }

    @GrpcMethod(AUTH_SERVICE_NAME, 'otpVerifyRegisterAccount')
    public async otpVerifyRegisterAccount(body: OTPVerifyRegisterAccountReq): Promise<CommonRes> {
        let data:ServiceRes = await this.authService.otpVerifyRegisterAccount(body);
        return new StandardizeRes().code(data.message.length > 0 ? 400 : 200).body(data).formatResponse();
    }

}
