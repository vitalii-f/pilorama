import { FirestoreService } from "@/services/firestore.service";
import { IUserState } from "@/utils/interfaces/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

interface ArticleOptionsMenuProps {
  id: number
}

const ArticleOptionsMenu: React.FunctionComponent<ArticleOptionsMenuProps> = ({ id }) => {
  const queryClient = useQueryClient();
  const user = useSelector((state: IUserState) => state.user.value)
  
  const { mutate } = useMutation(
    {
      mutationKey: ['remove article'],
      mutationFn: async (id: number) => {
        if (user?.userRoles?.includes('admin')) await FirestoreService.deleteArticle(id)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['articles']});
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
