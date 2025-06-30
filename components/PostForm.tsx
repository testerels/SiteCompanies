import { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  width: 100%;
  color: #a1a1aa;
  font-size: 1rem;
  margin-bottom: 0.3rem;
  margin-top: 1rem;
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem 1rem;
  border-radius: 10px;
  border: none;
  background: #18181b;
  color: #f1f5f9;
  font-size: 1.05rem;
  margin-bottom: 0.7rem;
  outline: none;
  box-shadow: 0 1px 4px rgba(24,24,27,0.08);
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 0.7rem 1rem;
  border-radius: 10px;
  border: none;
  background: #18181b;
  color: #f1f5f9;
  font-size: 1.05rem;
  margin-bottom: 0.7rem;
  outline: none;
  box-shadow: 0 1px 4px rgba(24,24,27,0.08);
  resize: vertical;
`;

const Button = styled.button`
  padding: 0.85rem 1.7rem;
  border-radius: 10px;
  border: none;
  background: linear-gradient(90deg, #6366f1 0%, #0ea5e9 100%);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  margin-top: 1rem;
  box-shadow: 0 2px 8px rgba(99,102,241,0.12);
  &:hover {
    background: linear-gradient(90deg, #818cf8 0%, #38bdf8 100%);
    transform: translateY(-2px) scale(1.03);
  }
`;

const Success = styled.p`
  color: #22c55e;
  font-weight: 600;
  margin-top: 1rem;
`;

const Error = styled.p`
  color: #ef4444;
  font-weight: 600;
  margin-top: 1rem;
`;

export default function PostForm({ onSuccess }: { onSuccess?: () => void }) {
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (!image.trim() || !content.trim()) {
            setError('Заполните все поля!');
            return;
        }

        const res = await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: image.trim(), content: content.trim() }),
        });

        if (res.ok) {
            setSuccess(true);
            setImage('');
            setContent('');
            if (onSuccess) onSuccess();
        } else {
            const data = await res.json();
            setError(data.error || 'Ошибка при публикации');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Label htmlFor="image">Ссылка на картинку</Label>
            <Input
                id="image"
                type="text"
                placeholder="https://..."
                value={image}
                onChange={e => setImage(e.target.value)}
            />
            <Label htmlFor="content">Текст поста</Label>
            <Textarea
                id="content"
                placeholder="Текст новости..."
                value={content}
                onChange={e => setContent(e.target.value)}
            />
            <Button type="submit">Опубликовать</Button>
            {success && <Success>Пост опубликован!</Success>}
            {error && <Error>{error}</Error>}
        </Form>
    );
}