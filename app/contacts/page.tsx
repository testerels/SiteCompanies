'use client';

import styled from 'styled-components';

const Wrapper = styled.main`
  min-height: 100vh;
  background: linear-gradient(120deg, #18181b 0%, #23272f 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 80px;
`;

const Title = styled.h1`
  font-size: 2.3rem;
  color: #38bdf8;
  font-weight: 800;
  margin-bottom: 1.2rem;
  letter-spacing: 1px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.15rem;
  color: #a1a1aa;
  max-width: 600px;
  text-align: center;
  margin-bottom: 2.5rem;
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContactItem = styled.li`
  background: #23272f;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(56,189,248,0.10);
  padding: 1.5rem 2rem;
  color: #f1f5f9;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-size: 1.08rem;
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 32px rgba(56,189,248,0.18);
  }
`;

const ContactLink = styled.a`
  color: #38bdf8;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
  &:hover {
    color: #0ea5e9;
    text-decoration: underline;
  }
`;

export default function ContactsPage() {
    return (
        <Wrapper>
            <Title>Контакты</Title>
            <Description>
                Свяжитесь с нами любым удобным способом — мы всегда открыты для новых идей, сотрудничества и обратной связи!
            </Description>
            <ContactList>
                <ContactItem>
                    📧 Email:&nbsp;
                    <ContactLink href="ditev.sergey@gmail.com">
                        ditev.sergey@gmail.com
                    </ContactLink>
                </ContactItem>
                <ContactItem>
                    💬 Telegram:&nbsp;
                    <ContactLink href="https://t.me/notesterone" target="_blank" rel="noopener noreferrer">
                        @notesterone
                    </ContactLink>
                </ContactItem>
                <ContactItem>
                    🌐 Сайт:&nbsp;
                    <ContactLink href="https://site-companies.vercel.app/" target="_blank" rel="noopener noreferrer">
                        companies.vercel.app
                    </ContactLink>
                </ContactItem>
            </ContactList>
        </Wrapper>
    );
}