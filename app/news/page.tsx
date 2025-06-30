'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px) scale(0.98);}
  to { opacity: 1; transform: translateY(0) scale(1);}
`;

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

const Title = styled.h1`
  font-size: 2rem;
  color: #f1f5f9;
  font-weight: 800;
  margin-bottom: 2rem;
  letter-spacing: 1px;
  text-align: center;
`;

const NewsList = styled.div`
  width: 100%;
  max-width: 1400px;
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

const NewsCard = styled.button<{ delay?: number }>`
  background: #23272f;
  border-radius: 18px;
  box-shadow: 0 2px 32px rgba(0,0,0,0.12);
  padding: 1.5rem 2rem;
  color: #f1f5f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 350px;
  opacity: 0;
  animation: ${fadeInUp} 0.6s cubic-bezier(.22,1,.36,1) forwards;
  animation-delay: ${({ delay }) => delay || 0}ms;
  border: none;
  cursor: pointer;
  transition: 
    box-shadow 0.2s, 
    transform 0.2s, 
    background 0.2s;
  outline: none;

  &:hover, &:focus {
    box-shadow: 0 6px 32px 0 #6366f1cc, 0 2px 32px rgba(0,0,0,0.18);
    transform: scale(1.025) translateY(-4px);
    background: #30334a;
  }
`;

const NewsImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
  background: #18181b;
`;

const NewsContent = styled.p`
  font-size: 1.1rem;
  color: #e5e7eb;
  margin-bottom: 1rem;
  text-align: center;
  word-break: break-word;
`;

const NewsDate = styled.span`
  font-size: 0.95rem;
  color: #a1a1aa;
`;

const Loader = styled.div`
  color: #a1a1aa;
  text-align: center;
  margin: 2rem 0;
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

const DialogImage = styled.img`
  width: 100%;
  max-width: 320px;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1.2rem;
  background: #18181b;
`;

const DialogContent = styled.p`
  font-size: 1.15rem;
  color: #e5e7eb;
  margin-bottom: 1.2rem;
  text-align: center;
`;

const DialogDate = styled.span`
  font-size: 1rem;
  color: #a1a1aa;
`;

const CloseButton = styled.button`
  margin-top: 1.5rem;
  padding: 0.7rem 1.5rem;
  border-radius: 10px;
  border: none;
  background: #18181b;
  color: #a1a1aa;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #23272f;
    color: #fff;
  }
`;

const PAGE_SIZE = 9;

export default function NewsPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    // Для модального окна
    const [open, setOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<any | null>(null);

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        const res = await fetch('/api/posts');
        const allPosts = await res.json();
        const start = 0;
        const end = page * PAGE_SIZE;
        setPosts(allPosts.slice(0, end));
        setHasMore(end < allPosts.length);
        setLoading(false);
    }, [page]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    useEffect(() => {
        if (!hasMore) return;
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    setPage(prev => prev + 1);
                }
            },
            { threshold: 1 }
        );
        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [hasMore]);

    // Открытие модального окна
    const handleCardClick = (post: any) => {
        setSelectedPost(post);
        setOpen(true);
    };

    return (
        <Wrapper>
            <Title>Новости компании</Title>
            <NewsList>
                {posts.length === 0 && !loading && <NewsContent>Постов пока нет.</NewsContent>}
                {posts.map((post, i) => (
                    <Dialog.Root key={post.id || i} open={open && selectedPost === post} onOpenChange={setOpen}>
                        <Dialog.Trigger asChild>
                            <NewsCard delay={i * 80} onClick={() => handleCardClick(post)}>
                                {post.image && <NewsImage src={post.image} alt="Картинка поста" />}
                                <NewsContent>{post.content}</NewsContent>
                                <NewsDate>
                                    {new Date(post.date).toLocaleString('ru-RU', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </NewsDate>
                            </NewsCard>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <StyledDialogOverlay />
                            <StyledDialogContent>
                                {selectedPost && (
                                    <>
                                        <Dialog.Title style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem', textAlign: 'center' }}>
                                            Новость
                                        </Dialog.Title>
                                        {selectedPost.image && <DialogImage src={selectedPost.image} alt="Картинка поста" />}
                                        <DialogContent>{selectedPost.content}</DialogContent>
                                        <DialogDate>
                                            {new Date(selectedPost.date).toLocaleString('ru-RU', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </DialogDate>
                                        <Dialog.Close asChild>
                                            <CloseButton>Закрыть</CloseButton>
                                        </Dialog.Close>
                                    </>
                                )}
                            </StyledDialogContent>
                        </Dialog.Portal>
                    </Dialog.Root>
                ))}
            </NewsList>
            {hasMore && (
                <Loader ref={loaderRef}>
                    {loading ? 'Загрузка...' : 'Прокрутите вниз для загрузки ещё новостей'}
                </Loader>
            )}
        </Wrapper>
    );
}