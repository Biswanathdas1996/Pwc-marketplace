import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";

import { _transction } from "../../CONTRACT-ABI-ERC20/connect";
import TransctionModal from "../../components/shared/TransctionModal";
import { convertFromToken } from "../../utils";
export default function SendCoinModal({
  sendCoinModalBool,
  usersData,
  handleModalClose,
  addressId,
  getDetails,
}) {
  const [start, setStart] = React.useState(false);
  const [price, setPrice] = React.useState(null);
  const [response, setResponse] = React.useState(null);

  const modalClose = () => {
    setStart(false);
    setResponse(null);
  };

  const onSendCoin = async () => {
    setStart(true);
    handleModalClose();
    const responseData = await _transction(
      "transfer",
      addressId,
      convertFromToken(price).toString()
    );
    getDetails();
    setResponse(responseData);
  };

  return (
    <>
      {start && <TransctionModal response={response} modalClose={modalClose} />}
      <Modal
        open={sendCoinModalBool}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="send-coin-modal-container">
          <Stack direction="row" sx={{ backgroundColor: "#d93954" }}>
            <Box sx={{ minWidth: 240, flexGrow: 1 }}>
              <Typography
                sx={{ color: "white", textAlign: "center" }}
                variant="h6"
              >
                Send Coin
              </Typography>
            </Box>
            <CloseIcon
              onClick={handleModalClose}
              className="modal-close-icon"
              style={{ color: "white" }}
            />
          </Stack>
          <div className="modal-body">
            <Stack
              direction="row"
              alignItems="left"
              sx={{ backgroundColor: "#FDEBD0" }}
            >
              <Box sx={{ minWidth: 140, flexGrow: 1 }}>
                <Typography sx={{ color: "text.secondary", pl: 1 }}>
                  Name:
                </Typography>
              </Box>
              <Typography
                variant="subtitle2"
                sx={{ color: "text.secondary", pr: 1 }}
              >
                {usersData?.name}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="left"
              sx={{ backgroundColor: "#F8F9F9" }}
            >
              <Box sx={{ minWidth: 240, flexGrow: 1 }}>
                <Typography sx={{ color: "text.secondary", pl: 1 }}>
                  GUID:
                </Typography>
              </Box>
              <Typography
                variant="subtitle2"
                sx={{ pr: 4, color: "text.secondary" }}
              >
                {usersData?.guid}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="left"
              sx={{ backgroundColor: "#FDEBD0" }}
            >
              <Box sx={{ minWidth: 240, flexGrow: 1 }}>
                <Typography sx={{ color: "text.secondary", pl: 1 }}>
                  Employee ID:
                </Typography>
              </Box>
              <Typography
                variant="subtitle2"
                sx={{ pr: 3, flexShrink: 5, color: "text.secondary" }}
              >
                {usersData?.employeeID}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="left"
              sx={{ backgroundColor: "#F8F9F9" }}
            >
              <Box sx={{ minWidth: 240, flexGrow: 1 }}>
                <Typography sx={{ color: "text.secondary", pl: 1 }}>
                  Address:
                </Typography>
              </Box>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "text.secondary",
                  width: "5rem",
                  whiteSpace: "no-wrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {addressId}
              </Typography>
            </Stack>
            <Box
              sx={{
                maxWidth: "100%",
              }}
              style={{ margin: 10 }}
            >
              <TextField
                fullWidth
                label="Amount"
                id="fullWidth"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Box>

            <Box textAlign="center">
              <Button
                variant="contained"
                size="small"
                style={{ float: "right", borderRadius: 4, margin: 10 }}
                sx={{
                  marginRight: "0px",
                  textTransform: "none",
                }}
                onClick={() => onSendCoin()}
              >
                Send
              </Button>
            </Box>
          </div>
        </Box>
      </Modal>
    </>
  );
}
