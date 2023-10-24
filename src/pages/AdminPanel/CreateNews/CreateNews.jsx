import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FirestoreService } from "src/services/firestore.service";
import { Alert } from "@mui/material";
import { useState } from "react";
import { StorageService } from "src/services/storage.service";
import NewsFeed from "src/components/layout/ui/news/NewsFeed";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

//TODO Правильно выставить reset()

function CreateNews() {
  const [alert, setAlert] = useState({
    type: 'none',
    message: null
  })
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
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

  const addNews = async (data) => {
    console.log(data)
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
        className="flex flex-col mx-auto mt-5 gap-7"
        onSubmit={handleSubmit(addNews)}
      >
        <input
          {...register("title", { required: "Requared" })}
          className="p-2"
          placeholder="Заголовок"
        />
        {errors?.title?.message && <p>Requared</p>}
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
        <Controller
          control={control}
          name="text"
          render={({ field }) => (
            <SunEditor
              // setContents="My contents"
              showToolbar={true}
              onChange={(e) => field.onChange(e)}
              setDefaultStyle="height: auto"
              setOptions={{
                buttonList: [
                  [
                    "bold",
                    "underline",
                    "italic",
                    "strike",
                    "list",
                    "align",
                    "fontSize",
                    "formatBlock",
                    "table",
                    "image"
                  ]
                ]
              }}
            />
          )}  
        />
        <button> Создать пост </button>
      </form>
      <NewsFeed />
    </>
  );
}

export default CreateNews;
