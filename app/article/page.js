"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

function App() {
  const { data: session, status } = useSession()
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const [ValidationMessage, setValidationMessage] = useState("");

  const post = async () => {
    //POST form values
    console.log('post article started');

    const res = await fetch('/api/articles/post', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          author: session.user.email,
          title: title,
          content: content,
          tag: tag
      }),
    });
    //Await for data for any desirable next steps
    const data = await res.json();
    setValidationMessage(data.message)
  }

  const handleValidation = (event) => {
      // do verifications
      post();
  
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    handleValidation();
  };

  return (
    <div className="container container-fluid">
    <div className="row mt-5 d-flex justify-content-center">
      <div className="col-10 col-lg-5 ">
        <form
          className="border border-secondary rounded p-4"
          onSubmit={loginSubmit}
        >
          <h1 className="mb-4">Create article</h1>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="title_field">
              Title
            </label>
            <input
              type="text"
              id="title_field"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="content_field">
              Content
            </label>
            <textarea
              type="text"
              id="content_field"
              className="form-control"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="tag_field">
              Choose a Tag
            </label>
            <select
              id="tag_field"
              className="form-control"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            >
              <option value="Php">Php</option>
              <option value="Python">Python</option>
              <option value="Javascript">Javascript</option>
              <option value="Node">Node</option>
              <option value="Ruby">Ruby</option>
              <option value="Go">Go</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="btn btn-block w-100 btn-primary btn-block mb-4"
          >
            Post
          </button>
          <div className="mt-1">{ValidationMessage}</div>
        </form>
      </div>
    </div>
  </div>
  );
}
export default App;
