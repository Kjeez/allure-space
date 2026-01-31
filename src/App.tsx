import { useState, useEffect, useRef } from 'react'
import './App.css'

// Interior design images from Unsplash
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
function AnimatedSection({ children, className = '', delay = 0, style = {} }: {
  children: React.ReactNode
  className?: string
  delay?: number
  style?: React.CSSProperties
}) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`animate-on-scroll animate-fade-up ${isVisible ? 'visible' : ''} ${className}`}
      style={{ ...style, transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}

// FAQ Item Component
function FAQItem({ question, answer, isOpen, toggle }: { question: string, answer: string, isOpen: boolean, toggle: () => void }) {
  return (
    <div className={`faq-item ${isOpen ? 'active' : ''}`}>
      <button className="faq-question" onClick={toggle}>
        {question}
        <span className="faq-icon">{isOpen ? '−' : '+'}</span>
      </button>
      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </div>
  )
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

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

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  // Data for the website content
  const services = [
    {
      title: "Residential Interior Design",
      desc: "Transform your house into a home that tells your story. From compact 2BHK apartments to luxurious penthouses, we specialize in creating personalized living spaces across Delhi.",
      items: ["Living Room & Bedroom Design", "Modular Kitchen Design", "Bathroom & Washroom Renovations", "Kids' Rooms & Nurseries", "Home Office Setups", "Pooja Room Design", "Balcony & Terrace Makeovers"],
      icon: "🏠"
    },
    {
      title: "Commercial Interior Design",
      desc: "Elevate your business environment with designs that inspire productivity and impress clients.",
      items: ["Office Interiors & Workspace Planning", "Retail Store Design", "Restaurant & Café Interiors", "Clinic & Medical Office Design", "Salon & Spa Interiors", "Showroom Design"],
      icon: "🏢"
    },
    {
      title: "Turnkey Solutions",
      desc: "Leave everything to us. Our turnkey projects cover every aspect from design to execution.",
      items: ["Complete Home Renovation", "False Ceiling & Wall Paneling", "Electrical & Lighting Design", "Flooring Solutions", "Custom Furniture & Joinery", "Soft Furnishings & Décor"],
      icon: "🔑"
    },
    // {
    //   title: "Specialized Services",
    //   desc: "Expert solutions for specific design needs and heritage properties.",
    //   items: ["3D Design Visualization & Walkthroughs", "Vastu Consultation & Planning", "Sustainable & Eco-Friendly Design", "Smart Home Integration", "Vintage & Heritage Restoration"],
    //   icon: "✨"
    // }
  ];

  const processSteps = [
    { title: "Discovery & Consultation", time: "Week 1", desc: "We begin with an in-depth consultation at your space in Delhi. Our designers understand your vision, lifestyle, budget, and timeline." },
    { title: "Concept Development", time: "Week 2-3", desc: "Our creative team develops initial concepts tailored to your brief. You'll receive mood boards, color palettes, and style directions." },
    { title: "Design & Visualization", time: "Week 4-6", desc: "We bring your interiors to life with detailed 2D layouts and photorealistic 3D renderings. Every element is planned meticulously." },
    { title: "Approval & Refinement", time: "Week 7", desc: "We refine the design based on your feedback until it's perfect. Once approved, we create detailed execution drawings." },
    { title: "Execution & Installation", time: "Week 8-16", desc: "Our project managers oversee every detail of the execution. From civil work to furniture installation, we ensure quality craftsmanship." },
    { title: "Handover & Support", time: "Week 17", desc: "We don't just hand over keys—we ensure you're delighted with every detail. Our post-project support ensures your interiors remain stunning." }
  ];

  const whyChooseUs = [
    { title: "Proven Track Record", desc: "Over 200 completed projects across Delhi, Gurgaon, and Noida. Our portfolio speaks for itself—from modern apartments in Greater Kailash to luxury villas in Vasant Vihar." },
    { title: "Local Expertise", desc: "We understand Delhi's unique challenges—from navigating DDA regulations to sourcing materials from Kirti Nagar. Our local knowledge ensures smoother project execution." },
    { title: "Transparent Communication", desc: "No surprises, no hidden costs. We maintain open communication through every phase, with regular updates and clear documentation." },
    { title: "Quality Without Compromise", desc: "We partner with certified suppliers and experienced craftsmen. Every material is verified, every installation is inspected, and every detail is perfected." },
    // { title: "Design Excellence", desc: "Our designers stay ahead of trends while respecting timeless principles. Whether you prefer contemporary minimalism or classic elegance, we deliver designs that age beautifully." },
    // { title: "Comprehensive Warranty", desc: "We stand behind our work with a comprehensive warranty covering workmanship, materials, and installations. Your peace of mind is our priority." },
    // { title: "Flexible Packages", desc: "From consultation-only services to complete turnkey solutions, we offer flexible packages that fit your budget and needs." },
    // { title: "Post-Project Support", desc: "Our relationship doesn't end at handover. We provide ongoing support for maintenance, touch-ups, and future modifications." }
  ];

  const serviceAreas = [
    { zone: "South Delhi", areas: "Greater Kailash, Hauz Khas, Defence Colony, Safdarjung Enclave, Green Park, Vasant Vihar, Vasant Kunj, Chittaranjan Park, Malviya Nagar, Saket" },
    { zone: "Central Delhi", areas: "Connaught Place, Karol Bagh, Rajendra Nagar, Patel Nagar, Jor Bagh, Golf Links" },
    { zone: "West Delhi", areas: "Punjabi Bagh, Rajouri Garden, Janakpuri, Dwarka, Uttam Nagar, Paschim Vihar" },
    { zone: "East Delhi", areas: "Mayur Vihar, Preet Vihar, Laxmi Nagar, Patparganj, Karkardooma" },
    { zone: "North Delhi", areas: "Civil Lines, Model Town, Pitampura, Rohini, Shalimar Bagh" },
    { zone: "Gurgaon", areas: "DLF Phase 1-5, Golf Course Road, Sohna Road, MG Road, Sector 56, New Gurgaon" },
    { zone: "Noida & Greater Noida", areas: "Sectors 15, 18, 50, 62, 75, 76, 78, Noida Extension, Greater Noida West" },
    // { zone: "Other NCR Areas", areas: "Faridabad, Ghaziabad, Chattarpur Farms" }
  ];

  const testimonials = [
    { name: "Priya & Rahul Sharma", location: "Vasant Kunj", text: "Allure Space transformed our 3BHK apartment into a dream home. Their attention to detail and understanding of our lifestyle made all the difference. The modular kitchen is absolutely stunning, and they completed everything within the promised timeline. Highly recommended!" },
    { name: "Mr. Anil Gupta", location: "Connaught Place", text: "We hired Allure Space for our new office interiors in CP, and they delivered beyond expectations. The space planning was brilliant—they maximized every square foot while creating a professional yet welcoming environment. Great team to work with!" },
    { name: "Neha Kapoor", location: "Greater Kailash", text: "As someone who's very particular about aesthetics, I was worried about finding the right designer. Allure Space not only understood my vision but elevated it. The 3D renders were so accurate, and the final result is even better than I imagined." },
    { name: "The Mehta Family", location: "Dwarka", text: "From our initial consultation to the final handover, the Allure Space team was professional, responsive, and incredibly creative. They designed our entire home—from the living room to the kids' bedrooms—and managed everything seamlessly." }
  ];

  const portfolioProjects = [
    { title: "Modern Minimalist Apartment", location: "Greater Kailash I", desc: "A 1,800 sq ft 3BHK transformed into a serene, clutter-free haven. Clean lines, neutral tones, and smart storage solutions define this contemporary home.", img: images.gallery1 },
    { title: "Luxury Penthouse", location: "Golf Course Road, Gurgaon", desc: "4,500 sq ft of opulence featuring Italian marble, custom lighting, and panoramic city views. A perfect blend of modern luxury and comfort.", img: images.gallery2 },
    { title: "Heritage Home Restoration", location: "Civil Lines", desc: "Breathing new life into a 1940s colonial bungalow while preserving its architectural character. Traditional charm meets modern amenities.", img: images.gallery3 },
    { title: "Contemporary Office", location: "Connaught Place", desc: "2,000 sq ft corporate office designed for collaboration and creativity. Open-plan workspace with breakout zones and smart meeting rooms.", img: images.gallery4 },
    { title: "Boutique Café", location: "Hauz Khas Village", desc: "Instagrammable interiors for a specialty coffee shop. Rustic-industrial design with exposed brick, warm lighting, and cozy seating.", img: images.gallery5 },
    { title: "Smart Home", location: "Dwarka", desc: "Technology-integrated 4BHK featuring automated lighting, climate control, and entertainment systems. Future-forward living in Delhi.", img: images.gallery6 },
  ];

  const faqs = [
    { q: "How much does interior design cost in Delhi?", a: "Our projects typically range from ₹1,500 to ₹3,500 per sq ft depending on the scope, materials, and finishes. We offer flexible packages including consultation-only (starting ₹25,000), design-only, and turnkey solutions. Every project gets a detailed, transparent quotation with no hidden costs." },
    { q: "How long does a typical project take?", a: "A complete home interior (2-3 BHK) usually takes 8-12 weeks from design approval to handover. Larger projects or extensive renovations may take 12-16 weeks. We provide a detailed timeline during the planning phase and keep you updated throughout." },
    { q: "Do you handle government approvals and permissions?", a: "Yes, we assist with necessary approvals from RWAs, housing societies, and municipal authorities where required. We're well-versed in Delhi's building regulations and ensure compliance throughout the project." },
    { q: "Can I see samples of materials and finishes before finalizing?", a: "Absolutely! We provide physical samples of all major materials—from tiles and laminates to fabrics and paint colors. We can also arrange visits to our partner showrooms in Kirti Nagar and other furniture hubs." },
    { q: "What if I need to modify the design during execution?", a: "We're flexible! Minor modifications can usually be accommodated. For significant changes, we'll discuss the impact on timeline and cost upfront. Your satisfaction is our priority." },
    { q: "Do you provide furniture and décor, or only interior work?", a: "We offer both! You can choose our complete turnkey solution (including furniture, furnishings, and décor) or opt for interior work only. We also provide furniture-only packages if you've already completed the civil work." },
    { q: "What about warranty and maintenance?", a: "We provide a 1-year comprehensive warranty on all workmanship and installations. Manufacturing warranties from suppliers (on modular kitchens, wardrobes, etc.) are typically 5-10 years. We also offer annual maintenance contracts for ongoing support." },
  ];

  const blogPosts = [
    { title: "10 Interior Design Trends Dominating Delhi Homes in 2026", excerpt: "From biophilic design to maximalist décor, discover what's trending in the capital's most stylish homes." },
    { title: "Modular Kitchen Design Guide for Delhi Apartments", excerpt: "Space-saving solutions, layouts, and material choices for Indian cooking needs." },
    { title: "Navigating Vastu While Maintaining Modern Aesthetics", excerpt: "How to incorporate Vastu principles without compromising on contemporary design." }
  ];

  return (
    <>
      {/* Header */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="header-logo">
          <img src="/ALLURE.png" alt="Allure Space" />
        </a>
        <nav className="header-nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#testimonials">Testimonials</a>
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
        <a href="#portfolio" onClick={closeMobileMenu}>Portfolio</a>
        <a href="#testimonials" onClick={closeMobileMenu}>Testimonials</a>
        <a href="#contact" onClick={closeMobileMenu}>Contact</a>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-bg">
          <img src={images.hero} alt="Luxury Interior" />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <AnimatedSection>
            <h1>Crafting Timeless Interiors That Define Your Story</h1>
            <p className="hero-tagline">
              Allure Space brings Delhi's most sophisticated interior design expertise to your doorstep. From concept to completion, we transform homes and commercial spaces into stunning environments that reflect your unique personality.
            </p>
            <div className="hero-cta">
              <a href="#contact" className="btn btn-primary">
                Schedule a Free Consultation
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#portfolio" className="btn btn-outline">
                Explore Our Work
              </a>
            </div>
          </AnimatedSection>
        </div>
        <div className="hero-images">
          <div className="hero-image-item"><img src={images.hero1} alt="Interior" /></div>
          <div className="hero-image-item"><img src={images.hero2} alt="Interior" /></div>
          <div className="hero-image-item"><img src={images.hero3} alt="Interior" /></div>
          <div className="hero-image-item"><img src={images.hero4} alt="Interior" /></div>
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
            <h2>About Allure Space</h2>
            <p>
              Founded in the heart of Delhi, Allure Space has emerged as a trusted name in premium interior design, transforming over 200+ spaces across the capital and NCR region. We believe that great design is not just about aesthetics—it's about creating environments that enhance your daily life.
            </p>
            <p>
              Our philosophy is simple: every space has a story waiting to be told. Whether it's a cozy apartment in South Delhi, a sprawling farmhouse in Chattarpur, or a contemporary office in Connaught Place, we blend functionality with artistic vision to create interiors that are uniquely yours.
            </p>
            <p><strong>What Sets Us Apart:</strong></p>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>✓ <strong>Delhi-Centric Expertise:</strong> Deep understanding of Delhi's architectural styles</li>
              <li>✓ <strong>End-to-End Solutions:</strong> From concept to final installation</li>
              <li>✓ <strong>Transparent Pricing:</strong> No hidden costs, clear timelines</li>
              <li>✓ <strong>Quality Craftsmanship:</strong> Partnerships with Delhi's finest craftsmen</li>
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section services-section">
        <AnimatedSection className="section-header">
          <div className="gold-line gold-line-center"></div>
          <h2>Our Services</h2>
          <p>Comprehensive interior design solutions for residential and commercial spaces in Delhi & NCR</p>
        </AnimatedSection>
        <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {services.map((service, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="service-card" style={{ height: '100%' }}>
                <span className="service-number">0{i + 1}</span>
                <div className="service-icon"><span>{service.icon}</span></div>
                <h3>{service.title}</h3>
                <p style={{ marginBottom: '1rem' }}>{service.desc}</p>
                <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  {service.items.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '0.25rem' }}>{item}</li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="section features-section">
        <AnimatedSection className="section-header">
          <div className="gold-line gold-line-center"></div>
          <h2>How We Work: The Allure Space Experience</h2>
          <p>A transparent, structured process to bring your dream space to life</p>
        </AnimatedSection>
        <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {processSteps.map((step, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="feature-item" style={{ flexDirection: 'column', gap: '1rem' }}>
                <div className="feature-number" style={{ width: 'auto', padding: '0 1rem', borderRadius: '4px' }}>{step.time}</div>
                <div className="feature-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section services-section" style={{ background: 'var(--white)' }}>
        <AnimatedSection className="section-header">
          <div className="gold-line gold-line-center"></div>
          <h2>Why Delhi Chooses Allure Space</h2>
        </AnimatedSection>
        <div className="features-grid">
          {whyChooseUs.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <div className="feature-item">
                <div className="feature-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Service Areas */}
      <section className="section areas-section">
        <AnimatedSection className="section-header">
          <div className="gold-line gold-line-center"></div>
          <h2>Areas We Serve Across Delhi & NCR</h2>
        </AnimatedSection>
        <div className="areas-grid">
          {serviceAreas.map((zone, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <div className="area-card">
                <h3>{zone.zone}</h3>
                <p>{zone.areas}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section testimonials-section">
        <AnimatedSection className="section-header">
          <div className="gold-line gold-line-center"></div>
          <h2>What Our Clients Say</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>Stories of transformation from across the city</p>
        </AnimatedSection>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="testimonial-card">
                <div className="client-info">
                  <span className="client-name">{t.name}</span>
                  <span className="client-location">{t.location}</span>
                </div>
                <p className="testimonial-text">"{t.text}"</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section gallery-section" style={{ background: 'var(--primary-dark)' }}>
        <AnimatedSection className="section-header">
          <div className="gold-line gold-line-center"></div>
          <h2>Our Portfolio</h2>
          <p>Featured projects from our collection</p>
        </AnimatedSection>
        <div className="gallery-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {portfolioProjects.map((project, i) => (
            <AnimatedSection key={i} delay={i * 0.05} className="gallery-item" style={{ gridColumn: 'span 1', gridRow: 'span 1' }}>
              <img src={project.img} alt={project.title} loading="lazy" />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '1.5rem',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                color: 'white',
                zIndex: 3
              }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{project.title}</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{project.location}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section">
        <AnimatedSection className="section-header">
          <div className="gold-line gold-line-center"></div>
          <h2>Frequently Asked Questions</h2>
        </AnimatedSection>
        <div className="faq-container">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <FAQItem
                question={faq.q}
                answer={faq.a}
                isOpen={openFaqIndex === i}
                toggle={() => toggleFaq(i)}
              />
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Blog Section */}
      <section className="section insights-section">
        <AnimatedSection className="section-header">
          <div className="gold-line gold-line-center"></div>
          <h2>Design Insights</h2>
          <p>Latest trends, tips, and inspiration from the world of interior design</p>
        </AnimatedSection>
        <div className="insights-grid">
          {blogPosts.map((post, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="insight-card">
                <div className="insight-number">0{i + 1}</div>
                <h3 className="insight-title">{post.title}</h3>
                <p className="insight-excerpt">{post.excerpt}</p>
                <a href="#" className="read-more">Read Article →</a>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-grid">
          <AnimatedSection className="contact-info">
            <h2>Ready to Transform Your Space?</h2>
            <p>
              Let's create something beautiful together. Whether you're planning a complete home makeover or a single-room refresh, Allure Space is here to bring your vision to life.
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
                <span>+91 98XXX XXXXX</span>
              </div>
              <div className="contact-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>hello@allurespace.in</span>
              </div>
              <div className="contact-item" style={{ alignItems: 'flex-start' }}>
                <strong style={{ minWidth: '80px', display: 'inline-block' }}>Hours:</strong>
                <div>
                  <div>Mon - Sat: 10:00 AM - 7:00 PM</div>
                  <div>Sun: By Appointment Only</div>
                </div>
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
            <p>Elevating Interiors Across Delhi Since 2018. We create spaces that blend functionality with artistic vision.</p>
          </div>
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#portfolio">Portfolio</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Residential Interiors</a></li>
              <li><a href="#services">Commercial Interiors</a></li>
              <li><a href="#services">Turnkey Solutions</a></li>
              <li><a href="#services">3D Visualization</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Connect</h4>
            <ul>
              <li><a href="#">Instagram: @allurespace</a></li>
              <li><a href="#">Facebook: AllureSpace</a></li>
              <li><a href="#">Pinterest: AllureSpace</a></li>
              <li><a href="mailto:hello@allurespace.in">hello@allurespace.in</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Allure Space. All Rights Reserved. | Designed with ❤️ in Delhi</p>
        </div>
      </footer>
    </>
  )
}

export default App
