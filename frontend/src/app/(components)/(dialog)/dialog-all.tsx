import { NavigateDialog, ClearDialog } from "./dialog-type";

interface SectionDialogProps {
  actionItems: [string, string];
  state: [boolean, boolean];
  onClose: () => void;
  onAgree: [(() => void), (() => void)]; // can define fixed number?
}

export const SectionDialog: React.FC<SectionDialogProps> = (
  props
): JSX.Element => {
  return (
    <>
      {props.state[0] && (
        <ClearDialog
          isOpen={props.state[0]}
          onClose={props.onClose}
          onAgree={props.onAgree[0]}
          needInput={true}
        ></ClearDialog>
      )}

      {props.state[1] && (
        <NavigateDialog
          actionItems={props.actionItems}
          isOpen={props.state[1]}
          onClose={props.onClose}
          onAgree={props.onAgree[1]}
        />
      )}
    </>
  );
};
