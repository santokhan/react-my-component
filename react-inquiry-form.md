# React Inquiry Form

## Step 1: Installation

```bash
bun add tailwind-merge
```

```bash
bun add react-toastify
```

## Step 2: Components

```jsx
// Container.jsx

import { twMerge } from "tailwind-merge";

// eslint-disable-next-line react/prop-types
const Container = ({ children, className = "", ...props }) => {
  return (
    <div
      className={twMerge(
        "max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
```

```jsx
// H.jsx

import { twMerge } from "tailwind-merge";

// eslint-disable-next-line react/prop-types
const H = ({ variant, children, className = "" }) => {
  let titleClasses = "";

  switch (variant) {
    case "h1":
      titleClasses += " text-3xl sm:text-4xl font-bold";
      return <h1 className={twMerge(titleClasses, className)}>{children}</h1>;
    case "h2":
      titleClasses += " text-2xl sm:text-3xl font-semibold";
      return <h2 className={twMerge(titleClasses, className)}>{children}</h2>;
    case "h3":
      titleClasses += " text-xl sm:text-2xl font-semibold";
      return <h3 className={twMerge(titleClasses, className)}>{children}</h3>;
    case "h4":
      titleClasses += " text-lg sm:text-xl font-semibold";
      return <h4 className={twMerge(titleClasses, className)}>{children}</h4>;
    case "h5":
      titleClasses += " text-base sm:text-lg font-semibold";
      return <h5 className={twMerge(titleClasses, className)}>{children}</h5>;
    case "h6":
      titleClasses += " text-sm sm:text-base font-semibold";
      return <h6 className={twMerge(titleClasses, className)}>{children}</h6>;
    default:
      titleClasses += " text-xl font-bold"; // Default variant
      return <h5 className={twMerge(titleClasses, className)}>{children}</h5>;
  }
};

export default H;
```

```jsx
// Input.jsx

import { twMerge } from "tailwind-merge";

// eslint-disable-next-line react/prop-types
function Input({ label, id, type, placeholder, className = "", ...props }) {
  return (
    <div className="w-full">
      <label className="text-sm text-gray-900">
        <span>{label}</span>
        <input
          type={type}
          name={id}
          className={twMerge(
            "rounded block w-full px-3 py-2.5 text-sm text-gray-900 focus:outline-non bg-gray-50 shadow-inner focus:outline-none",
            className
          )}
          placeholder={placeholder}
          {...props}
        />
      </label>
    </div>
  );
}

export default Input;
```

```jsx
// InquiryForm.jsx

import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../common/Input";
import Container from "../common/Container";
import H from "../common/H";
import { twMerge } from "tailwind-merge";

// eslint-disable-next-line react/prop-types
function EnquireForm({ className = "" }) {
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
    <Container
      className={twMerge("sm:py-8 md:py-12 lg:py-16", className)}
      id="getInTouch"
    >
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 border">
        <H variant="h3" className="text-center">
          REGISTER YOUR INTEREST
        </H>
        <form className="mt-8" onSubmit={onSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              name="first_name"
              type="text"
              placeholder="First Name"
              required
            />
            <Input
              name="last_name"
              type="text"
              placeholder="Last Name"
              required
            />
            <Input id="email" type="email" placeholder="Email" required />
            <Input id="phone" type="text" placeholder="Phone" required />
            <sdiv className="sm:col-span-2">
              <Input
                name="address"
                type="text"
                placeholder="Address"
                className=""
              />
            </sdiv>
            <div className="sm:col-span-2">
              <textarea
                name="message"
                rows="6"
                className="block w-full rounded bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none shadow-inner"
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
```

```jsx
import EnquireForm from "./components/ui/Form";

function App() {
  return (
    <>
      <EnquireForm />
    </>
  );
}

export default App;
```
