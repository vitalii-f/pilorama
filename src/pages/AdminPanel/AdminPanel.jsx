import { Outlet } from "react-router-dom";
import AdminNavBar from "../../components/layout/navigation/NavBar/AdminNavBar";
import ErrorPage from "../ErrorPage/ErrorPage";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function AdminPanel() {
  const user = useSelector((state) => state.user.value)
  const [haveAccess, setHaveAccess] = useState(false)
  useEffect(() =>{
    setHaveAccess(user?.userRoles.includes('admin'))
  }, [user])

  
  if (!haveAccess) return <ErrorPage errorCode={'403 - отказано в доступе'} />
  return (
    <>
      <AdminNavBar />
      <section className="w-full min-h-screen p-2 border-l-2 border-gray-200 border-solid">
        <h1>Меню администратора</h1>
    
        <Outlet />
      </section>
    </>
  );
}

export default AdminPanel;
