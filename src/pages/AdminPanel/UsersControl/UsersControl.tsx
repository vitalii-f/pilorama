import { useQuery } from "@tanstack/react-query"
import { DataGrid } from '@mui/x-data-grid'
import { DatabaseService } from "@/services/database.service";
import { useState } from "react";
import { AlertProps } from "@/utils/interfaces/interfaces";
import { showAlert } from "@/utils/alert/ShowAlert";

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'login', headerName: 'Login', width: 130 },
  { field: 'email', headerName: 'E-Mail', width: 200 },
  { field: 'role', headerName: 'Roles', width: 150 },
];

const UsersControl = () => {
  const [_alert, setAlert] = useState<AlertProps | null>(null)
  const { data, isLoading, error } = useQuery(
    {
      queryKey: ['get Users'],
      queryFn: () => DatabaseService.getAllUsers(),
    }
  )
  if (isLoading) return <h2> Loading... </h2>
  if (error) return showAlert('error', error.message, setAlert)
  if (!data) return <h2> No users </h2>

  return (
      <div className="">
        Пользователи
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
          />
      </div>
    )
  }

export default UsersControl