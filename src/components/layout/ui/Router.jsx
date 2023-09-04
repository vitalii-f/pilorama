import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../../../pages/Home/HomePage/HomePage";
import AdminPanel from "../../../pages/AdminPanel/AdminPanel";
import ArticlesPage from "../../../pages/Articles/ArticlesPage";
import CreateNews from "../../../pages/AdminPanel/CreateNews/CreateNews";
import UsersControl from "../../../pages/AdminPanel/UsersControl/UsersControl";
import Header from "../header/Header";

function Router() {
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
          
    
          <Route element={<ArticlesPage />} path="/articles"/>
    
          <Route element={<div>Not Found</div>} path="*"/>
          
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default Router;
