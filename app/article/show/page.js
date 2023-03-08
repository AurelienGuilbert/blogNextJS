"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FaThumbsUp, FaCommentDots } from "react-icons/fa";
import axios from "axios";
import "../../../styles/globals.css";

function App() {
  const { data: session, status } = useSession();
  const [comment, setComment] = useState("");
  const [article, setArticle] = useState("");
  const [ValidationMessage, setValidationMessage] = useState("");
  const searchParams = useSearchParams();
  const articleId = searchParams.get("id");

  const fetchData = () => {
    axios.get(`/api/articles/show?id=${articleId}`).then((response) => {
      console.log(response.data);
      setArticle(response.data);
    });
  };

  const postComment = async () => {
    //POST form values
    console.log("post article started");

    const res = await fetch("/api/articles/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        articleId: articleId,
        comment: comment,
      }),
    });
    //Await for data for any desirable next steps
    const data = await res.json();
    setValidationMessage(data.message);
  };

  const handleValidation = (event) => {
    // do verifications
    postComment();
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
      {/* article */}
      <div className="container pt-3">
        <div className="col mb-2">
          <div className="card c-card text-white">
            {/* titre  */}
            <div className="px-2 pb-2 row">
              <span className="text-truncate ">{article.title}</span>
              <span className="card-text text-truncate c-small">
                {article.content}
              </span>
            </div>

            {/* image  */}
            <div className="px-1">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp"
                className="card-img-top "
                alt="Hollywood Sign on The Hill"
              />
            </div>

            {/* social  */}
            <div className="ps-3 py-2 d-flex align-items-center justify-content-around c-small">
              <div className="d-flex align-items-center justify-content-start">
                <div
                  data-id={article._id}
                  style={{ cursor: "pointer" }}
                  className="d-flex align-items-center me-1"
                >
                  <FaThumbsUp />
                </div>
                <div>{article.likeCount}</div>
              </div>
              <div className="d-flex align-items-center justify-content-start">
                <Link
                  className="nav-link"
                  href={{
                    pathname: "/article/show",
                    query: { id: article._id },
                  }}
                >
                  <div
                    data-id={article._id}
                    style={{ cursor: "pointer" }}
                    className="d-flex align-items-center me-1"
                  >
                    <FaCommentDots />
                  </div>
                </Link>
                <div>{article.commentCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* comment  */}
      <div className="row mt-5 d-flex justify-content-center">
        <div className="col-6 col-lg-5 ">
          <form
            className="border border-secondary rounded p-4"
            onSubmit={loginSubmit}
          >
            <h1 className="mb-4">Comment article</h1>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="content_field">
                Comment
              </label>
              <textarea
                type="text"
                id="content_field"
                className="form-control"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-block w-100 btn-primary btn-block mb-4"
            >
              Post your comment
            </button>
            <div className="mt-1">{ValidationMessage}</div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default App;
