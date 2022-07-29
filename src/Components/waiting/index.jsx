import { CircularProgress } from "@material-ui/core";
import WaitingCSS from "./Waiting.module.css";
import Backdrop from '@mui/material/Backdrop';
// This reusable component is meant to be used while the user is waiting for an async operation
const Waiting = ({ size, thickness, ...restProps }) => {

  return (
    <Backdrop
    sx={{ color: '#fff', zIndex: 999 }}
    open={true}
    >
    <CircularProgress color="inherit" />
  </Backdrop>
  );
};

export default Waiting;
