import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "@/pages/Home/HomePage/HomePage";
import AdminPanel from "@/pages/AdminPanel/AdminPanel";
import CreateNews from "@/pages/AdminPanel/CreateNews/CreateNews";
import ArticlesPage from "@/pages/Articles/ArticlesPage";
import NewsArticleDetail from "./news/NewsArticleDetail";
import LoginPage from "@/pages/AuthPage/LogInPage";
import SignUpPage from "@/pages/AuthPage/SignUpPage";
import Profile from "@/pages/UserProfile/Profile";
import UsersControl from "@/pages/AdminPanel/UsersControl/UsersControl";
import Header from "../header/Header";
import Categorys from "@/pages/AdminPanel/Categories/Сategories";
import EditArticlePage from "@/pages/Articles/EditArticlePage";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />}/>

          <Route path="/admin" element={<AdminPanel />}>
            <Route path='createNews' element={<CreateNews />}/>
            <Route path='usersControl'element={<UsersControl />}/>
            <Route path='categorys' element={<Categorys />}/>
          </Route>
    
          <Route path="/articles" element={<ArticlesPage />}/>
          <Route path="/articles/:id" element={<NewsArticleDetail />} />
          <Route path="/edit/:id" element={<EditArticlePage />} />

          <Route path="/login" element={<LoginPage />}/>
          <Route path="/signup" element={<SignUpPage />}/>

          <Route path="/profile" element={<Profile />}/>
    
          <Route element={<div>Not Found</div>} path="*"/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default Router;
