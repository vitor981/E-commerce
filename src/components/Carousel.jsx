import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=1200",
      title: "Descubra Mundos Incríveis",
      subtitle: "Mergulhe nas melhores histórias da literatura mundial",
      cta: "Explorar Catálogo",
      action: "catalog"
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1200",
      title: "Clássicos Atemporais",
      subtitle: "Redescubra os grandes clássicos que marcaram gerações",
      cta: "Ver Clássicos",
      action: "catalog"
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=1200",
      title: "Ofertas Especiais",
      subtitle: "Até 50% de desconto em livros selecionados",
      cta: "Aproveitar Ofertas",
      action: "catalog"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleCTAClick = (action) => {
    if (action === 'catalog') {
      // Scroll para a seção "Nossos Livros"
      const productsSection = document.querySelector('.products-section');
      if (productsSection) {
        productsSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <div className="carousel">
      <div className="carousel-container">
        <div 
          className="carousel-slides"
          style={{ transform: `translateX(-${currentSlide * (100/3)}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="carousel-slide">
              <div className="carousel-image">
                <img src={slide.image} alt={slide.title} />
                <div className="carousel-overlay"></div>
              </div>
              <div className="carousel-content">
                <h2 className="carousel-title">{slide.title}</h2>
                <p className="carousel-subtitle">{slide.subtitle}</p>
                <button 
                  className="carousel-cta"
                  onClick={() => handleCTAClick(slide.action)}
                >
                  {slide.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-btn carousel-btn-prev" onClick={prevSlide}>
          <FiChevronLeft />
        </button>
        <button className="carousel-btn carousel-btn-next" onClick={nextSlide}>
          <FiChevronRight />
        </button>

        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;