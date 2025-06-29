'use client';

import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

const FooterBar = styled.footer`
  width: 100%;
  background: linear-gradient(90deg, #18181b 0%, #23272f 100%);
  color: #a1a1aa;
  padding: 2rem 0 1.2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  box-shadow: 0 -2px 16px rgba(56,189,248,0.07);
`;

const LogoText = styled.span`
  font-weight: 700;
  font-size: 1.2rem;
  color: #38bdf8;
  letter-spacing: 1px;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const FooterLink = styled(Link)`
  color: #38bdf8;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  &:hover {
    color: #0ea5e9;
    text-decoration: underline;
  }
`;

const Copyright = styled.div`
  font-size: 0.98rem;
  color: #52525b;
  text-align: center;
`;

export default function Footer() {
    return (
        <FooterBar>
            <FooterLinks>
                <FooterLink href="/about">О компании</FooterLink>
                <FooterLink href="/team">Команда</FooterLink>
                <FooterLink href="/contacts">Контакты</FooterLink>
                <FooterLink href="https://t.me/notesterone" target="_blank" rel="noopener noreferrer">
                    Telegram
                </FooterLink>
            </FooterLinks>
            <Copyright>
                © {new Date().getFullYear()} АО "АК" Беркут". Все права защищены.
            </Copyright>
        </FooterBar>
    );
}