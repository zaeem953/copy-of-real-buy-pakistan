import React from "react";
import { useState, useEffect } from "react";
function AdminFeedbackpage(props) {
  const [feedbackData, setFeedbackData] = useState([]);
  const [email, setEmail] = useState([]);
  const [description, setDescription] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  // --------------------
  const getFeedback = async () => {
    let result = await fetch("http://localhost:3000/get-feedback");
    result = await result.json();
    setFeedbackData(result);
  };
  //--------------------------------
  const getFeedbackDetail = async (id) => {
    try {
      let result = await fetch(`http://localhost:3000/get-feedback/${id}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      if (result.ok) {
        result = await result.json();
        setEmail(result.email);
        setDescription(result.message);
        setUpdateId(result.id);
      } else {
        console.error("Failed to fetch feedback details.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  //--------------------------------
  useEffect(() => {
    getFeedback();
  }, []);
  //----------------------------------------DELETE PRODUCTS-----------------------------------------------
  const deleteFeedback = async () => {
    let result = await fetch(
      `http://localhost:3000/delete-feedback/${updateId}`,
      {
        method: "Delete",
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    result = await result.json();
    props.setFeedback(props.feedback - 1);
    if (result) {
      getFeedback();
    }
  };
  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className=" flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className=" bg-[#214D12] text-white">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-center text-sm font-bold "
                      >
                        No.
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-center text-sm font-bold "
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-center text-sm font-bold "
                      >
                        Message
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-center text-sm font-bold"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-center divide-gray-200 bg-white">
                    {feedbackData.length > 0 ? (
                      feedbackData.map((feedback, index) => (
                        <tr className="hover:bg-gray-200" key={feedback.id}>
                          <td className="px-4 py-4 font-bold">{index + 1}</td>
                          <td className="whitespace-nowrap px-8 py-4">
                            <div className="text-sm text-gray-900 font-bold">
                              {feedback.email}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="text-sm text-gray-900 font-bold">
                              {feedback.message[0]}
                              {feedback.message[1]}
                              {feedback.message[2]}
                              ...
                            </div>
                          </td>
                          <td className=" flex flex-wrap whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                            <button
                              onClick={() => {
                                document
                                  .getElementById("view_modal")
                                  .showModal();
                                getFeedbackDetail(feedback.id);
                              }}
                              className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                              View
                            </button>
                            <button
                              onClick={() => {
                                document
                                  .getElementById("delete_modal")
                                  .showModal();
                                getFeedbackDetail(feedback.id);
                              }}
                              className="bg-red-500 m-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6}>
                          <h1 className="text-red-600 font-bold p-6 ">
                            No Feedback Found...
                          </h1>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        {/* View */}
        <dialog
          id="view_modal"
          className="modal p-4 rounded-lg border w-[50%] border-slate-400"
        >
          <div className="modal-box">
            <form method="dialog" className="items-center">
              <div className="product" style={{ marginLeft: "0px" }}>
                <p className="font-bold text-xl text-center">User Feedback</p>
                <p>Email :</p>
                <input
                  type="text"
                  className="inputBox"
                  value={email}
                  readOnly
                />
                <p>Message :</p>
                <textarea
                  rows="6"
                  cols="35"
                  className="px-3 py-3 inputBox bg-whitetext-black text-sm shadow focus:outline-none w-full"
                  placeholder=""
                  value={description}
                  readOnly
                ></textarea>
              </div>
              <div>
                <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Close
                </button>
              </div>
            </form>
          </div>
        </dialog>
        {/* Delete */}
        <dialog
          id="delete_modal"
          className="modal p-4 rounded-lg border w-[50%] border-slate-400"
        >
          <div className="modal-box">
            <form method="dialog" className="items-center">
              <div className="product" style={{ marginLeft: "0px" }}>
                <p className="font-bold text-xl text-center">User Feedback</p>
                <p>Email :</p>
                <input
                  type="text"
                  className="inputBox"
                  value={email}
                  readOnly
                />
                <p>Message :</p>
                <textarea
                  rows="6"
                  cols="35"
                  className="px-3 py-3 inputBox bg-whitetext-black text-sm shadow focus:outline-none w-full"
                  placeholder=""
                  value={description}
                  readOnly
                ></textarea>
              </div>
              <div>
                <button
                  onClick={deleteFeedback}
                  className="bg-red-500 m-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete Feedback
                </button>
                <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Close
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </section>
    </>
  );
}

export default AdminFeedbackpage;
