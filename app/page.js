"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

import "../styles/globals.css";
import { FaThumbsUp, FaCommentDots, FaGlasses } from "react-icons/fa";
import css from "../public/img/css.png";
import Image from "next/image";
import { useSession } from "next-auth/react";

const HomePage = () => {
  const { data } = useSession();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setfilteredArticles] = useState([]);
  const [articleId, setArticleId] = useState(null);
  const [search, setSearch] = useState();

  const fetchData = () => {
    axios.get("api/articles/all").then((response) => {
      setArticles(response.data);
      setfilteredArticles(response.data);
    });
  };

  const handleSearch = (e) => {
    console.log(articles[0].title.match(search.toLowerCase()));
    if (search.length > 0) {
      const filtered = articles.filter((article) =>
        article.title.toLowerCase().match(search.toLowerCase())
      );
      setfilteredArticles(filtered);
      console.log(filtered);
    } else if (search.length === 0) {
      setfilteredArticles(articles);
    }
  };
  const handleReset = () => {
    setfilteredArticles(articles);
  };

  const likeArticle = async (e) => {
    // set token JWT
    const token = data.token;

    axios
      .post(
        "/api/articles/like",
        {
          articleId: e.currentTarget.dataset.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      });

    fetchData();
  };

  const readTime = (text) => {
    if (text) {
      return `${Math.round(text.length/300)}min`
    }
    
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="c-bg-dark container-fluid px-4 p-3 justify-content-between align-items-center c-text-white">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="me-1"
        />
        <button onClick={handleSearch} className="btn btn-dark me-1">
          search
        </button>
        <button onClick={handleReset} className="btn btn-dark me-1">
          X
        </button>
      </div>
      <div className="c-bg-dark row row-cols-1 row-cols-md-4 g-2 p-2">
        {filteredArticles.map((article) => (
          <div>
            <div className="col mb-2">
              <div className="card c-card text-white">
                {/* tag  */}
                <div className="d-flex align-items-center justify-content-start p-1">
                  <Image
                    src={css}
                    alt="Picture of the author"
                    width={40}
                    height={40}
                    className="tagLogo"
                  />
                </div>

                {/* titre  */}
                <div className="px-2 pb-2 row">
                  <span className="text-truncate ">{article.title}</span>
                  <span className="card-text text-truncate c-small">
                    {article.content}
                  </span>
                </div>
                <Link
                  className="nav-link"
                  href={{
                    pathname: "/article/show",
                    query: { id: article._id },
                  }}
                >
                  {/* image  */}
                  <div className="px-1">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp"
                      className="card-img-top "
                      alt="Hollywood Sign on The Hill"
                    />
                  </div>
                </Link>
                {/* social  */}
                <div className="py-2 d-flex align-items-center justify-content-around c-small">
                  <div className="d-flex align-items-center justify-content-start">
                    <div
                      data-id={article._id}
                      onClick={likeArticle}
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
                        <FaGlasses />
                      </div>
                    </Link>
                    <div>{readTime(article.text)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
