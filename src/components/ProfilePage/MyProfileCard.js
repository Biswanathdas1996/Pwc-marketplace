import { Box, Card, CardContent, Typography } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Facebook from "../../assets/images/fb.png";
import Twitter from "../../assets/images/twitter.png";
import Instagram from "../../assets/images/insta.png";
import Linkedin from "../../assets/images/ldin.png";
import { Tooltip } from "@mui/material";
import { Link } from "@mui/material";

const MyProfileCard = ({ user }) => {
  return (
    <Card
      sx={{
        marginTop: -12,
        marginBottom: 10,
        height: 618,
        width: 295,
      }}
    >
      <CardContent
        sx={{
          height: 80,
        }}
        className="leftHeader"
        borderColor="none"
      />
      <CardContent sx={{ transform: "translateY(-40%)" }}>
        {/* <Avatar
          alt="Remy Sharp"
          sx={{
            width: 91,
            height: 91,
            borderRadius: "50%",
          }}
          src={myprofile}
        ></Avatar> */}
      </CardContent>
      <CardContent sx={{ marginTop: -10 }}>
        <Typography marginBottom="10px" sx={{ fontSize: 22, fontWeight: 700 }}>
          {user?.name}
        </Typography>
        <Tooltip>
          <Typography
            marginBottom="25px"
            className="address"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "10rem",
            }}
          ></Typography>
        </Tooltip>
        <Typography sx={{ fontSize: 14 }} marginBottom="25px">
          Employee Id: <b>{user?.employeeID}</b>
        </Typography>
        <Typography sx={{ fontSize: 14 }} marginBottom="25px">
          An AI-driven NFT exhibition brings the innovation of arts, crafts and
          motifs it to an experiment in cultural memory.
        </Typography>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            columnGap: 8,
            marginBottom: 30,
          }}
        >
          <CalendarMonthOutlinedIcon />
          <Typography sx={{ fontSize: 14 }}>
            GUID: <b>{user?.guid}</b>
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            columnGap: 20,
            marginBottom: 45,
          }}
        >
          <Typography color="#ABB2B9">
            <strong>401</strong> Followers
          </Typography>
          <Typography color="#ABB2B9">
            <strong>212</strong> Following
          </Typography>
        </div>
        <Link href="https://facebook.com" target="_blank">
          <Box
            component="img"
            sx={{
              border: "1px solid #C4C4C4",
              borderRadius: 1,
              p: 0.3,
              height: 30,
              width: 30,
              marginRight: 3,
            }}
            alt="Facebook"
            src={Facebook}
          ></Box>
        </Link>
        <Link href="https://twitter.com/" target="_blank">
          <Box
            component="img"
            sx={{
              border: "1px solid #C4C4C4",
              borderRadius: 1,
              p: 0.3,
              height: 30,
              width: 30,
              marginRight: 3,
            }}
            alt="Twitter"
            src={Twitter}
          ></Box>
        </Link>
        <Link href="https://www.instagram.com/" target="_blank">
          <Box
            component="img"
            sx={{
              border: "1px solid #C4C4C4",
              borderRadius: 1,
              p: 0.3,
              height: 30,
              width: 30,
              marginRight: 3,
            }}
            alt="Instagram"
            src={Instagram}
          ></Box>
        </Link>
        <Link
          href="https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin"
          target="_blank"
        >
          <Box
            component="img"
            sx={{
              border: "1px solid #C4C4C4",
              borderRadius: 1,
              p: 0.3,
              height: 30,
              width: 30,
            }}
            alt="Linkedin"
            src={Linkedin}
          ></Box>
        </Link>
      </CardContent>
    </Card>
  );
};

export default MyProfileCard;
