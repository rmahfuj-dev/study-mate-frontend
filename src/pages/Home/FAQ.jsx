import React from "react";
import Container from "../../components/Container";

const FAQ = () => {
  return (
    <section
      id="faq"
      className="py-20 bg-base-100 w-full flex flex-col justify-center items-center"
    >
      <div className="w-full max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-primary">
            Frequently Asked Questions
          </h2>
          <p className="text-base-content/70 max-w-xl mx-auto">
            Everything you need to know about StudyMate and how it helps you
            find the perfect study partner.
          </p>
        </div>

        <div className="join join-vertical w-full">
          {/* Question 1 */}
          <div className="collapse collapse-arrow join-item border border-base-300 bg-base-200">
            <input type="radio" name="faq-accordion" defaultChecked />
            <div className="collapse-title text-lg font-medium">
              How does StudyMate help me find a study partner?
            </div>
            <div className="collapse-content">
              <p>
                StudyMate connects you with verified students who share similar
                subjects or study interests. You can browse partner profiles,
                send connect requests, and start learning together.
              </p>
            </div>
          </div>

          {/* Question 2 */}
          <div className="collapse collapse-arrow join-item border border-base-300 bg-base-200">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-medium">
              Do I need to create an account to connect with someone?
            </div>
            <div className="collapse-content">
              <p>
                Yes, you’ll need to sign up or log in with your Google or email
                account to send or manage study connections securely.
              </p>
            </div>
          </div>

          {/* Question 3 */}
          <div className="collapse collapse-arrow join-item border border-base-300 bg-base-200">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-medium">
              Can I remove a partner from my connections later?
            </div>
            <div className="collapse-content">
              <p>
                Absolutely! You can manage or remove any partner anytime from
                your “My Connections” page. The partner’s connection count will
                automatically update.
              </p>
            </div>
          </div>

          {/* Question 4 */}
          <div className="collapse collapse-arrow join-item border border-base-300 bg-base-200">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-medium">
              What if I can’t find any partner related to my subject?
            </div>
            <div className="collapse-content">
              <p>
                Try searching with different keywords or filter by experience
                level. New partners join every day, so check back later for
                better matches.
              </p>
            </div>
          </div>

          {/* Question 5 */}
          <div className="collapse collapse-arrow join-item border border-base-300 bg-base-200">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-medium">
              Is my information private and secure?
            </div>
            <div className="collapse-content">
              <p>
                Yes, StudyMate ensures that your data is safely stored and never
                shared with third parties. Only your basic profile details are
                visible to others for connection purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
