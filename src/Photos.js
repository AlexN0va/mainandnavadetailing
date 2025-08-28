import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Car, Home, Zap, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PhotosContainer = styled.div`
  min-height: 100vh;
  background: var(--bg-primary);
`;

const Header = styled.header`
  background: var(--bg-secondary);
  padding: 2rem 20px;
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-primary);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--accent-primary);
    color: var(--bg-primary);
    transform: translateY(-2px);
  }
`;

const Section = styled.section`
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionIcon = styled.div`
  width: 80px;
  height: 80px;
  background: var(--gradient-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2rem;
  color: white;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const PhotoCard = styled(motion.div)`
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    border-color: var(--accent-primary);
    box-shadow: 0 20px 40px rgba(192, 192, 192, 0.2);
  }
`;

const PhotoPlaceholder = styled.div`
  width: 100%;
  height: 250px;
  background: linear-gradient(135deg, var(--bg-tertiary) 0%, var(--border-color) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 1.1rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    border: 3px solid var(--accent-primary);
    border-radius: 8px;
    opacity: 0.3;
  }
  
  &::after {
    content: '📸';
    font-size: 2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const PhotoCaption = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

const ComingSoon = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: var(--bg-secondary);
  border-radius: 20px;
  border: 2px dashed var(--border-color);
  margin: 2rem 0;
`;

function Photos() {
  const sections = [
    {
      id: 'exterior',
      title: 'Exterior Enhancement',
      icon: <Car />,
      description: 'Paint protection, decontamination, and shine enhancement',
      photos: [
        { caption: 'Before & After Paint Decontamination' },
        { caption: 'Wheel & Tire Restoration' },
        { caption: 'Complete Exterior Transformation' },
        { caption: 'Paint Protection Results' }
      ]
    },
    {
      id: 'interior',
      title: 'Interior Revival',
      icon: <Home />,
      description: 'Deep cleaning, carpet restoration, and odor elimination',
      photos: [
        { caption: 'Carpet Deep Clean Results' },
        { caption: 'Leather Conditioning' },
        { caption: 'Dashboard Restoration' },
        { caption: 'Complete Interior Transformation' }
      ]
    },
    {
      id: 'headlights',
      title: 'Headlight Restoration',
      icon: <Zap />,
      description: 'Multi-stage restoration for clarity and brightness',
      photos: [
        { caption: 'Before: Foggy Headlights' },
        { caption: 'After: Crystal Clear Results' },
        { caption: 'Night Visibility Improvement' },
        { caption: 'Complete Restoration Process' }
      ]
    },
    {
      id: 'paint-correction',
      title: 'Paint Correction',
      icon: <Sparkles />,
      description: 'Swirl removal, polishing, and gloss enhancement',
      photos: [
        { caption: 'Swirl Mark Removal' },
        { caption: 'Paint Polishing Results' },
        { caption: 'Gloss Enhancement' },
        { caption: 'Mirror Finish Achievement' }
      ]
    }
  ];

  return (
    <PhotosContainer>
      <Header>
        <HeaderContent>
          <BackButton to="/">
            <ArrowLeft size={20} />
            Back to Home
          </BackButton>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>
            Our <span className="gradient-text">Work</span> Gallery
          </h1>
        </HeaderContent>
      </Header>

      {sections.map((section, sectionIndex) => (
        <Section key={section.id} style={{ 
          background: sectionIndex % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-secondary)' 
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SectionHeader>
              <SectionIcon>
                {section.icon}
              </SectionIcon>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                {section.title}
              </h2>
              <p style={{ 
                color: 'var(--text-secondary)', 
                fontSize: '1.2rem',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                {section.description}
              </p>
            </SectionHeader>

            <ComingSoon>
              <h3 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>
                Gallery Coming Soon!
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                We're currently building our photo gallery. In the meantime, check out our latest work on Instagram!
              </p>
              <motion.a
                href="https://www.instagram.com/marin.nava.detailing?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'var(--accent-primary)',
                  color: 'var(--bg-primary)',
                  padding: '1rem 2rem',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📸 View on Instagram
              </motion.a>
            </ComingSoon>

            <PhotoGrid>
              {section.photos.map((photo, photoIndex) => (
                <PhotoCard
                  key={photoIndex}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: photoIndex * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <PhotoPlaceholder />
                  <PhotoCaption>
                    <h4 style={{ margin: '0 0 0.5rem 0' }}>{photo.caption}</h4>
                    <p style={{ 
                      color: 'var(--text-secondary)', 
                      fontSize: '0.9rem',
                      margin: 0 
                    }}>
                      Photo coming soon
                    </p>
                  </PhotoCaption>
                </PhotoCard>
              ))}
            </PhotoGrid>
          </motion.div>
        </Section>
      ))}
    </PhotosContainer>
  );
}

export default Photos; 