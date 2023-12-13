import { DatabaseService } from '@/services/database.service'
import { RootState } from '@/store/store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

//TODO rewrite styles with styled component

interface ArticleOptionsMenuProps {
  id: number
}

const ArticleOptionsMenu = ({ id }: ArticleOptionsMenuProps) => {
  const queryClient = useQueryClient()
  const user = useSelector((state: RootState) => state.userSlice.user)

  const { mutate } = useMutation({
    mutationKey: ['remove article'],
    mutationFn: async (id: number) => {
      if (user?.role?.includes('admin')) await DatabaseService.deleteArticle(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
  })

  return (
    <div>
      <ul className='absolute z-10 flex flex-col visible p-2 gap-y-1 bg-stone-800'>
        <li className='cursor-pointer'>Редактировать</li>
        <li className='text-red-500 cursor-pointer' onClick={() => mutate(id)}>
          Удалить
        </li>
      </ul>
    </div>
  )
}

export default ArticleOptionsMenu
