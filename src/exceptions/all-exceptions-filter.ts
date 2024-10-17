import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ErrorException } from './error-exception';
import { ErrorCode } from './error-code';
import { WithSentry } from '@sentry/nestjs';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  @WithSentry()
  catch(exception: any, host: ArgumentsHost) {
    console.log(exception);
    // this.logger.instance().captureException(exception);

    let errorException: ErrorException;
    let httpStatusCode: number;

    if (exception instanceof ErrorException) {
      errorException = exception;
      httpStatusCode = exception.httpStatusCode;
    } else {
      errorException = new ErrorException(
        ErrorCode.UNDEFINED_ERROR,
        exception.response?.error ??
          exception.response?.message ??
          exception.message ??
          'Undefined Error',
        exception.message,
      );
      httpStatusCode = exception.status ?? errorException.httpStatusCode;
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    try {
      response.setHeader('X-Error-Message', errorException.message);
    } catch (exception: any) {
      response.setHeader('X-Error-Message', 'Undefined Error');
    }

    return response
      .setHeader('X-Error-Code', errorException.code)
      .status(httpStatusCode)
      .json(errorException.getErrors());
  }
}
