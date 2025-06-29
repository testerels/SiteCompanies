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

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin-top: 2rem;
`;

const Card = styled.div`
  background: #23272f;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(56,189,248,0.10);
  padding: 2rem 2.5rem;
  min-width: 260px;
  max-width: 320px;
  color: #f1f5f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-bottom: 2rem;
  &:hover {
    transform: translateY(-6px) scale(1.03);
    box-shadow: 0 8px 32px rgba(56,189,248,0.18);
  }
`;

const CardTitle = styled.h2`
  font-size: 1.2rem;
  color: #38bdf8;
  margin-bottom: 0.7rem;
  font-weight: 700;
`;

const CardText = styled.p`
  color: #a1a1aa;
  font-size: 1rem;
  text-align: center;
`;

export default function AboutPage() {
    return (
        <Wrapper>
            <Title>О компании</Title>
            <Description>
                АО "АК Беркут" — лидер в области конструирования и создания сверхлёгких летательных аппаратов вертолётного типа. Мы объединяем опыт, инновации и современные технологии для разработки надёжных и эффективных решений в авиации.
            </Description>
            <CardGrid>
                <Card>
                    <CardTitle>🚁 Технологии</CardTitle>
                    <CardText>
                        Используем передовые инженерные решения и современные материалы для создания уникальных вертолётов.
                    </CardText>
                </Card>
                <Card>
                    <CardTitle>🤝 Команда</CardTitle>
                    <CardText>
                        Наш коллектив — это профессионалы, увлечённые авиацией и стремящиеся к совершенству в каждом проекте.
                    </CardText>
                </Card>
                <Card>
                    <CardTitle>🔧 Надёжность</CardTitle>
                    <CardText>
                        Мы гарантируем высокое качество, безопасность и долговечность наших летательных аппаратов.
                    </CardText>
                </Card>
            </CardGrid>
        </Wrapper>
    );
}