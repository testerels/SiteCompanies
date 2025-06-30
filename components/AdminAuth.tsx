'use client';

import { useState } from 'react';
import * as Label from '@radix-ui/react-label';

export default function AdminAuth({ children }: { children: React.ReactNode }) {
    const [isAuth, setIsAuth] = useState(false);
    const [input, setInput] = useState('');

    const ADMIN_PASSWORD = '123qweasddsa';

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (input === ADMIN_PASSWORD) setIsAuth(true);
        else alert('Неверный пароль');
    }

    if (!isAuth) {
        return (
            <div className="admin-auth-wrapper">
                <form onSubmit={handleSubmit} className="admin-auth-form">
                    <h2>Вход для администратора</h2>
                    <input
                        id="admin-password"
                        type="password"
                        placeholder="Введите пароль"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        className="admin-auth-input"
                        autoComplete="current-password"
                    />
                    <button type="submit" className="admin-auth-btn">Войти</button>
                </form>
                <style jsx>{`
                    .admin-auth-wrapper {
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: linear-gradient(120deg, #18181b 0%, #23272f 100%);
                    }
                    .admin-auth-form {
                        background: #23272f;
                        padding: 32px 28px;
                        border-radius: 16px;
                        box-shadow: 0 4px 24px rgba(56,189,248,0.10);
                        max-width: 350px;
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .admin-auth-form h2 {
                        color: #38bdf8;
                        margin-bottom: 24px;
                        font-size: 1.3rem;
                        font-weight: 700;
                        text-align: center;
                    }
                    .admin-auth-label {
                        color: #a1a1aa;
                        font-size: 1rem;
                        margin-bottom: 8px;
                        align-self: flex-start;
                    }
                    .admin-auth-input {
                        width: 100%;
                        padding: 12px;
                        margin-bottom: 18px;
                        border-radius: 8px;
                        border: 1px solid #38bdf8;
                        font-size: 1rem;
                        background: #18181b;
                        color: #f1f5f9;
                        outline: none;
                        transition: border 0.2s;
                    }
                    .admin-auth-input:focus {
                        border: 1.5px solid #38bdf8;
                    }
                    .admin-auth-btn {
                        width: 100%;
                        padding: 12px;
                        border-radius: 8px;
                        border: none;
                        background: #38bdf8;
                        color: #18181b;
                        font-weight: 700;
                        font-size: 1rem;
                        cursor: pointer;
                        transition: background 0.2s;
                    }
                    .admin-auth-btn:hover {
                        background: #0ea5e9;
                    }
                    @media (max-width: 600px) {
                        .admin-auth-form {
                            padding: 20px 10px;
                            max-width: 95vw;
                        }
                        .admin-auth-form h2 {
                            font-size: 1.1rem;
                        }
                    }
                `}</style>
            </div>
        );
    }

    return <>{children}</>;
}