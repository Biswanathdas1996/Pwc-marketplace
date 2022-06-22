// material
import {
  Card,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TableHead,
  TextField,
} from "@mui/material";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "guid", label: "GUID", alignRight: false },
  { id: "employeeid", label: "Employee Id", alignRight: false },
  { id: "coins", label: "Coins", alignRight: false },
  { id: "button", label: "Button", alignRight: false },
];

export default function UserTable(props) {
  const { userData } = props;

  return (
    <Container>
      <Card className="user-table-container">
        <TableContainer className="user-table-container">
          <Table>
            <TableHead>
              <TextField
                label="Search User..."
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TableRow>
                {TABLE_HEAD.map((headCell) => (
                  <TableCell
                    sx={{ fontWeight: "bold" }}
                    key={headCell.id}
                    align="center"
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.map((person) => {
                const { name, guid, empid, coins } = person;

                return (
                  <TableRow hover key={empid} tabIndex={-1}>
                    <TableCell align="center">{name}</TableCell>
                    <TableCell align="center">{guid}</TableCell>
                    <TableCell align="center">{empid}</TableCell>
                    <TableCell align="center">{coins}</TableCell>
                    <TableCell align="center">
                      <Button variant="outlined" size="small">
                        Send Coins
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
}
