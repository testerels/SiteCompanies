import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = '123456'; // Задай свой пароль

export async function POST(request: NextRequest) {
    const { password } = await request.json();
    if (password === ADMIN_PASSWORD) {
        const response = NextResponse.json({ success: true });
        response.cookies.set('admin', '1', { httpOnly: true, path: '/', maxAge: 60 * 60 });
        return response;
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}