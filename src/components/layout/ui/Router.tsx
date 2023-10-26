import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "@/pages/Home/HomePage/HomePage";
import AdminPanel from "@/pages/AdminPanel/AdminPanel";
import CreateNews from "@/pages/AdminPanel/CreateNews/CreateNews";
import ArticlesPage from "@/pages/Articles/ArticlesPage";
import NewsArticleDetail from "./news/NewsArticleDetail";
import LoginPage from "@/pages/AuthPage/LogInPage";
import SignUpPage from "@/pages/AuthPage/SignUpPage";
import Profile from "@/pages/UserProfile/Profile";
import { auth } from "@/utils/constants/firebase.constants";
import UsersControl from "@/pages/AdminPanel/UsersControl/UsersControl";
import Header from "../header/Header";
import { setUser } from "@/store/user/userSlice";
import { useAppDispatch } from "@/store/store";


function Router() {
  const dispatch = useAppDispatch()

  onAuthStateChanged(auth, (user) => {
    user && dispatch(setUser())
  })

  return (
    <BrowserRouter>
      <Header />
      <main className="flex">
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/admin" element={<AdminPanel />}>
            <Route path='createNews' element={<CreateNews />}/>
            <Route path='usersControl'element={<UsersControl />}/>
          </Route>
    
          <Route path="/articles" element={<ArticlesPage />}/>
          <Route path="/articles/:id" element={<NewsArticleDetail />} />

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
