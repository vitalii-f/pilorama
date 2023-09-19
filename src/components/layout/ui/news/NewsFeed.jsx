/* eslint-disable react/prop-types */
import { useState } from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import ArticleOptionsMenu from "./ArticleOptionsMenu";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const Paginate = styled(ReactPaginate).attrs({
  activeClassName: "active",
})`
  display: flex;
  margin: 35px auto;
  column-gap: 10px;

  li {
    border-radius: 8px;
    border: 1px solid transparent;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
  }

  li a {
    display: block;
    padding: 0.6em 1.2em;
  }

  li:hover,
  .active {
    border-color: #646cff;
  }
`;

function NewsArticles({ news }) {
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  const [elementVisibility, setElementVisibility] = useState({
    id: null,
    togled: false,
  });

  if (!Array.isArray(news))
    return <div className="flex flex-col items-center content-center w-full gap-y-5"> <h2 className="text-2xl text-yellow-400 ">Loading... </h2> <CircularProgress /> </div>;

  const endOffset = +itemOffset + +itemsPerPage;
  const currentItems = news.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(news.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % news.length;
    setItemOffset(newOffset);
  };

  function togleMenu(id) {
    elementVisibility.togled
      ? setElementVisibility(() => ({id: id, togled: false }))
      : setElementVisibility(() => ({id: id, togled: true }));
  }

  return (
    <section className="flex flex-col w-full">
      <div className="flex items-center">
        <Paginate
          nextLabel="вперёд"
          onPageChange={handlePageClick}
          pageCount={pageCount}
          previousLabel={"назад"}
          renderOnZeroPageCount={null}
        />
        <select
          className="h-10"
          onChange={(item) => {setItemsPerPage(item.target.value)}}>
          <option>2</option>
          <option>5</option>
          <option>10</option>
        </select>
      </div>
      {console.log(news)}
      {currentItems.length ? (
        currentItems.map((article) => (
          <article
            className="p-3 mt-4 transition-shadow shadow-md shadow-blue-500 max-h-40 hover:shadow-blue-800"
            key={article.id}
          >
            <div className="flex items-center justify-between border-b-2 border-solid border-slate-500">
              <h3 className="text-lg break-words text-ellipsis line-clamp-2">
                {article.title}
              </h3>
              <p className="text-xs">Автор: {article.author}</p>
              <div className="relative">
                <button
                  onClick={() => {
                    togleMenu(article.id);
                  }}
                >
                  ...
                </button>
                {elementVisibility.togled && elementVisibility.id === article.id ? <ArticleOptionsMenu id={article.id} /> : null}
              </div>
            </div>
            <p className="mt-2 break-words text-ellipsis line-clamp-4">
              {article.text}
            </p>
            <div className="flex justify-between">
              <span className="mt-2 text-xs">
                {article.creation_date.toDate().toLocaleDateString()}
              </span>
              <span className="mt-2 text-xs">{article.category}</span>
            </div>

          </article>
        ))
      ) : (
        <h2> No Articles</h2>
      )}
    </section>
  );
}

export default NewsArticles;
