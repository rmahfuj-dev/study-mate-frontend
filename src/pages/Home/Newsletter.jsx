import React, { useState } from "react";
import Container from "../../components/Container";
import { FaEnvelope } from "react-icons/fa";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;
        // Handle newsletter subscription API here
        setSubmitted(true);
        setEmail("");
    };

    return (
        <section id="newsletter" className="w-full py-24 bg-base-100">
            <Container>
                <div className="w-full bg-base-200 border border-base-300 rounded-2xl p-12 flex flex-col items-center text-center">
                    <h2 className="text-5xl font-extrabold text-primary mb-4">
                        Join Our Newsletter
                    </h2>
                    <p className="text-base-content/80 mb-8">
                        Stay updated with the latest study tips, guides, and partner suggestions from StudyMate.
                    </p>

                    {submitted ? (
                        <p className="text-green-500 font-semibold">
                            Thanks for subscribing!
                        </p>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="w-full flex flex-col sm:flex-row items-center gap-4"
                        >
                            <div className="relative w-full">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-full border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <FaEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/50" />
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    )}
                </div>
            </Container>
        </section>
    );
};

export default Newsletter;
