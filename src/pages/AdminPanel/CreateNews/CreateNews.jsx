import { useForm } from "react-hook-form";
import NewsArticles from "../../../components/layout/ui/news/NewsFeed";
import { NewsService } from "../../../services/news.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function CreateNews() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    ["add article"],
    (data) => NewsService.addArticle(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("add articles");
        reset();
      },
    }
  );

  const { data, isLoading, error } = useQuery(["articles"], () =>
    NewsService.getArticles()
  );
  if (isLoading) return <h2> Loading </h2>;
  if (error) return <h2> {error} </h2>;

  const addNews = async (data) => {
    mutate(data);
  };

  return (
    <>
      <form
        className="flex flex-col max-w-md mx-auto mt-5 gap-7"
        onSubmit={handleSubmit(addNews)}
      >
        <input
          {...register("title", { required: "Requared" })}
          className="p-2"
          placeholder="Заголовок"
        />
        {errors?.title?.message && <p>Requared</p>}
        <input
          {...register("text", { required: "Requeared" })}
          className="p-2"
          placeholder="Текст"
        />
        <button> Создать пост </button>
      </form>
      <NewsArticles news={data} />
    </>
  );
}

export default CreateNews;
