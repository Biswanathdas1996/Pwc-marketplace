// material
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from "@mui/material";
import ProductTableBodyUI from "./ProductTableBodyUI";

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "category", label: "Category", alignRight: false },
  { id: "price", label: "Price", alignRight: false },
  { id: "owner", label: "Owner", alignRight: false },
  { id: "Type", label: "Type", alignRight: false },
];

export default function UserTable(props) {
  const { tokens } = props;

  return (
    <>
      <Card className="user-table-container" style={{ marginTop: 10 }}>
        <TableContainer className="user-table-container">
          <Table>
            <TableHead style={{ background: "#d93954" }}>
              <TableRow>
                {TABLE_HEAD.map((headCell) => (
                  <TableCell
                    sx={{ fontWeight: "bold", color: "white" }}
                    key={headCell.id}
                    align="center"
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tokens?.map((tokens) => {
                return <ProductTableBodyUI tokens={tokens} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}
