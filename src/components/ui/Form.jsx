import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../common/Input";
import Container from "../common/Container";
import H from "../common/H";

function EnquireForm() {
  const [sending, setSending] = React.useState(false);

  function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      nationality: formData.get("nationality"),
      message: formData.get("message"),
    };

    setSending(true);
    fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        toast.success(
          "Thank you for your interest. We will get in touch shortly."
        );
        setSending(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setSending(false);
      });
  }

  return (
    <Container className="sm:py-8 md:py-12 lg:py-16" id="getInTouch">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 border">
        <H variant="h3" className="text-center">
          REGISTER YOUR INTEREST
        </H>
        <form className="mt-8" onSubmit={onSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <Input
              id="first_name"
              name="first_name"
              type="text"
              placeholder="First Name"
              required
            />
            <Input
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Last Name"
              required
            />
            <Input id="email" type="email" placeholder="Email" required />
            <Input id="phone" type="text" placeholder="Phone" required />
            <sdiv className="sm:col-span-2">
              <Input
                id="address"
                name="address"
                type="text"
                placeholder="Address"
                className=""
              />
            </sdiv>
            <div className="sm:col-span-2">
              <textarea
                id="message"
                name="message"
                rows="8"
                className="block w-full border border-gray-300 p-2.5 text-sm text-gray-900 focus:outline-none focus:border-black"
                placeholder="Message"
              ></textarea>
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="border px-4 py-2 rounded bg-black text-white font-medium"
            >
              {sending ? "Sending..." : "Enquire"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </Container>
  );
}

export default EnquireForm;
