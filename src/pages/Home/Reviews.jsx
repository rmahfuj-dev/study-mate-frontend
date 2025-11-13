import React from "react";
import Container from "../../components/Container";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Ayesha Rahman",
    image: "",
    review:
      "StudyMate helped me find a perfect study partner for my programming course. Now I stay motivated and productive!",
    rating: 5,
  },
  {
    name: "Rafiq Ahmed",
    image: "",
    review:
      "I was struggling with math, but connecting with a partner via StudyMate made learning fun and easy.",
    rating: 4.5,
  },
  {
    name: "Sara Khan",
    image: "",
    review:
      "I love StudyMate! I met a partner who shares my study habits, and together we achieved better results.",
    rating: 5,
  },
];

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push(<FaStar key={i} className="text-yellow-400" />);
    else if (rating + 0.5 === i)
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    else stars.push(<FaRegStar key={i} className="text-yellow-400" />);
  }
  return stars;
};

const Reviews = () => {
  const defaultImage =
    "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";

  return (
    <section id="reviews" className="py-24 bg-base-100">
      <Container>
        <h2 className="text-5xl font-extrabold text-center text-primary mb-12">
          What Students Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8 justify-items-center">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative w-full max-w-sm border border-base-300 rounded-2xl p-6 flex flex-col items-center text-center bg-base-200"
            >
              <div className="w-24 h-24 mb-4 rounded-full overflow-hidden">
                <img
                  src={testimonial.image || defaultImage}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-base-content mb-2">{testimonial.name}</h3>
              <div className="flex justify-center mb-4">{renderStars(testimonial.rating)}</div>
              <p className="text-base-content/80">{testimonial.review}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Reviews;
