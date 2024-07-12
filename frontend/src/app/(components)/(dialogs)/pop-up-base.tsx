import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface PopUpProps {
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    onAgree: () => void;
}

const BasePopUp: React.FC<PopUpProps> = (props): JSX.Element => {
  return (
    <>
      <Dialog
        open={props.isOpen}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{fontSize:"4vh", fontWeight: "bold"}}>
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{fontSize:"3.2vh", textAlign:"center"}} >
          {props.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{display: "flex", flexDirection:"row", justifyContent: "space-evenly", width: "75%"}}>
          <Button onClick={props.onAgree} style={{fontSize:"3vh"}} >Ok</Button>
          <Button onClick={props.onClose} style={{fontSize:"3vh"}} >Return</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default BasePopUp;
// consider if Button need customisation. If


