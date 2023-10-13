import { useForm } from "react-hook-form";
import NewsArticles from "../../../components/layout/ui/news/NewsFeed";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FirestoreService } from "src/services/firestore.service";
import { Alert } from "@mui/material";
import { useState } from "react";
import { StorageService } from "src/services/storage.service";


//TODO Правильно выставить reset()

function CreateNews() {
  const [alert, setAlert] = useState({
    type: 'none',
    message: null
  })
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    mode: "onChange",
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    ["add article"],
    async (data) => {
      await StorageService.uploadNewsPreview(data.imageFile[0], 'news_preview_' + data.title)
      data.imageFile = await StorageService.downloadNewsPreview('news_preview_' + data.title)
      await FirestoreService.addArticle(data)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("add articles");
        // reset();
        setAlert({type: 'success'})
      },
      onError: (error) => {
        setAlert({type: 'error', message: error})
      }
    }
  );

  const { data, isLoading, error } = useQuery(["articles"], () =>
    FirestoreService.getArticles()
  );
  if (isLoading) return <h2> Loading </h2>;
  if (error) return <h2> {error} </h2>;

  const addNews = async (data) => {
    mutate(data);
  };
  
  function showAlert(type, message) {
    if (type === 'success') return <Alert onClose={() => setAlert({type: 'none', message: null})} severity="success">Пост успешно опубликован!</Alert>
    if (type === 'error') return <Alert onClose={() => setAlert({type: 'none', message: null})} severity="error"> {message.toString()} </Alert>
  }

  return (
    <>
    {showAlert(alert.type, alert.message)}
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

        <div className="flex overflow-scroll overflow-y-hidden snap-x gap-x-3 scrollbar-container">
          <label className="flex gap-x-2">
            <input type="checkbox" value={'Важное'} {...register('category')} />
            Важное
          </label>
          <label className="flex gap-x-2">
            <input type="checkbox" value={'Политика'} {...register('category')} />
            Политика
          </label>
          <label className="flex gap-x-2">
            <input type="checkbox" value={'Технологии'} {...register('category')} />
            Технологии
          </label>
          <label className="flex gap-x-2">
            <input type="checkbox" value={'Финансы'} {...register('category')} />
            Финансы
          </label>
          <label className="flex gap-x-2">
            <input type="checkbox" value={'Путишествия'} {...register('category')} />
            Путишествия
          </label>
        </div>
        <input type="file" {...register('imageFile')} required/>
        <button> Создать пост </button>
      </form>
      <NewsArticles news={data} />
    </>
  );
}

export default CreateNews;
