import { NextRequest, NextResponse } from 'next/server';

// Временное хранилище постов (в памяти)
let posts: {
    image: string;
    content: string;
    date: string;
}[] = [];

// Получить все посты
export async function GET() {
    return NextResponse.json(posts);
}

// Добавить новый пост
export async function POST(request: NextRequest) {
    const data = await request.json();
    // Валидация
    if (!data.image || !data.content) {
        return NextResponse.json({ error: 'Image and content are required' }, { status: 400 });
    }
    const newPost = {
        image: data.image,
        content: data.content,
        date: new Date().toISOString(), // Дата публикации
    };
    posts.push(newPost);
    return NextResponse.json({ success: true, post: newPost });
}