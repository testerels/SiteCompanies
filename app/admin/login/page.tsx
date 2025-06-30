'use client';
import styled, { keyframes } from 'styled-components';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const slideUp = keyframes`
  from { transform: translateY(100%); opacity: 0.7; }
  to { transform: translateY(0); opacity: 1; }
`;

const slideDown = keyframes`
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(100%); opacity: 0.7; }
`;

const Wrapper = styled.main`
  min-height: 100vh;
  background: linear-gradient(120deg, #18181b 0%, #23272f 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #f1f5f9;
  font-weight: 800;
  margin-bottom: 1.2rem;
  letter-spacing: 1px;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #a1a1aa;
  margin-bottom: 2.5rem;
  text-align: center;
`;

const Form = styled.form`
  background: #23272f;
  border-radius: 18px;
  padding: 2.2rem 2.5rem 2rem 2.5rem;
  box-shadow: 0 2px 32px rgba(0,0,0,0.18);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #f1f5f9;
  max-width: 420px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  border: none;
  background: #18181b;
  color: #f1f5f9;
  font-size: 1.1rem;
  margin-bottom: 1.2rem;
  outline: none;
  box-shadow: 0 1px 4px rgba(24,24,27,0.08);
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

const Error = styled.p`
  color: #ef4444;
  margin-top: 1rem;
  font-weight: 600;
`;

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const res = await fetch('/api/admin-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        });
        if (res.ok) {
            router.push('/admin');
        } else {
            setError('Неверный пароль');
        }
    };

    return (
        <Wrapper>
            <Title>Вход в админ-панель</Title>
            <Subtitle>Для доступа введите пароль администратора</Subtitle>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button type="submit">Войти</Button>
                {error && <Error>{error}</Error>}
            </Form>
        </Wrapper>
    );
}