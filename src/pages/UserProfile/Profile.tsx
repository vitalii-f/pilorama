import LoadingSpinner from "@/components/layout/ui/loading/LoadingSpinner";
import UserDataChange from "@/components/layout/ui/profile/UserDataChange";
import { DatabaseService } from "@/services/database.service";
import { RootState } from "@/store/store";
import { AlertProps } from "@/utils/interfaces/interfaces";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { StyledAvatar, StyledButton, StyledProfile, StyledSection, StyledWrapper } from "./Profile.styled";
import { showAlert } from "@/utils/alert/ShowAlert";

//TODO Оформить/стилизовать страницу профиля

const Profile = () => {
  const userData = useSelector((state: RootState) => state.userSlice)
  const [alert, setAlert] = useState<AlertProps | null>(null)
  const [modal, setModal] = useState<boolean | undefined>(false)
  const { data: userAvatar, error } = useQuery<string | null>({
    queryKey: ['avatar'],
    queryFn: async () => {
      return await DatabaseService.getUserAvatar()
    },
    refetchOnWindowFocus: false,
  })

  if (error) return showAlert('error', error.message, setAlert)
  if (userData.status === 'loading') return <LoadingSpinner />
  if (userData.status === 'loaded' && userData.user === null) return <h1>Please, log in to your account.</h1>
  if (userData.status === 'reject') return <h1> Error </h1>

  const changeModal = (): void => {
    setModal(!modal)
  }

  const creationDate = userData.user && userData.user.created_at && new Date(userData.user.created_at).toLocaleDateString()
  
  return (
    userData.user && (
      <StyledSection id='profile'>
        <StyledWrapper>
          {userAvatar && <StyledAvatar src={userAvatar} alt="avatar" />}
          <StyledProfile>
            <p>Имя пользователя: {userData.login}</p>
            <p>E-mail: {userData.user.new_email || userData.user.email}</p>
            <p>Дата регистрации: {creationDate}</p>
            
            <StyledButton onClick={() => changeModal()}>Изменить данные профиля</StyledButton>
          </StyledProfile>
          {modal && <UserDataChange user={userData.user} setModal={setModal} setAlert={setAlert}/>}
        </StyledWrapper>
        
        {alert && showAlert(alert.type, alert.message, setAlert)}

      </StyledSection>
    )
  );
};

export default Profile;