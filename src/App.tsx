import { useState, useEffect, useRef } from 'react'
import './App.css'

// Interior design images from Unsplash (free to use)
const images = {
  hero: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80',
  hero1: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
  hero2: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
  hero3: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  hero4: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
  about: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
  gallery1: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80',
  gallery2: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
  gallery3: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=800&q=80',
  gallery4: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  gallery5: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
  gallery6: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
  gallery7: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80',
  gallery8: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
}

// Scroll animation hook
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

// Animated component wrapper
function AnimatedSection({ children, className = '', delay = 0 }: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`animate-on-scroll animate-fade-up ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* Header */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="header-logo">
          <img src="/ALLURE.png" alt="Allure Space" />
        </a>
        <nav className="header-nav">
          <a href="#home" className="active">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </nav>
        <button
          className={`header-menu ${mobileMenuOpen ? 'active' : ''}`}
          aria-label="Menu"
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={closeMobileMenu}></div>
      <nav className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`}>
        <a href="#home" onClick={closeMobileMenu}>Home</a>
        <a href="#about" onClick={closeMobileMenu}>About</a>
        <a href="#services" onClick={closeMobileMenu}>Services</a>
        <a href="#gallery" onClick={closeMobileMenu}>Gallery</a>
        <a href="#contact" onClick={closeMobileMenu}>Contact</a>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-bg">
          <img src={images.hero} alt="Luxury Interior" />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <h1>Interior Design<span>.</span></h1>
          <p className="hero-tagline">
            The art of enhancing spaces to create functional and aesthetically pleasing environments. We transform your vision into reality with innovative, luxurious, and modern designs.
          </p>
          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary">
              Get Free Consultation
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#gallery" className="btn btn-outline">
              View Our Work
            </a>
          </div>
        </div>
        <div className="hero-images">
          <div className="hero-image-item">
            <img src={images.hero1} alt="Interior" />
          </div>
          <div className="hero-image-item">
            <img src={images.hero2} alt="Interior" />
          </div>
          <div className="hero-image-item">
            <img src={images.hero3} alt="Interior" />
          </div>
          <div className="hero-image-item">
            <img src={images.hero4} alt="Interior" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="about-grid">
          <AnimatedSection className="about-image">
            <img src={images.about} alt="Interior Design Studio" />
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="about-content">
            <div className="gold-line"></div>
            <h2>Creating Spaces That Tell Your Story</h2>
            <p>
              At Allure Space, we believe that every space has a unique story to tell. Our team of expert designers in Delhi specializes in creating interiors that reflect your personality, lifestyle, and aspirations.
            </p>
            <p>
              With years of experience in residential and commercial design, we bring innovation, luxury, and functionality to every project. From concept to completion, we're with you every step of the way.
            </p>
            <a href="#contact" className="btn btn-primary">
              Learn More About Us
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section services-section">
        <AnimatedSection className="section-header">
          <div className="gold-line gold-line-center"></div>
          <h2>Our Services</h2>
          <p>Bespoke interior design solutions crafted for discerning clients</p>
        </AnimatedSection>
        <div className="services-grid">
          {[
            { icon: '🏠', title: 'Space Planning', desc: 'Strategic arrangement of spaces for optimal functionality, flow, and spatial harmony.' },
            { icon: '🎨', title: 'Color Consulting', desc: 'Expert color palettes that evoke emotions and create the perfect ambiance.' },
            { icon: '💡', title: 'Lighting Design', desc: 'Layered lighting solutions combining ambient, task, and accent illumination.' },
            { icon: '🛋️', title: 'Furniture Selection', desc: 'Curated furniture pieces that balance style, comfort, and timeless quality.' },
            { icon: '🪟', title: 'Textures & Fabrics', desc: 'Premium materials and bespoke fabrics for a luxurious, refined finish.' },
            { icon: '🖼️', title: 'Accessories & Décor', desc: 'Finishing touches that bring personality and sophistication to your space.' },
          ].map((service, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="service-card">
                <span className="service-number">0{i + 1}</span>
                <div className="service-icon"><span>{service.icon}</span></div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="section gallery-section">
        <AnimatedSection className="section-header">
          <div className="gold-line gold-line-center"></div>
          <h2>Our Portfolio</h2>
          <p>Explore our curated collection of luxury interior projects</p>
        </AnimatedSection>
        <div className="gallery-grid">
          {[
            images.gallery1, images.gallery2, images.gallery3, images.gallery4,
            images.gallery5, images.gallery6, images.gallery7, images.gallery8
          ].map((img, i) => (
            <AnimatedSection key={i} delay={i * 0.05} className="gallery-item">
              <img src={img} alt={`Interior Design Project ${i + 1}`} loading="lazy" />
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="section features-section">
        <AnimatedSection className="section-header">
          <div className="gold-line gold-line-center"></div>
          <h2>Why Choose Allure Space?</h2>
          <p>Excellence, craftsmanship, and attention to detail in every project</p>
        </AnimatedSection>
        <div className="features-grid">
          {[
            { num: '01', title: 'Expert Designers', desc: 'Our team brings years of experience and creative vision to every project.' },
            { num: '02', title: 'Custom Solutions', desc: 'Every design is tailored to your unique style and requirements.' },
            { num: '03', title: 'Quality Materials', desc: 'We source only the finest materials for lasting beauty.' },
            { num: '04', title: 'Timely Delivery', desc: 'Projects completed on schedule without compromising quality.' },
          ].map((feature, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="feature-item">
                <div className="feature-number">{feature.num}</div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <AnimatedSection>
          <h2>Ready to Transform Your Space?</h2>
          <p>Book a free consultation with our expert designers today and take the first step towards your dream interior.</p>
          <a href="#contact" className="btn btn-primary">
            Schedule Free Consultation
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </AnimatedSection>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-grid">
          <AnimatedSection className="contact-info">
            <h2>Let's Create Your Dream Space</h2>
            <p>
              Ready to transform your home or office? Contact us today for a free consultation.
              Our expert designers in Delhi are here to bring your vision to life.
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>New Delhi, India</span>
              </div>
              <div className="contact-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+91 98765 43210</span>
              </div>
              <div className="contact-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>hello@allurespace.in</span>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" placeholder="Enter your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="Enter your email" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" placeholder="Enter your phone number" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea id="message" placeholder="Tell us about your project..." rows={4}></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Send Message
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/ALLURE.png" alt="Allure Space" className="footer-logo" />
            <p>Innovative. Luxurious. Modern. Creating beautiful spaces that inspire and transform lives in Delhi and beyond.</p>
          </div>
          <div className="footer-column">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Interior Design</a></li>
              <li><a href="#services">Space Planning</a></li>
              <li><a href="#services">Lighting Design</a></li>
              <li><a href="#services">Furniture Selection</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#gallery">Our Projects</a></li>
              <li><a href="#">Testimonials</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Connect</h4>
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Pinterest</a></li>
              <li><a href="#">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Allure Space. All rights reserved. | Interior Design Company in Delhi</p>
        </div>
      </footer>
    </>
  )
}

export default App
