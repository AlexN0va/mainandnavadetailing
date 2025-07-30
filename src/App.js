import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Car, 
  Sparkles, 
  Shield, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram,
  Facebook,
  Twitter,
  Star,
  CheckCircle,
  ArrowRight,
  Zap
} from 'lucide-react';
import styled from 'styled-components';
import logo from './assets/lgo.png';
// Styled Components
const AppContainer = styled.div`
  min-height: 100vh;
  background: var(--bg-primary);
`;

const Section = styled.section`
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const HeroSection = styled(Section)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(192, 192, 192, 0.08) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const HeroContent = styled.div`
  z-index: 2;
  position: relative;
`;

const LogoImg = styled.img`
  width: 500px;
  max-width: 90vw;
  height: auto;
  object-fit: contain;
  object-position: center;
  margin-bottom: 0.5rem;
  filter: drop-shadow(0 4px 32px rgba(192,192,192,0.15));
  animation: fadeInUp 1.2s cubic-bezier(0.23, 1, 0.32, 1);
  transform: scale(1.1);
  transform-origin: center;
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  color: var(--text-secondary);
  margin-bottom: 2rem;
  margin-top: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled(motion.button)`
  background: var(--gradient-primary);
  border: none;
  padding: 16px 32px;
  border-radius: 50px;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-glow);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(192, 192, 192, 0.5);
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ServiceCard = styled(motion.div)`
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-card);
  
  &:hover {
    transform: translateY(-10px);
    border-color: var(--accent-primary);
    box-shadow: 0 20px 40px rgba(192, 192, 192, 0.2);
  }
`;

const ServiceIcon = styled.div`
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

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const PricingCard = styled(motion.div)`
  background: var(--bg-secondary);
  border: 2px solid ${props => props.featured ? 'var(--accent-primary)' : 'var(--border-color)'};
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  position: relative;
  box-shadow: ${props => props.featured ? 'var(--shadow-glow)' : 'var(--shadow-card)'};
  
  ${props => props.featured && `
    transform: scale(1.05);
    
    &::before {
      content: 'MOST POPULAR';
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--accent-primary);
      color: var(--bg-primary);
      padding: 4px 16px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }
  `}
`;

const Price = styled.div`
  font-size: 3rem;
  font-weight: 900;
  color: var(--accent-primary);
  margin: 1rem 0;
`;

const FeatureList = styled.ul`
  list-style: none;
  margin: 1.5rem 0;
  
  li {
    display: flex;
    align-items: center;
    margin: 0.5rem 0;
    color: var(--text-secondary);
    
    svg {
      color: var(--accent-primary);
      margin-right: 0.5rem;
      flex-shrink: 0;
    }
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ContactCard = styled(motion.div)`
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--accent-primary);
    transform: translateY(-5px);
  }
`;

const SocialSection = styled(Section)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--bg-secondary);
  margin-top: 0;
`;

const InstagramCard = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  background: var(--bg-tertiary);
  border: 2px solid var(--accent-primary);
  border-radius: 20px;
  padding: 1.5rem 2.5rem;
  color: var(--text-primary);
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 600;
  margin-top: 1.5rem;
  box-shadow: var(--shadow-glow);
  transition: all 0.3s ease;
  &:hover {
    background: var(--accent-primary);
    color: var(--bg-primary);
    transform: translateY(-4px) scale(1.04);
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--accent-primary);
  border-radius: 50%;
  opacity: 0.6;
