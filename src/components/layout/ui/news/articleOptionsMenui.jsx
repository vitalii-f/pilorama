import React from "react";

function articleOptionsMenui( {id} ) {
  return (
    <div>
      <ul
        className="absolute z-10 flex flex-col visible p-2 gap-y-1 bg-stone-800">
        <li className="cursor-pointer">Редактировать</li>
        <li
          className="text-red-500 cursor-pointer"
          onClick={() => mutate(id)}
        >
          Удалить
        </li>
      </ul>
    </div>
  );
}

export default articleOptionsMenui;
