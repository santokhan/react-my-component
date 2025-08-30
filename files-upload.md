# 📂 FileUpload Component Documentation

## Overview

The `FileUpload` component provides a drag-and-drop or browse functionality for uploading files.
It integrates with your authentication hook (`useAuth`) to send files to the backend API (`/api/v1/upload`).
Uploaded files are displayed with a preview (if image) and can be removed by the user.

---

## ✨ Features

* Drag & drop or browse file upload.
* Multiple file uploads supported.
* Uploads files to `/api/v1/upload`.
* Displays uploaded files with previews.
* Ability to remove uploaded files.
* Works with external state management (`files`, `setFiles`).

---

## 📦 Props

| Prop       | Type       | Default     | Description                               |
| ---------- | ---------- | ----------- | ----------------------------------------- |
| `prefix`   | `string`   | `"uploads"` | Upload folder prefix sent to API.         |
| `files`    | `array`    | `[]`        | Current list of uploaded file names.      |
| `setFiles` | `function` | —           | State setter to update uploaded files.    |
| `name`     | `string`   | —           | Input `name` attribute for form handling. |

---

## 🛠️ Usage Example

```jsx
import { useState } from "react";
import FileUpload from "./components/FileUpload";

const MyForm = () => {
  const [files, setFiles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted files:", files);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FileUpload 
        prefix="user-documents"
        files={files}
        setFiles={setFiles}
        name="attachments"
      />
      <button 
        type="submit" 
        className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-lg"
      >
        Submit
      </button>
    </form>
  );
};

export default MyForm;
```

---

## ⚙️ How It Works

1. **File Selection**

   * User drags & drops or browses files.
   * Files are appended to a `FormData` object.

2. **Upload Process**

   * Sends `POST` request to `/api/v1/upload` with files and prefix.
   * Expects a response with `data.files`.

3. **File Management**

   * Uploaded file names are merged with existing ones.
   * Previews are displayed.
   * Users can remove files from the list.

---

## 📸 UI Preview

* Upload box with **drag & drop area**.
* Uploaded files shown as thumbnails (if images).
* Each file has a ❌ remove button.

---

## 🚀 API Response Format (Expected)

Your API should return something like:

```json
{
  "files": [
    { "filename": "example.jpg" },
    { "filename": "document.pdf" }
  ]
}
```

---

## 🔒 Notes

* The `useAuth().request` function must handle authentication and fetch logic.
* Non-image files will not display a preview but will still show as an uploaded item.
* The API should support `multipart/form-data`.
