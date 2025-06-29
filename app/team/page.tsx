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
  gap: 2.5rem;
  justify-content: center;
  margin-top: 2rem;
`;

const MemberCard = styled.div`
  background: rgba(35, 39, 47, 0.98);
  border-radius: 24px;
  box-shadow: 0 8px 40px 0 rgba(56,189,248,0.10), 0 1.5px 12px 0 rgba(0,0,0,0.18);
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  min-width: 300px;
  max-width: 340px;
  min-height: 370px;
  color: #f1f5f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  transition: transform 0.22s, box-shadow 0.22s;
  margin-bottom: 2.5rem;
  &:hover {
    transform: translateY(-8px) scale(1.035);
    box-shadow: 0 16px 48px 0 rgba(56,189,248,0.18), 0 2px 16px 0 rgba(0,0,0,0.22);
  }
`;

const Avatar = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #38bdf8 10%, #6366f1 90%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 1.2rem;
  box-shadow: 0 2px 12px 0 rgba(56,189,248,0.18);
`;

const Name = styled.h2`
  font-size: 1.18rem;
  color: #38bdf8;
  margin-bottom: 0.2rem;
  font-weight: 700;
  text-align: center;
  min-height: 2.5em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Role = styled.p`
  color: #b3b3b3;
  font-size: 1.02rem;
  margin-bottom: 0.7rem;
  text-align: center;
  min-height: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Bio = styled.p`
  color: #ededed;
  font-size: 1.01rem;
  text-align: center;
  word-break: break-word;
  flex: 1 1 auto;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

export default function TeamPage() {
    return (
        <Wrapper>
            <Title>Наша команда</Title>
            <Description>
                Команда АО "АК Беркут" — это сплочённый коллектив инженеров, технологов и специалистов, объединённых страстью к авиации и инновациям.
            </Description>
            <TeamGrid>
                <MemberCard>
                    <Avatar>⚙️</Avatar>
                    <Name>Инженерный отдел</Name>
                    <Role>Проектирование и разработка</Role>
                    <Bio>
                        Отвечает за создание и внедрение новых технических решений, проектирование и испытания летательных аппаратов.
                    </Bio>
                </MemberCard>
                <MemberCard>
                    <Avatar>🔬</Avatar>
                    <Name>Технологический отдел</Name>
                    <Role>Производство и качество</Role>
                    <Bio>
                        Контролирует процессы сборки, тестирования и обеспечивает высокие стандарты качества продукции.
                    </Bio>
                </MemberCard>
                <MemberCard>
                    <Avatar>🛡️</Avatar>
                    <Name>Служба безопасности и поддержки</Name>
                    <Role>Надёжность и сопровождение</Role>
                    <Bio>
                        Обеспечивает безопасность эксплуатации, техническую поддержку и обучение клиентов.
                    </Bio>
                </MemberCard>
            </TeamGrid>
        </Wrapper>
    );
}