import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { FirestoreService } from "src/services/firestore.service";

function ArticleOptionsMenu({ id }) {
  const queryClient = useQueryClient();
  const user = useSelector((state => state.user.value))
  
  const { mutate } = useMutation(
    ["remove article"],
    (data) => {
      if (user?.userRoles.includes('admin')) FirestoreService.deleteArticle(data)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("remove article");
      },
    }
  );

  return (
    <div>
      <ul className="absolute z-10 flex flex-col visible p-2 gap-y-1 bg-stone-800">
        <li className="cursor-pointer">Редактировать</li>
        <li className="text-red-500 cursor-pointer" onClick={() => mutate(id)}>
          Удалить
        </li>
      </ul>
    </div>
  );
}

export default ArticleOptionsMenu;
