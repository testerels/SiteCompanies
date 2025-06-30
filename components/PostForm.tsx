'use client';

import { useState } from 'react';

export default function PostForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
        });
        setTitle('');
        setContent('');
        alert('Пост создан!');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Заголовок"
                required
            />
            <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Текст поста"
                required
            />
            <button type="submit">Создать пост</button>
        </form>
    );
}