`;

function App() {
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -400]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: <Sparkles />,
      title: "Showroom Package",
      description: "Complete Interior & Exterior Rejuvenation. Perfect for new cars or any vehicle in need of a full refresh inside and out."
    },
    {
      icon: <Shield />,
      title: "Interior Revival",
      description: "Deep clean + protection including carpet restoration, clean and condition leather and plastic surfaces. Ideal for cars with heavy interior use, pet hair, stains, or smells."
    },
    {
      icon: <Car />,
      title: "Exterior Enhancement",
      description: "Paint protection + shine including full wash, paint decontamination, clean and shine wheels and tires, restore faded plastic trim. Best for boosting curb appeal and protecting your vehicle's finish."
    }
  ];

  const pricing = [
    {
      name: "Interior Revival",
      price: "$75",
      suvPrice: "$100",
      features: [
        "Deep interior cleaning",
        "Carpet restoration",
        "Odor elimination",
        "Dashboard & console cleaning",
        "Perfect for heavy use vehicles"
      ]
    },
    {
      name: "Exterior Enhancement",
      price: "$65",
      suvPrice: "$75",
      features: [
        "Full exterior wash",
        "Paint decontamination",
        "Wheel & tire cleaning",
        "Plastic trim restoration",
        "Paint protection",
        "Enhanced curb appeal"
      ]
    },
    {
      name: "Showroom Package",
      price: "$135",
      suvPrice: "$165",
      featured: true,
      features: [
        "Complete interior & exterior",
        "Full rejuvenation treatment",
        "Paint protection & shine",
        "Interior deep clean",
        "Carpet & leather restoration",
        "Perfect for new cars or full refresh"
      ]
    }
  ];

  return (
    <AppContainer>
      <HeroSection>
        <FloatingElements>
          <FloatingElement
            style={{ y: y1, left: '10%', top: '20%' }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <FloatingElement
            style={{ y: y2, right: '15%', top: '60%' }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <FloatingElement
            style={{ y: y3, left: '20%', bottom: '30%' }}
            animate={{ y: [0, -25, 0] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          />
        </FloatingElements>
        
        <HeroContent>
          <LogoImg src={logo} />
          <HeroSubtitle>
            Where your ride gets the glow-up it deserves.
          </HeroSubtitle>
          <CTAButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          >
            Let's Get Started <ArrowRight size={20} style={{ marginLeft: '8px' }} />
          </CTAButton>
        </HeroContent>
      </HeroSection>

      <SocialSection id="social">
        <h2 style={{ fontSize: '2.2rem', textAlign: 'center', marginBottom: '1rem' }}>
          See Our <span className="gradient-text">Work</span>
        </h2>
        <InstagramCard
          href="https://www.instagram.com/marin.nava.detailing?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <Instagram size={36} />
          @marinnavadetailing
        </InstagramCard>
      </SocialSection> 

      <Section id="services">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>
            Our <span className="gradient-text">Services</span>
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem' }}>
            From interior revival to complete showroom packages, we've got you covered
          </p>
        </motion.div>

        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <ServiceIcon>
                {service.icon}
              </ServiceIcon>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{service.title}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{service.description}</p>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Section>

      <Section id="pricing" style={{ background: 'var(--bg-secondary)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>
            <span className="gradient-text">Pricing</span> That Fits
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem' }}>
            Choose the perfect package for your ride. SUV/Truck pricing available.
          </p>
        </motion.div>

        <PricingGrid>
          {pricing.map((plan, index) => (
            <PricingCard
              key={index}
              featured={plan.featured}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{plan.name}</h3>
              <Price>{plan.price}</Price>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                SUV/Truck: {plan.suvPrice}
              </div>
              <FeatureList>
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>
                    <CheckCircle size={16} />
                    {feature}
                  </li>
                ))}
              </FeatureList>
            </PricingCard>
          ))}
        </PricingGrid>
      </Section>

      {/* Extras Section */}
      <Section id="extras" style={{ background: 'var(--bg-primary)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>
            <span className="gradient-text">Extras</span> & Specialty Services
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem' }}>
            Enhance your detail with our specialty add-ons. For polishing and ceramic coating, text us for a custom quote!
          </p>
        </motion.div>
        <ServicesGrid>
          <ServiceCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
          >
            <ServiceIcon>
              <Zap size={36} />
            </ServiceIcon>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Headlight Restoration</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Multi-stage premium restoration for both headlights. Restore clarity and brightness to foggy or yellowed headlights for improved safety and appearance.<br/>
              <b>$80 for both headlights</b>
            </p>
          </ServiceCard>
          <ServiceCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
          >
            <ServiceIcon>
              <Star size={36} />
            </ServiceIcon>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Polishing</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Paint polishing for swirl removal and gloss enhancement. <b>Text us for a quote!</b></p>
          </ServiceCard>
          <ServiceCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
          >
            <ServiceIcon>
              <Shield size={36} />
            </ServiceIcon>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Ceramic Coating</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Long-lasting protection and extreme gloss. <b>Text us for a quote!</b></p>
          </ServiceCard>
        </ServicesGrid>
      </Section>

      <Section id="booking" style={{ background: 'var(--bg-primary)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}
        >
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Ready to <span className="gradient-text">Book?</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
            Choose your package and let's get your ride looking its best. We'll come to you!
          </p>
          <CTAButton
            as="a"
            href="https://calendly.com/marinnavadetailing/detailing-appointment"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ textDecoration: 'none', display: 'inline-block' }}
          >
            Book Your Appointment <ArrowRight size={20} style={{ marginLeft: '8px' }} />
          </CTAButton>
        </motion.div>
      </Section>

      <Section id="about">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
        >
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            About <span className="gradient-text">Marin & Nava</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
            We're not just another detailing service. We're car enthusiasts who understand that your ride is more than just transportation - it's an extension of your style and personality. 
            With cutting-edge techniques and premium products, we bring out the best in every vehicle we touch.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>5.0</div>
              <div style={{ color: 'var(--text-secondary)' }}>Star Rating</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>3+</div>
              <div style={{ color: 'var(--text-secondary)' }}>Years Experience</div>
            </div>
          </div>
        </motion.div>
      </Section>

      <Section id="contact" style={{ background: 'var(--bg-secondary)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem' }}>
            Ready to give your ride the treatment it deserves?
          </p>
        </motion.div>

        <ContactGrid>
          <ContactCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <Phone size={40} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
            <h3>Call Us</h3>
            <p style={{ color: 'var(--text-secondary)' }}>707-477-7017</p>
          </ContactCard>

          <ContactCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <Mail size={40} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
            <h3>Email</h3>
            <p style={{ color: 'var(--text-secondary)' }}>marinnavadetailing@gmail.com</p>
          </ContactCard>

          <ContactCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <MapPin size={40} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
            <h3>Location</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Mobile Service - We come to you!</p>
          </ContactCard>
        </ContactGrid>
      </Section>

      <footer style={{ 
        background: 'var(--bg-primary)', 
        borderTop: '1px solid var(--border-color)',
        padding: '2rem 20px',
        textAlign: 'center',
        color: 'var(--text-secondary)'
      }}>
        <p>&copy; 2024 Marin & Nava Detailing. All rights reserved.</p>
      </footer>
    </AppContainer>
  );
}

export default App; 