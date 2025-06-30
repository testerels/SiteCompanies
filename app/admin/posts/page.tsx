'use client';
import { useRouter } from 'next/navigation';
import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Wrapper = styled.main`
  min-height: 100vh;
  background: linear-gradient(120deg, #18181b 0%, #23272f 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
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
  max-width: 1400px;
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

const TopActions = styled.div`
  display: flex;
  gap: 1rem;
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
`;

const ActionButton = styled.button`
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

const PostList = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1100px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const PostItem = styled.button`
  background: #18181b;
  border-radius: 12px;
  padding: 1rem 1.2rem;
  color: #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  border: none;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s, background 0.2s;
  &:hover, &:focus {
    box-shadow: 0 6px 32px 0 #6366f1cc, 0 2px 32px rgba(0,0,0,0.18);
    transform: scale(1.025) translateY(-4px);
    background: #23272f;
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  background: #18181b;
`;

const PostContent = styled.p`
  color: #e5e7eb;
  margin-bottom: 0.3rem;
  text-align: center;
`;

const PostDate = styled.span`
  font-size: 0.95rem;
  color: #a1a1aa;
  text-align: center;
`;

const StyledDialogOverlay = styled(Dialog.Overlay)`
  background: rgba(24, 24, 27, 0.7);
  position: fixed;
  inset: 0;
  z-index: 100;
  animation: ${fadeIn} 0.25s cubic-bezier(.22,1,.36,1);
`;

const StyledDialogContent = styled(Dialog.Content)`
position: fixed;
top: 50%;
left: 50%;
width: 95vw;
max-width: 420px;
background: #23272f;
border-radius: 18px;
padding: 2.2rem 2.5rem 2rem 2.5rem;
box-shadow: 0 8px 32px rgba(0,0,0,0.35);
color: #f1f5f9;
z-index: 101;
transform: translate(-50%, -50%);
animation: ${fadeIn} 0.25s cubic-bezier(.22,1,.36,1);
display: flex;
flex-direction: column;
align-items: center;
`;

const EditInput = styled.input`
padding: 0.5rem;
border-radius: 6px;
border: none;
background: #23272f;
color: #f1f5f9;
width: 100%;
margin-bottom: 0.7rem;
`;

const EditTextarea = styled.textarea`
padding: 0.5rem;
border-radius: 6px;
border: none;
background: #23272f;
color: #f1f5f9;
min-height: 60px;
resize: vertical;
width: 100%;
margin-bottom: 0.7rem;
`;

const DialogActions = styled.div`
display: flex;
gap: 0.7rem;
margin-top: 0.5rem;
`;

const Error = styled.p`
color: #ef4444;
font-weight: 600;
margin-top: 0.5rem;
`;

export default function AdminPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [editImage, setEditImage] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editError, setEditError] = useState('');
  const [open, setOpen] = useState(false);

  // Получение постов
  const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Открыть модалку для редактирования
  const openEditModal = (post: any) => {
    setSelectedPost(post);
    setEditImage(post.image);
    setEditContent(post.content);
    setEditError('');
    setOpen(true);
  };

  // Закрыть модалку
  const closeEditModal = () => {
    setOpen(false);
    setSelectedPost(null);
    setEditImage('');
    setEditContent('');
    setEditError('');
  };

  // Сохранить изменения
  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editImage.trim() || !editContent.trim()) {
      setEditError('Заполните все поля!');
      return;
    }
    const res = await fetch('/api/posts', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selectedPost.id, image: editImage, content: editContent }),
    });
    if (res.ok) {
      closeEditModal();
      fetchPosts();
    } else {
      setEditError('Ошибка при сохранении');
    }
  };

  // Удаление поста
  const handleDelete = async (id: string) => {
    if (!confirm('Удалить пост?')) return;
    await fetch('/api/posts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchPosts();
    closeEditModal();
  };

  // Выход
  const handleLogout = async () => {
    await fetch('/api/admin-logout', { method: 'POST' });
    router.push('/admin/login');
  };

  // Вернуться к добавлению поста
  const goToAddPost = () => {
    router.push('/admin');
  };

  return (
    <Wrapper>
      <Card>
        <TopActions>
          <ActionButton onClick={goToAddPost}>Добавить пост</ActionButton>
          <ActionButton onClick={handleLogout}>Выйти</ActionButton>
        </TopActions>
        <Title>Управление постами</Title>
        <PostList>
          {posts.length === 0 && <PostContent>Постов пока нет.</PostContent>}
          {posts.map(post => (
            <Dialog.Root key={post.id} open={open && selectedPost?.id === post.id} onOpenChange={setOpen}>
              <Dialog.Trigger asChild>
                <PostItem onClick={() => openEditModal(post)}>
                  {post.image && <PostImage src={post.image} alt="" />}
                  <PostContent>{post.content}</PostContent>
                  <PostDate>
                    {new Date(post.date).toLocaleString('ru-RU', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </PostDate>
                </PostItem>
              </Dialog.Trigger>
              <Dialog.Portal>
                <StyledDialogOverlay />
                <StyledDialogContent>
                  <Dialog.Title style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', textAlign: 'center' }}>
                    Редактировать пост
                  </Dialog.Title>
                  <form onSubmit={handleEdit} style={{ width: '100%' }}>
                    <EditInput
                      type="text"
                      value={editImage}
                      placeholder="Ссылка на картинку"
                      onChange={e => setEditImage(e.target.value)}
                    />
                    <EditTextarea
                      value={editContent}
                      placeholder="Текст поста"
                      onChange={e => setEditContent(e.target.value)}
                    />
                    <DialogActions>
                      <ActionButton type="submit">Сохранить</ActionButton>
                      <Dialog.Close asChild>
                        <ActionButton type="button" onClick={closeEditModal}>Отмена</ActionButton>
                      </Dialog.Close>
                      <ActionButton
                        type="button"
                        style={{ background: '#ef4444', color: '#fff' }}
                        onClick={() => {
                          closeEditModal();
                          handleDelete(selectedPost.id);
                        }}
                      >
                        Удалить
                      </ActionButton>
                    </DialogActions>
                    {editError && <Error>{editError}</Error>}
                  </form>
                </StyledDialogContent>
              </Dialog.Portal>
            </Dialog.Root>
          ))}
        </PostList>
      </Card>
    </Wrapper>
  );
}