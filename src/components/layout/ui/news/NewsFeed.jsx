import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import ArticleOptionsMenu from "./ArticleOptionsMenu";
import { CircularProgress } from "@mui/material";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

let coefficient = 1
window.innerWidth < 700
? coefficient = 2
: coefficient = 1

const Paginate = styled(ReactPaginate).attrs({
  activeClassName: "active",
})`
  li a {
    display: block;
    padding: ${0.6/coefficient}em ${1.2/coefficient}em;
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

  const user = useSelector((state) => state.user.value)

  const [haveAccess, setHaveAccess] = useState(false)
  useEffect(() =>{
    setHaveAccess(user?.userRoles.includes('admin'))
  }, [user])

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
          nextLabel="›"
          onPageChange={handlePageClick}
          pageCount={pageCount}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          previousLabel={"‹"}
          renderOnZeroPageCount={null}
          className="pagination"
        />
        <select
          className="h-10"
          onChange={(item) => {setItemsPerPage(item.target.value)}}>
          <option>2</option>
          <option>5</option>
          <option>10</option>
        </select>
      </div>
      {currentItems.length ? (
        currentItems.map((article) => (
          <article
            className="flex p-3 mt-4 transition-shadow shadow-md shadow-blue-500 max-h-44 hover:shadow-blue-800"
            key={article.id}
          >
            <div className="w-60"> <img className="w-full" src={article.imgURL} /> </div>
            <div className="w-full">
              <div className="flex items-center justify-between pb-2 border-b-2 border-solid border-slate-500">
                <div>
                <h3 className="text-lg break-words text-ellipsis line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs">Автор: {article.author}</p>
                </div>
                <div className="relative">
                  {haveAccess ? <button onClick={() => togleMenu(article.id)}>...</button> : null}
                  {elementVisibility.togled && elementVisibility.id === article.id ? <ArticleOptionsMenu id={article.id} /> : null}
                </div>
              </div>
              <p className="mt-2 break-words text-ellipsis line-clamp-2">
                {article.text}
              </p>
              <div className="flex justify-between">
                <span className="mt-2 text-xs">
                  {article.creation_date.toDate().toLocaleDateString()}
                </span>
                <span className="mt-2 text-xs">{article.category}</span>
              </div>
            </div>
          </article>
        ))
      ) : (
        <h2> No Articles</h2>
      )}
    </section>
  );
}

NewsArticles.propTypes = {
  news: PropTypes.array.isRequired
}

export default NewsArticles;
