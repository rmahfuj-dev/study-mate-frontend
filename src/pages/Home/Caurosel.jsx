import React, { useState, useEffect, useRef } from "react";
import partner1 from "/partner1.webp";
import partner2 from "/partner2.webp";
import partner3 from "/partner3.webp";

const Carousel = () => {
  const slides = [partner1, partner2, partner3];

  const [active, setActive] = useState(0);
  const sideRef = useRef(null);

  const prevSlide = () => setActive((active - 1 + slides.length) % slides.length);
  const nextSlide = () => setActive((active + 1) % slides.length);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [active]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (!sideRef.current) return;
    const container = sideRef.current;
    const activeThumb = container.children[active];
    if (!activeThumb) return;

    const containerHeight = container.clientHeight;
    const thumbTop = activeThumb.offsetTop;
    const thumbHeight = activeThumb.clientHeight;

    const scrollTop = thumbTop - containerHeight / 2 + thumbHeight / 2;
    container.scrollTo({ top: scrollTop, behavior: "smooth" });
  }, [active]);

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 bg-base-300">
      
      {/* Side Thumbnails */}
      <div
        ref={sideRef}
        className="
          flex flex-row md:flex-col
          gap-3 md:gap-3
          overflow-x-auto md:overflow-y-auto
          justify-center items-center
          w-full md:w-auto
          h-28 md:h-[92vh]
          scrollbar-hide
          order-last md:order-first
        "
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`relative flex-shrink-0 w-28 md:w-32 h-24 md:h-32 overflow-hidden border-2 rounded-lg cursor-pointer ${
              i === active ? "border-blue-500" : "border-gray-200"
            }`}
            onClick={() => setActive(i)}
          >
            <img
              src={slide}
              alt={`Thumbnail ${i + 1}`}
              className="w-full h-full object-cover"
            />
            {i === active && (
              <div className="absolute inset-0 bg-black/40 ring-2 ring-blue-500 transition-all"></div>
            )}
          </div>
        ))}
      </div>

      {/* Main Carousel */}
      <div className="carousel w-full md:flex-1 overflow-hidden relative h-[50vh] md:h-[92vh]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item absolute inset-0 transition-opacity duration-500 ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${slide})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/50 text-white p-4 text-center">
              {index === 0 && (
                <>
                  <h2 className="text-3xl md:text-5xl font-bold">
                    Study Partners, Anytime, Anywhere
                  </h2>
                  <p className="text-lg md:text-2xl mt-2">
                    Making Online Learning Social and Fun
                  </p>
                </>
              )}
              {index === 1 && (
                <>
                  <h2 className="text-3xl md:text-5xl font-bold">
                    Connect with Your Local StudyMate Today
                  </h2>
                  <p className="text-lg md:text-2xl mt-2">
                    Your Perfect Study Buddy is Just a Click Away
                  </p>
                </>
              )}
              {index === 2 && (
                <>
                  <h2 className="text-3xl md:text-5xl font-bold">
                    Find Your Online Partner for Study!
                  </h2>
                  <p className="text-lg md:text-2xl mt-2">
                    Study Smarter, Not Alone
                  </p>
                </>
              )}
            </div>
          </div>
        ))}

        {/* Prev/Next Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-white/80 hover:bg-white"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-white/80 hover:bg-white"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Carousel;
