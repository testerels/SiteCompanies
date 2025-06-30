'use client';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useState } from 'react';
import PostForm from '../../components/PostForm';

const Wrapper = styled.main`
  min-height: 100vh;
  background: linear-gradient(120deg, #18181b 0%, #23272f 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Card = styled.section`
  background: #23272f;
  border-radius: 18px;
  padding: 2.2rem 2.5rem 2rem 2.5rem;
  box-shadow: 0 2px 32px rgba(0,0,0,0.18);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #f1f5f9;
  max-width: 540px;
  width: 100%;
  position: relative;
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
  font-size: 1.1rem;
  color: #a1a1aa;
  margin-bottom: 2.2rem;
  text-align: center;
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  background: #18181b;
  color: #a1a1aa;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #23272f;
    color: #fff;
  }
`;

const SuccessMessage = styled.div`
  color: #22c55e;
  font-weight: 600;
  margin-bottom: 1.2rem;
  text-align: center;
`;

const ManageLink = styled.a`
  margin-top: 2rem;
  color: #6366f1;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: #38bdf8;
  }
`;

export default function AdminPage() {
    const router = useRouter();
    const [success, setSuccess] = useState(false);

    // Выход
    const handleLogout = async () => {
        await fetch('/api/admin-logout', { method: 'POST' });
        router.push('/admin/login');
    };

    // После публикации нового поста
    const handleSuccess = () => {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
    };

    // Переход к управлению постами
    const goToManage = () => {
        router.push('/admin/posts');
    };

    return (
        <Wrapper>
            <Card>
                <LogoutButton onClick={handleLogout}>Выйти</LogoutButton>
                <Title>Админ-панель</Title>
                <Subtitle>
                    Здесь вы можете опубликовать новость для ленты.<br />
                    Заполните все поля и нажмите &laquo;Опубликовать&raquo;.
                </Subtitle>
                {success && <SuccessMessage>Пост успешно опубликован!</SuccessMessage>}
                <PostForm onSuccess={handleSuccess} />
                <ManageLink onClick={goToManage}>
                    Перейти к управлению и редактированию постов
                </ManageLink>
            </Card>
        </Wrapper>
    );
}