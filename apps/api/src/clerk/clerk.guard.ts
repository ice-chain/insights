import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { Clerk, SignedInAuthObject } from '@clerk/clerk-sdk-node';
import { Request } from 'express';

// TODO: create module https://github.com/devagrawal09/clerk-nest-example/blob/main/api/src/clerk.module.ts
@Injectable()
export class AuthGuard implements CanActivate {
  private clerkService: ReturnType<typeof Clerk>;

  constructor() {
    this.clerkService = Clerk({
      secretKey: process.env.CLERK_SECRET_KEY,
      publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const authState = await this.clerkService.authenticateRequest({ headerToken: token });

      if (!authState.isSignedIn) return false;

      const auth = authState.toAuth();

      request['auth'] = auth;

    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // Note: Clerk stores the clientToken in a cookie
    // named "__session" for Firebase compatibility
    const clientToken = request.cookies['__session'];

    return clientToken;
  }
}

/**
 * Custom decorator for adding principal to request object.
 *
 * @type {(...dataOrPipes: Type<PipeTransform> | PipeTransform | any[]) => ParameterDecorator}
 */
export const Auth = createParamDecorator((data: string, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().auth as SignedInAuthObject;
});