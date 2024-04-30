import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '@/pages/Home/HomePage/HomePage'
import AdminPanel from '@/pages/AdminPanel/AdminPanel'
import CreateNews from '@/pages/AdminPanel/CreateNews/CreateNews'
import ArticlesPage from '@/pages/Articles/ArticlesPage'
import NewsArticleDetail from '../components/layout/ui/news/NewsArticleDetail'
import LoginPage from '@/pages/AuthPage/LogInPage'
import SignUpPage from '@/pages/AuthPage/SignUpPage'
import Profile from '@/pages/UserProfile/Profile'
import UsersControl from '@/pages/AdminPanel/UsersControl/UsersControl'
import Header from '../components/layout/header/Header'
import Categories from '@/pages/AdminPanel/Categories/Сategories'
import EditArticlePage from '@/pages/Articles/EditArticlePage'
import Reports from '@/pages/AdminPanel/Reports/Reports'

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />

          <Route path='/admin' element={<AdminPanel />}>
            <Route path='createNews' element={<CreateNews />} />
            <Route path='usersControl' element={<UsersControl />} />
            <Route path='categories' element={<Categories />} />
            <Route path='reports' element={<Reports />} />
          </Route>

          <Route path='/articles' element={<ArticlesPage />} />
          <Route path='/articles/:id' element={<NewsArticleDetail />} />
          <Route path='/edit/:id' element={<EditArticlePage />} />

          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />

          <Route path='/profile' element={<Profile />} />

          <Route element={<div>Not Found</div>} path='*' />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default Router
