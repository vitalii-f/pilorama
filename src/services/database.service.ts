import { supabase } from '@/utils/supabase'
import { Tables, TablesInsert } from '@/utils/interfaces/Supabase.interfaces'

export const DatabaseService = {
  async addArticle(article: TablesInsert<'news_articles'>) {
    const currentUser = await supabase.auth.getUser()

    const request: TablesInsert<'news_articles'> = {
      author: currentUser.data.user?.user_metadata.login,
      title: article.title,
      text: article.text,
      creation_date: (new Date()).toString(),
      categories: article.categories,
      imgURL: article.imgURL,
    }
    
    const { error } = await supabase
      .from('news_articles')
      .insert(request)
      .select()

    return error
  },
  async getArticles(startIndex = 0, limit = 1) {
    const { data, count } = await supabase.from('news_articles').select('*', {count: 'exact'}).range(startIndex, startIndex + limit)
    return { news: data, newsCount: count }
  },
  async getFilteredArticles(startIndex = 0, limit = 1, category: string) {
    const { data, count } = await supabase.from('news_articles').select('*', {count: 'exact'}).contains('categories', [category]).range(startIndex, startIndex + limit)
    return { news: data, newsCount: count }
  },
  async getArticleById(id: number) {
    const { data } = await supabase.from('news_articles').select().eq('id', id)
    return data
  },
  async deleteArticle(id: number) {
    const {data } = await supabase.from('news_articles').delete().eq('id', id)
    return data
  },
  async getСategoriesList() {
    const { data } = await supabase.from('categories').select()
    return data
  },
  async addCategory(name: string) {
    const { error } = await supabase.from('categories').insert({name: name})
    return error
  },
  async deleteCategoryByName(name: string) {
    const { error } = await supabase.from('categories').delete().eq('name', name)
    return error
  },
  async getAllUsers() {
    const { data } = await supabase.from('profiles').select('*')
    return data
  }
}
