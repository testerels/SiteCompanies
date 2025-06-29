'use client';
import styled, { keyframes } from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0.7;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0.7;
  }
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

const StyledDialogOverlay = styled(Dialog.Overlay)`
  background: rgba(24, 24, 27, 0.7);
  position: fixed;
  inset: 0;
  z-index: 100;
  transition: opacity 0.3s;
  &[data-state="open"] {
    opacity: 1;
  }
  &[data-state="closed"] {
    opacity: 0;
  }
`;

const StyledDialogContent = styled(Dialog.Content)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  width: 100%;
  max-width: 420px;
  background: #23272f;
  border-radius: 18px 18px 0 0;
  padding: 2.2rem 2.5rem 2rem 2.5rem;
  box-shadow: 0 -8px 32px rgba(0,0,0,0.35);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #f1f5f9;
  z-index: 101;

  &[data-state="open"] {
    animation: ${slideUp} 0.35s cubic-bezier(.22,1,.36,1);
  }
  &[data-state="closed"] {
    animation: ${slideDown} 0.3s cubic-bezier(.22,1,.36,1);
  }
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

const CloseButton = styled(Button)`
  background: #18181b;
  color: #a1a1aa;
  margin-top: 0;
  font-weight: 600;
  &:hover {
    background: #23272f;
    color: #fff;
  }
`;

export default function Home() {
    return (
        <Wrapper>
            <Title> Добро пожаловать на сайт АО "АК" Беркут"</Title>
            <Subtitle>
                Мы являемся лидером в области конструирования и создания сверхлегких<br />
                летательных аппаратов вертолётного типа.<br /><br />
                Откройте диалог, чтобы узнать больше о нашей команде!
            </Subtitle>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <Button>Подробнее о нас</Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <StyledDialogOverlay />
                    <StyledDialogContent>
                        <Dialog.Title style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
                            О команде 🔧
                        </Dialog.Title>
                        <Dialog.Description style={{ color: '#a1a1aa', marginBottom: '1.5rem', textAlign: 'center' }}>
                            АО "АК 'Беркут' — лидер в области конструирования и создания сверхлёгких летательных аппаратов вертолётного типа. Мы объединяем опыт, инновации и современные технологии для разработки надёжных и эффективных решений в авиации.
                        </Dialog.Description>
                        <Dialog.Close asChild>
                            <CloseButton>Закрыть</CloseButton>
                        </Dialog.Close>
                    </StyledDialogContent>
                </Dialog.Portal>
            </Dialog.Root>
        </Wrapper>
    );
}