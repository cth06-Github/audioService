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
    buttonAgreeName: string;
    buttonDisagreeName: string;
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
        <DialogTitle id="alert-dialog-title" style={{fontWeight: "bold"}} sx={{fontSize: { xs: 19, sm: 21, md: 23, lg: 25 } }}>
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{textAlign:"center"}} sx={{fontSize: { xs: 14, sm: 16, md: 18, lg: 20 } }}>
          {props.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{display: "flex", flexDirection:"row", justifyContent: "space-evenly", width: "75%"}}>
          <Button onClick={props.onAgree} sx={{fontSize: { xs: 12, sm: 14, md: 16, lg: 18 } }} >{props.buttonAgreeName}</Button>
          <Button onClick={props.onClose} sx={{fontSize: { xs: 12, sm: 14, md: 16, lg: 18 } }}  >{props.buttonDisagreeName}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default BasePopUp;
// consider if Button need customisation. If


