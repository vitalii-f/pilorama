import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DatabaseService } from '@/services/database.service';
import { TextField } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import SendIcon from '@mui/icons-material/Send';

interface RowData {
  id: number,
  author: string,
  text: string,
  status: string,
  created_at: string,
  closed_at: string | null,
  comment_text: string | undefined,
}

function Row(props: { row: RowData }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const queryClient = useQueryClient()

  const handleCloseReport = async (id: number) => {
    await DatabaseService.closeReport(id)
    queryClient.invalidateQueries({queryKey: ['reports']})
  } 

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{width: '50px'}}>
          {row.id}
        </TableCell>
        <TableCell align="right">{row.author}</TableCell>
        <TableCell align="right">{row.text}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">{new Date(row.created_at).toLocaleDateString()}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Комментарий:
              </Typography>
              <Table size="small" aria-label="report control">
                <TableBody>
                  <TableRow >
                    <TableCell>
                      {row.comment_text}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Typography variant="h6" gutterBottom component="div">
                Ответ:
              </Typography>
              <Table size="small" aria-label="report control">
                <TableBody>
                  <TableRow >
                    <TableCell>
                      <TextField sx={{width: '100%'}} />
                    </TableCell>
                    <TableCell sx={{width: '150px'}} align='center'>
                    <IconButton title='Send answer'>
                        <SendIcon />
                      </IconButton>
                      <IconButton disabled={!!row.closed_at} title='Close report' onClick={() => handleCloseReport(row.id)}>
                        <DoneIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Report() {
  const { data: rows, isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: async () => {
      // const reports = await DatabaseService.getReports(page * rowsPerPage, page * rowsPerPage + rowsPerPage - 1)
      const reports = await DatabaseService.getReports(0, 4)

      const response: RowData[] = reports.map((report) => {
        return {
          id: report.id,
          author: report.profiles!.email,
          status: report.status,
          text: report.text,
          created_at: report.created_at,
          comment_text: report.comments?.text,
          closed_at: report.closed_at
        }
      })
      return response
    }
  })

  if (isLoading) return <h1> LOADING </h1>
  if (!rows) return <h1> No reports </h1>

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ID</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">Text</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Created at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}