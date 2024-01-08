import { supabase } from '@/utils/supabase'
import {
  TablesInsert,
  TablesUpdate,
} from '@/utils/interfaces/Supabase.interfaces'

export const DatabaseService = {
  async getCurrentUser() {
    try {
      const { data, error } = await supabase.auth.getUser()
      if (error) throw new Error(error.message)
      return data
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async addArticle(article: TablesInsert<'news_articles'>) {
    try {
      const { data: currentUser, error: getUserError } =
        await supabase.auth.getUser()
      if (getUserError) throw getUserError.message

      const request: TablesInsert<'news_articles'> = {
        author: currentUser.user?.user_metadata.login,
        title: article.title,
        text: article.text,
        categories: article.categories,
        imgURL: article.imgURL,
      }

      const { error: insertError } = await supabase
        .from('news_articles')
        .insert(request)
        .select()
      if (insertError) throw insertError.message

      return null
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async updateArticleById(article: TablesUpdate<'news_articles'>, id: number) {
    try {
      const request: TablesUpdate<'news_articles'> = {
        title: article.title,
        text: article.text,
        categories: article.categories,
        imgURL: article.imgURL,
      }

      const { data, error: updateError } = await supabase
        .from('news_articles')
        .update(request)
        .eq('id', id)
        .select()

      if (updateError) throw updateError.message
      return data
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async getArticles(startIndex: number, limit: number) {
    try {
      const { count, error: getCountError } = await supabase
        .from('news_articles')
        .select('*', { count: 'exact', head: true })
      if (getCountError) throw getCountError.message

      const { data, error: getArticlesError } = await supabase
        .from('news_articles')
        .select('*', { count: 'exact' })
        .range(startIndex, limit)
        .order('creation_date', { ascending: false })
      if (getArticlesError) throw getArticlesError.message

      return { news: data, newsCount: count }
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async getFilteredArticles(
    startIndex: number,
    limit: number,
    category: string
  ) {
    try {
      const { data, count, error } = await supabase
        .from('news_articles')
        .select('*', { count: 'exact' })
        .contains('categories', [category])
        .range(startIndex, limit)
        .order('creation_date', { ascending: false })
      if (error) throw error.message

      return { news: data, newsCount: count }
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async getArticleById(id: number) {
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .select()
        .eq('id', id)
      if (data && data[0].views != null) {
        const views = data[0].views
        await supabase
          .from('news_articles')
          .update({ views: views + 1 })
          .eq('id', id)
          .select()
      }

      if (error) throw error.message

      return data
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async deleteArticle(id: number) {
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .delete()
        .eq('id', id)
      if (error) throw error.message

      return data
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async getCategoriesList() {
    try {
      const { data, error } = await supabase.from('categories').select()
      if (error) throw error.message

      return data
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async addCategory(name: string) {
    try {
      const { error } = await supabase
        .from('categories')
        .insert({ name: name, value: name })
      if (error) throw error.message

      return null
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async deleteCategoryByName(name: string) {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('name', name)
      if (error) throw error.message

      return error
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async getAllUsers() {
    try {
      const { data, error } = await supabase.from('profiles').select('*')
      if (error) throw error.message

      return data
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async getUserAvatar() {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser()
      if (userError) throw userError.message

      const { data, error } = await supabase.from('profiles').select('avatar').eq('id', userData.user.id)
      if (error) throw error.message

      return data && data[0].avatar
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async getUserAvatarById(id: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('avatar')
        .eq('id', id)
      if (error) throw error.message

      return data && data[0].avatar
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async getUserDataByMultipleId(id: string[]) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('avatar, id, login')
        .in('id', id)
        
      if (error) throw error.message
      return data
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async updateUserAvatar(avatar: Blob) {
    const user = (await supabase.auth.getUser()).data.user
    if (user) {
      try {
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(`${user.id}/avatar_${user.email}.png`, avatar, {
            cacheControl: '3600',
            upsert: true,
          })
        if (uploadError) throw uploadError.message

        const { data: avatarURL } = supabase.storage
          .from('avatars')
          .getPublicUrl(`${user.id}/avatar_${user.email}.png`)
        const { data, error: updateError } = await supabase
          .from('profiles')
          .update({ avatar: avatarURL.publicUrl })
          .eq('id', user.id)
        if (updateError) throw updateError.message

        return data
      } catch (error) {
        throw new Error(error as string)
      }
    }
    return null
  },
  async uploadArticlePreview(img: Blob | string, articleTitle: string) {
    const cyrillic =
      'АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя'
    const latin =
      'AaBbVvGgDdEeYoZhzZzIiYyKkLlMmNnOoPpRrSsTtUuFfKhkhTstschShshSchschYiyYyEeYuyuYayya'

    const cyrillicChars = cyrillic.split('')
    const latinChars = latin.split('')
    const cyrillicToLatin: any = {}

    cyrillicChars.forEach((char, index) => {
      cyrillicToLatin[char] = latinChars[index]
    })

    const correctName = articleTitle
      .split('')
      .map((char) => cyrillicToLatin[char] || char)
      .join('')
      .replace(/[\s\{}^%`[\]">[~<#|«»/]/g, '_')

    try {
      const { error: uploadError } = await supabase.storage
        .from('article_preview')
        .upload(`${correctName}.png`, img, {
          cacheControl: '3600',
          upsert: true,
          contentType: 'image/jpeg',
        })

      if (uploadError) throw uploadError.message

      const { data: preview_src } = supabase.storage
        .from('article_preview')
        .getPublicUrl(`${correctName}.png`)

      return preview_src.publicUrl
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async getComments(articleID: number, startIndex: number, limit: number) {
    try {
      // const { count } = await supabase
      //   .from('comments')
      //   .select('*', { count: 'exact', head: true })
      //   .eq('article_id', articleID)
      // if (error) throw new Error(error.message)

      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('article_id', articleID)
        .order('created_at', { ascending: false })
        .range(startIndex, limit)
      if (error) throw new Error(error.message)

      return data
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async getCommentCount(articleID: number) {
    try {
      const { count, error } = await supabase
        .from('comments')
        .select('*', { count: 'exact', head: true })
        .eq('article_id', articleID)
      if (error) throw new Error(error.message)

      return count
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async writeComment(comment: TablesInsert<'comments'>) {
    try {
      const currentUser = await this.getCurrentUser()
      comment.author_id = currentUser.user.id

      const { data, error } = await supabase.from('comments').insert(comment)
      console.log(data)
      if (error) throw new Error(error.message)
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async redactComment(id: number, text: string) {
    try {
      const { data, error } = await supabase.from('comments').update({text: text}).eq('id', id)
      if (error) throw new Error(error.message)
      return data
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async deleteComment(id: number) {
    try {
      const { data, error } = await supabase.from('comments').delete().eq('id', id)
      if (error) throw new Error(error.message)
      return data
    } catch (error) {
      throw new Error(error as string)
    }
  },
  async likeComment(commentID: number) {
    try {
      const id = (await this.getCurrentUser()).user.id
      
      const { data, error } = await supabase.rpc('like_comment', {comment_id: commentID, user_id: id})
      if (error) throw new Error(error.message)
      return data
    } catch(error) {
      throw new Error(error as string)
    }
  },
  async dislikeComment(commentID: number) {
    try {
      const id = (await this.getCurrentUser()).user.id
      
      const { data, error } = await supabase.rpc('dislike_comment', {comment_id: commentID, user_id: id})
      if (error) throw new Error(error.message)
      return data
    } catch(error) {
      throw new Error(error as string)
    }
  },
}
