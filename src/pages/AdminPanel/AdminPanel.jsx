import { Outlet } from "react-router-dom";
import AdminNavBar from "../../components/layout/navigation/NavBar/AdminNavBar";

function AdminPanel() {
  return (
    <>
      <AdminNavBar />
      <section className="w-full min-h-screen p-2 border-2 border-gray-200 border-solid">
        <h1>Меню администратора</h1>
    
        <Outlet />
      </section>
    </>
  );
}

export default AdminPanel;
