import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const postsFile = path.join(process.cwd(), 'data', 'posts.json');

function readPosts() {
    if (!fs.existsSync(postsFile)) return [];
    const data = fs.readFileSync(postsFile, 'utf-8');
    return JSON.parse(data);
}

function writePosts(posts: any[]) {
    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2), 'utf-8');
}

export async function GET() {
    const posts = readPosts();
    return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
    const { image, content } = await request.json();
    if (!image || !content) {
        return NextResponse.json({ error: 'Image and content are required' }, { status: 400 });
    }
    const posts = readPosts();
    const newPost = {
        id: Date.now().toString(),
        image,
        content,
        date: new Date().toISOString(),
    };
    posts.unshift(newPost);
    writePosts(posts);
    return NextResponse.json({ success: true, post: newPost });
}

export async function PUT(request: NextRequest) {
    const { id, image, content } = await request.json();
    if (!id || !image || !content) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    const posts = readPosts();
    const idx = posts.findIndex((p: any) => p.id === id);
    if (idx === -1) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    posts[idx] = { ...posts[idx], image, content };
    writePosts(posts);
    return NextResponse.json({ success: true, post: posts[idx] });
}

export async function DELETE(request: NextRequest) {
    const { id } = await request.json();
    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    let posts = readPosts();
    posts = posts.filter((p: any) => p.id !== id);
    writePosts(posts);
    return NextResponse.json({ success: true });
}