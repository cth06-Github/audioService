import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface PopUpProps {
    isOpen: boolean;
    onClose: () => void;
    onAgree: () => void;
    onDisagree: () => void;
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
        <DialogTitle id="alert-dialog-title">
          Clear Transcript?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Existing Transcribed Text will be cleared before proceeding to record.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onAgree}>Ok</Button>
          <Button onClick={props.onDisagree} autoFocus>
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default PopUp;
