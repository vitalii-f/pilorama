import { useQuery } from "@tanstack/react-query"
import { FirestoreService } from "src/services/firestore.service"
import { DataGrid } from '@mui/x-data-grid'
import { ThemeProvider } from "styled-components";
import { theme } from "src/utils/constants/theme";

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'login', headerName: 'Login', width: 130 },
  { field: 'email', headerName: 'E-Mail', width: 200 },
  { field: 'role', headerName: 'Roles', width: 150 },
];

function UsersControl() {

  const { data, isLoading, error } = useQuery(['get Users'], () =>
    FirestoreService.getUsers()
  )
  // console.log(data)
  if (isLoading) return <h2> Loading... </h2>
  if (error) return <h2> Error </h2>

  return (
      <div className="">
        Пользователи
        <ThemeProvider theme={theme}>
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              '& .MuiTouchRipple-root, & .MuiInputBase-root, & .MuiSvgIcon-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                color: theme.palette.primary.main,
              },
            }}
          />
        </ThemeProvider>
      </div>
    )
  }

export default UsersControl