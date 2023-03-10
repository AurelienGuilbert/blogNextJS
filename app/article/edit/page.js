"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import "../../../styles/globals.css";

function updateArticle() {
  const [article, setArticle] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [ValidationMessage, setValidationMessage] = useState("");
  const searchParams = useSearchParams();
  const articleId = searchParams.get("id");

  // session
  const { data } = useSession();
  const token = data ? data.token : ""
  

  const fetchData = () => {
    axios.get(`/api/articles/show?id=${articleId}`).then((response) => {
      console.log(response.data);
      setArticle(response.data);
    });
  };

  const updateArticle = async () => {
    //PUT form values
    const res = await fetch("/api/articles/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        articleId: articleId,
        title: articleTitle,
        content: articleContent
      }),
    });
    //Await for data for any desirable next steps
    const data = await res.json();
    setValidationMessage(data.message);
    fetchData()
  };

  const handleValidation = (event) => {
    // do verifications
    updateArticle();
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    handleValidation();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-fluid c-bg-dark ">
      <Link
        className="nav-link"
        href={{
          pathname: "/article/show",
          query: { id: article._id },
        }}
      >
        <div className="text-white c-small pt-2">back to the article</div>
      </Link>
      {/* update  */}
      <div className="row d-flex justify-content-center">
        <div className="col-6 col-lg-5 ">
          <form
            className="border border-secondary rounded p-4 text-white my-4"
            onSubmit={loginSubmit}
          >
            <h1 className="mb-4">Update article</h1>
             {/* image  */}
             <div>
              <img
                src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp"
                className="card-img-top rounded mb-1 "
                alt="Hollywood Sign on The Hill"
              />
            </div>

            <div className="form-outline mb-4">
              <label htmlFor="title_field">Title</label>
              <textarea
                type="text"
                id="title_field"
                className="form-control"
                placeholder={article.title}
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
              ></textarea>
            </div>

            <div className="form-outline mb-4">
            <label htmlFor="content_field">Content</label>
              <textarea
                type="text"
                id="content_field"
                className="form-control"
                placeholder={article.content}
                value={articleContent}
                onChange={(e) => setArticleContent(e.target.value)}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-block w-100 btn-primary btn-block mb-4"
            >
              Update
            </button>
            <div className="mt-1">{ValidationMessage}</div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default updateArticle;
