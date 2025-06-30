import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    // Разрешаем только /admin/login без авторизации
    if (
        request.nextUrl.pathname.startsWith('/admin') &&
        !request.nextUrl.pathname.startsWith('/admin/login')
    ) {
        const isAdmin = request.cookies.get('admin')?.value === '1';
        if (!isAdmin) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};