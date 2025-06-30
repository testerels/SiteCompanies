'use client';

import styled, { css } from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState, useEffect } from 'react';

const Nav = styled.nav<{ $scrolled: boolean }>`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 50;
  transition: background 0.3s, box-shadow 0.3s, backdrop-filter 0.3s;
  background: ${({ $scrolled }) =>
      $scrolled
          ? 'rgb(24,24,26)'
          : 'rgba(24, 24, 27, 0.55)'};
  box-shadow: ${({ $scrolled }) =>
      $scrolled
          ? '0 4px 24px rgba(0,0,0,0.25)'
          : 'none'};
  backdrop-filter: blur(12px);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const LogoText = styled.span`
  font-weight: 800;
  font-size: 1.0rem;
  color: #eeeef0;
  letter-spacing: 1px;
  text-shadow: 0 2px 8px rgba(56, 189, 248, 0.08);
`;

const NavLinks = styled.div<{ open?: boolean }>`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    display: ${({open}) => (open ? 'flex' : 'none')};
    position: absolute;
    top: 64px;
    left: 0;
    width: 100%;
    flex-direction: column;
    background: rgb(24, 24, 26);
    padding: 1.5rem 0 1rem 0;
    box-shadow: 0 8px 32px rgba(56, 189, 248, 0.10);
    z-index: 30;
    backdrop-filter: blur(12px);
  }
`;

const navLinkStyle = css`
  color: #f1f5f9;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.08rem;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;

  &:hover, &:focus {
    background: #38bdf8;
    color: #fff;
    outline: none;
  }
`;

const NavLink = styled(Link)`
  ${navLinkStyle}
`;

const DropdownTrigger = styled.a`
  ${navLinkStyle}
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3em;
  user-select: none;
`;

const Burger = styled.button<{ open: boolean }>`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 40;
  @media (max-width: 768px) {
    display: block;
  }
  span {
    display: block;
    width: 28px;
    height: 3px;
    background: #38bdf8;
    margin: 5px 0;
    border-radius: 2px;
    transition: 0.3s;
    position: relative;
  }
  span:nth-child(1) {
    transform: ${({ open }) => open ? 'rotate(45deg) translateY(8px)' : 'none'};
  }
  span:nth-child(2) {
    opacity: ${({ open }) => open ? 0 : 1};
  }
  span:nth-child(3) {
    transform: ${({ open }) => open ? 'rotate(-45deg) translateY(-8px)' : 'none'};
  }
`;

const StyledDropdownContent = styled(DropdownMenu.Content)`
  background: #23272f;
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(56,189,248,0.13);
  padding: 0.5rem 0;
  min-width: 160px;
  z-index: 100;
  backdrop-filter: blur(8px);
`;

const DropdownItem = styled(DropdownMenu.Item)`
  ${navLinkStyle}
  width: 100%;
  display: block;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  &:hover, &:focus {
    background: #0ea5e9;
    color: #fff;
    outline: none;
  }
`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Эффект для изменения прозрачности при скролле
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Проверка наличия cookie admin=1 и обновление при смене вкладки
  useEffect(() => {
    const checkAdmin = () => {
      setIsAdmin(document.cookie.includes('admin=1'));
    };
    checkAdmin();
    window.addEventListener('focus', checkAdmin);
    return () => window.removeEventListener('focus', checkAdmin);
  }, []);

  // Закрывать мобильное меню при переходе по ссылке
  const handleNavClick = () => setOpen(false);

  return (
      <Nav $scrolled={scrolled}>
        <NavContainer>
          <LogoContainer>
            <Image src="/logo.png" alt="Логотип" width={45} height={30} />
            <LogoText>АО &quot;АК Беркут&quot;</LogoText>
          </LogoContainer>
          <Burger
              open={open}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
          >
            <span />
            <span />
            <span />
          </Burger>
          <NavLinks open={open}>
            <NavLink href="/" onClick={handleNavClick}>Главная</NavLink>
            <NavLink href="/news" onClick={handleNavClick}>Новости</NavLink>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <DropdownTrigger href="#" onClick={e => e.preventDefault()}>
                  О нас <span style={{fontSize: '1.1em'}}>▼</span>
                </DropdownTrigger>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <StyledDropdownContent sideOffset={5}>
                  <DropdownItem asChild>
                    <NavLink href="/about" onClick={handleNavClick}>О компании</NavLink>
                  </DropdownItem>
                  <DropdownItem asChild>
                    <NavLink href="/team" onClick={handleNavClick}>Команда</NavLink>
                  </DropdownItem>
                </StyledDropdownContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
            <NavLink href="/contacts" onClick={handleNavClick}>Контакты</NavLink>
            {/* Кнопка админки только для авторизованного админа */}
            {isAdmin && (
                <NavLink href="/admin" onClick={handleNavClick} style={{marginLeft: '1.5rem', fontWeight: 700, color: '#22c55e'}}>
                  Админка
                </NavLink>
            )}
          </NavLinks>
        </NavContainer>
      </Nav>
  );
}