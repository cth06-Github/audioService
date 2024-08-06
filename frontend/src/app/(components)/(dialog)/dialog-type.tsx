import BaseDialog from "./dialog-base";

interface NavigateDialogProps {
  actionItems: [string, string];
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
}
export const NavigateDialog: React.FC<NavigateDialogProps> = (
  props
): JSX.Element => {
  return (
    <BaseDialog
      title="Leave this page?"
      description={`${props.actionItems[0]} will be stopped and any ${
        props.actionItems[1]
      } will be cleared. To continue ${props.actionItems[0].toLowerCase()}, you must stay on this page.`}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onAgree={props.onAgree}
      buttonAgreeName="Leave"
      buttonDisagreeName="Stay"
    ></BaseDialog>
  );
};

interface ClearPopUpProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
  needInput?: boolean;
}
export const ClearDialog: React.FC<ClearPopUpProps> = (props): JSX.Element => {
  return (
    <BaseDialog
      title="Clear & Continue?"
      description="Existing transcribed text will be cleared."
      isOpen={props.isOpen}
      onClose={props.onClose}
      onAgree={props.onAgree}
      buttonAgreeName="Ok"
      buttonDisagreeName="Return"
    ></BaseDialog>
  );
};
