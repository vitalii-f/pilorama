import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminNavBar from "@/components/layout/navigation/NavBar/AdminNavBar";
import { IUserState } from "@/utils/interfaces/user.interfaces";
import ErrorPage from "../ErrorPage/ErrorPage";
import styled from "styled-components";
import LoadingSpinner from "@/components/layout/ui/loading/LoadingSpinner";

const StyledDivWrapper = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`

const StyledSection = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: 10px 5px;
`

function AdminPanel() {
  const user = useSelector((state: IUserState) => state.user.value)

  if (user === undefined) return <LoadingSpinner />
  if (!user || !user.userRoles || !user.userRoles.includes('admin')) return <ErrorPage errorCode={'403 - отказано в доступе'} />

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
