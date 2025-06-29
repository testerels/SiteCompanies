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

const TeamGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin-top: 2rem;
`;

const MemberCard = styled.div`
  background: #23272f;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(56,189,248,0.10);
  padding: 2rem 2.5rem;
  min-width: 220px;
  max-width: 260px;
  color: #f1f5f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(-6px) scale(1.03);
    box-shadow: 0 8px 32px rgba(56,189,248,0.18);
  }
`;

const Avatar = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #38bdf8 40%, #6366f1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  color: #fff;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const Name = styled.h2`
  font-size: 1.15rem;
  color: #38bdf8;
  margin-bottom: 0.3rem;
  font-weight: 700;
`;

const Role = styled.p`
  color: #a1a1aa;
  font-size: 1rem;
  margin-bottom: 0.7rem;
`;

const Bio = styled.p`
  color: #cbd5e1;
  font-size: 0.98rem;
  text-align: center;
`;

export default function TeamPage() {
    return (
        <Wrapper>
            <Title>Наша команда</Title>
            <Description>
                Мы — Digital Night Team. Каждый из нас вносит свой вклад в общее дело, чтобы создавать лучшие продукты для вас!
            </Description>
            <TeamGrid>
                <MemberCard>
                    <Avatar>🧑‍💻</Avatar>
                    <Name>Алексей Иванов</Name>
                    <Role>Frontend Developer</Role>
                    <Bio>Эксперт по React и Next.js, любит тёмные темы и современные UI-фреймворки.</Bio>
                </MemberCard>
                <MemberCard>
                    <Avatar>👩‍🎨</Avatar>
                    <Name>Мария Смирнова</Name>
                    <Role>UI/UX Designer</Role>
                    <Bio>Создаёт стильные интерфейсы и заботится о каждом пикселе и эмоции пользователя.</Bio>
                </MemberCard>
                <MemberCard>
                    <Avatar>🧑‍🔧</Avatar>
                    <Name>Игорь Кузнецов</Name>
                    <Role>Backend Developer</Role>
                    <Bio>Отвечает за надёжность, скорость и безопасность серверной части наших проектов.</Bio>
                </MemberCard>
                {/* Добавь ещё участников по желанию */}
            </TeamGrid>
        </Wrapper>
    );
}