import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
const Feedback = () => {
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();
  const [error, setError] = useState(false);
  function clear() {
    setEmail("");
    setMessage("");
  }
  const addFeedback = async () => {
    if (!message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      //console.log("fail", !message, !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
      alert("Failed");
      setError(true);
      return false;
    } else {
      // console.log(
      //   "Success",
      //   !message,
      //   !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      // );
      let result = await fetch("http://localhost:3000/post-feedback", {
        method: "post",
        body: JSON.stringify({ email, message }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);
      clear();
      alert("Thanks for your Feedback");
    }
  };
  return (
    <section className="bg-gray-900  dark:bg-gray-900 text-white">
      <div className="bg-gray-900 w-full md:h-[100vh] lg:h-[100vh] xl:h-[100vh] 2xl:h-[100vh]  h-fit  ">
        <Link
          to={"/"}
          className="fa-solid m-8 text-white fa-2x fa-arrow-left"
        ></Link>
        <div className="container mx-auto flex flex-col md:flex-row lg:mb-10 2xl:mb-12 2xl:h-[75%] md:my-12">
          <div className="flex flex-col w-full lg:w-1/3 p-8 justify-center">
            <p className="ml-6 text-yellow-300 text-lg uppercase tracking-loose">
              REVIEW
            </p>
            <p className="text-3xl md:text-5xl my-4 leading-relaxed md:leading-snug">
              Leave us a feedback!
            </p>
            <p className="text-sm md:text-base leading-snug text-gray-50 text-opacity-100">
              Please provide your valuable feedback and something something ...
            </p>
          </div>
          <div className="flex flex-col w-full lg:w-2/3  justify-center">
            <div className="container w-full px-4">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white">
                    <div className="flex-auto p-5 lg:p-10">
                      <h4 className="text-2xl mb-4 text-black font-semibold">
                        Have a suggestion?
                      </h4>
                      <div id="feedbackForm">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="email"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="border-0 px-3 py-3 rounded text-sm shadow w-full
                    bg-gray-300 placeholder-black text-gray-800 outline-none focus:bg-gray-400"
                            placeholder=" "
                            style={{ transition: "all 0.15s ease 0s" }}
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="message"
                          >
                            Message
                          </label>
                          <textarea
                            maxLength="499"
                            name="feedback"
                            id="feedback"
                            rows="4"
                            cols="80"
                            className="border-0 px-3 py-3 bg-gray-300 placeholder-black text-gray-800 rounded text-sm shadow focus:outline-none w-full"
                            placeholder=""
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          ></textarea>
                        </div>
                        <div className="text-center mt-6">
                          <button
                            id="feedbackBtn"
                            className="bg-yellow-300 text-black text-center mx-auto active:bg-yellow-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                            style={{ transition: "all 0.15s ease 0s" }}
                            onClick={addFeedback}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
