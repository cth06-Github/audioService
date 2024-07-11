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

const PopUp: React.FC<PopUpProps> = (props): JSX.Element => {
  return (
    <>
      <Dialog
        open={props.isOpen}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{fontSize:"4vh", fontWeight: "bold"}}>
          Clear Transcript?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{fontSize:"3.2vh", textAlign:"center"}} >
            Existing Transcribed Text will be cleared before proceeding to record.
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{display: "flex", flexDirection:"row", justifyContent: "space-evenly", width: "75%"}}>
          <Button onClick={props.onAgree} style={{fontSize:"3vh"}} >Ok</Button>
          <Button onClick={props.onClose} style={{fontSize:"3vh"}} >Back</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default PopUp;
// consider if Button need customisation. If


