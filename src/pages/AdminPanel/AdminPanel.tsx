import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AdminNavBar from "@/components/layout/navigation/NavBar/AdminNavBar";
import { IUserState } from "@/utils/interfaces/user.interfaces";
import ErrorPage from "../ErrorPage/ErrorPage";
import styled from "styled-components";

const StyledDivWrapper = styled.div`
  display: flex;
  
  width: 100%;
`

const StyledSection = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: 10px 5px;
`

function AdminPanel() {
  const user = useSelector((state: IUserState) => state.user.value)
  const [haveAccess, setHaveAccess] = useState(false)
  useEffect(() =>{
    if (user && user.userRoles) setHaveAccess(user?.userRoles.includes('admin'))
  }, [user])
  
  if (!haveAccess) return <ErrorPage errorCode={'403 - отказано в доступе'} />
  return (
    <StyledDivWrapper>
      <AdminNavBar />
      <StyledSection>
        <Outlet />
      </StyledSection>
    </StyledDivWrapper>
  );
}

export default AdminPanel;
