"use client";

import { useState, useEffect } from 'react'
import axios from "axios";

const HomePage = () => {
  const [articles, setArticles] = useState([])
  const fetchData = () => {
    return axios.get("api/articles/all")
    .then((response) => {
      const data = response.data;
      data.forEach(element => {
        console.log(element);
        setArticles([...articles, element])
      });
    } 
    )
  }

  useEffect(() => {
    fetchData();
  }, [])
  return (
    <div>
      {articles.map(article => <div>{article.title}</div>)}
    </div>
  );
};

export default HomePage;
