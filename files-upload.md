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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

const FileUpload = ({ prefix = "uploads", files = [], setFiles, name }) => {
  const { request } = useAuth();
  const safeFiles = Array.isArray(files) ? files : [];

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (!selectedFiles.length) return;

    const form = new FormData();
    selectedFiles.forEach((file) => form.append("files", file));
    form.append("prefix", prefix);

    try {
      const res = await request(`/api/v1/upload`, {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      const uploaded = Array.isArray(data.files) ? data.files : [];
      const names = uploaded.map((f) => f?.filename).filter(Boolean);

      setFiles([...safeFiles, ...names]); // merge existing + new

      e.target.value = "";
    } catch (error) {
      console.error("❌ Failed to upload file:", error);
    }
  };

  const removeFile = (fileName) => {
    setFiles(safeFiles.filter((f) => f !== fileName));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Attachments
      </label>

      <label className="text-center w-full py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-900 transition">
        <FontAwesomeIcon
          icon={faUpload}
          size="2xl"
          className="text-blue-900 mb-2"
        />
        <p className="text-gray-500 text-md">Drag & drop file here or </p>
        <p className="text-blue-900 text-xs">Browse file to upload</p>
        <input
          name={name}
          id="file"
          type="file"
          multiple
          onChange={handleFileChange}
          className="opacity-0"
        />
      </label>

      {safeFiles.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-3">
          {safeFiles.map((file, idx) => (
            <div
              key={idx}
              className="relative flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-lg p-3"
            >
              <img
                src={
                  file.startsWith("http") || file.startsWith("/api")
                    ? file
                    : `/api/uploads/${file}`
                }
                alt={file}
                className="size-18 object-cover rounded"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <button
                type="button"
                onClick={() => removeFile(file)}
                className="absolute top-1 right-1 cursor-pointer px-2 py-1 text-white rounded-full bg-red-500 hover:bg-red-700 text-sm transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
```

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
