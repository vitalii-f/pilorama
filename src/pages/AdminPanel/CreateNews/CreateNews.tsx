import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "@mui/material";
import { useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import NewsFeed from "@/components/layout/ui/news/NewsFeed";
import { StorageService } from "@/services/storage.service";
import { FirestoreService } from "@/services/firestore.service";
import { AlertProps, IArticle } from "@/utils/interfaces/interfaces";

//TODO Правильно выставить reset()

// interface FormInputs = {
  
// }

function CreateNews() {
  const [alert, setAlert] = useState<AlertProps>({
    type: 'none',
    message: ''
  })
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<IArticle>({
    mode: "onChange",
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    {
      mutationKey: ['add article'],
      mutationFn: async (data: IArticle) => {
        await StorageService.uploadNewsPreview(data.imgURL[0], 'news_preview_' + data.title)
        data.imgURL = await StorageService.downloadNewsPreview('news_preview_' + data.title)
        await FirestoreService.addArticle(data)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['add articles']});
        // reset();
        setAlert({type: 'success', message: 'Пост успешно опубликован!'})
      },
      onError: (error) => {
        setAlert({type: 'error', message: error.message})
      }
    }
  );

  const addNews = async (data: IArticle) => {
    mutate(data);
  };
  
  function showAlert(type: string, message: string) {
    if (type === 'success') return <Alert onClose={() => setAlert({type: 'none', message: ''})} severity="success">{message}</Alert>
    if (type === 'error') return <Alert onClose={() => setAlert({type: 'none', message: ''})} severity="error"> {message} </Alert>
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
        <input type="file" {...register('imgURL')} required/>
        <Controller
          control={control}
          name="text"
          render={({ field }) => (
            <SunEditor
              // setContents="My contents"
              // showToolbar={true}
              onChange={(e) => field.onChange(e)}
              setDefaultStyle={"height: auto"}
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
