/* eslint-disable react/prop-types */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import { NewsService } from "../../../../services/news.service";

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
  const [currentPage, setCurrentPage] = useState(0);

  const [elementVisibility, setElementVisibility] = useState({
    invisibleStyle:
      "absolute z-10 flex flex-col invisible p-2 gap-y-1 bg-stone-800",
    visibleStyle:
      "absolute z-10 flex flex-col visible p-2 gap-y-1 bg-stone-800",
    id: null,
    togled: false,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    ["remove article"],
    (data) => NewsService.removeArticle(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("remove article");
      },
    }
  );

  if (!Array.isArray(news))
    return <h2 className="text-2xl text-red-400">Error: Incorrect data!</h2>;

  const endOffset = +itemOffset + +itemsPerPage;
  const currentItems = news.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(news.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % news.length;
    setItemOffset(newOffset);
  };

  function togleMenu(id) {
    elementVisibility.togled
      ? setElementVisibility((prev) => ({ ...prev, id: id, togled: false }))
      : setElementVisibility((prev) => ({ ...prev, id: id, togled: true }));
  }

  return (
    <section className="flex flex-col w-full">
      <div className="flex items-center">
        <Paginate
          breakLabel="..."
          nextLabel="вперёд"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={pageCount}
          previousLabel={"назад"}
          forcePage={currentPage}
          renderOnZeroPageCount={null}
        />
        <select
          className="h-10"
          onChange={(item) => {
            setCurrentPage(0);
            setItemsPerPage(item.target.value);
          }}
        >
          <option>2</option>
          <option>3</option>
          <option>5</option>
          <option>10</option>
        </select>
      </div>
      {currentItems.length ? (
        currentItems.map((item) => (
          <article
            className="p-3 mt-4 transition-shadow shadow-md shadow-blue-500 max-h-40 hover:shadow-blue-800"
            key={item.id}
          >
            <div className="flex items-center justify-between border-b-2 border-solid border-slate-500">
              <h3 className="text-lg break-words text-ellipsis line-clamp-2">
                {item.title}
              </h3>
              <div className="relative">
                <button
                  onClick={() => {
                    togleMenu(item.id);
                  }}
                >
                  ...
                </button>
                <ul
                  className={
                    item.id === elementVisibility.id &&
                    elementVisibility.togled === true
                      ? elementVisibility.visibleStyle
                      : elementVisibility.invisibleStyle
                  }
                >
                  <li className="cursor-pointer">Редактировать</li>
                  <li
                    className="text-red-500 cursor-pointer"
                    onClick={() => mutate(item.id)}
                  >
                    Удалить
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-2 break-words text-ellipsis line-clamp-4">
              {item.text}
            </p>
          </article>
        ))
      ) : (
        <h2> No Articles</h2>
      )}
    </section>
  );
}

export default NewsArticles;
