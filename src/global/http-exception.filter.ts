import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    /**
     * @author JungSoyi
     * 
     * @param exception 현재 처리중인 예외 객체
     * @param host host ArgumentsHost 객체 -> 핸들러에 전달되는 인수 검색 메서드 제공
     * @returns 
     */
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        /**
         * @author JungSoyi
         * @description HttpExcdeption에서 전송한 데이터를 추출할 때 사용
         */
        const res: any = exception.getResponse();

        const url: string = request.url;
        const error: string = res.error;
        const timestamp: string = new Date().toISOString();

        console.log('request url: ', url);
        console.log('error info: ', error);
        console.log('timestamp: ', timestamp);

        response.status(status).json({
            success: false,
            message: res.message
        });
    }
}