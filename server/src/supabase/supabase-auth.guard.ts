import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { SupabaseService } from "./supabase.service.js";



@Injectable()
export class SupabaseAuthGuard implements CanActivate {
    constructor(private supabase: SupabaseService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const header: string | undefined = req.headers['authorization'];
        const token = header?.startsWith('Bearer ') ? header.slice(7) : null;
        if (!token) throw new UnauthorizedException("Missing bearer token");

        const { data, error } = await this.supabase.client.auth.getUser(token);
        if (error || !data.user) {
            throw new UnauthorizedException('Invalid or expired token');
        }

        req.user = data.user;
        req.accessToken = token;

        return true;
    }
}