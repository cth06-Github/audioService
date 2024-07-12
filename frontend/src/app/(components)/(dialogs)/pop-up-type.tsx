import BasePopUp from "./pop-up-base";

interface NavigatePopUpProps {
  actionItems: string[]; // is objects better because got names? is 2 valid in here?
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
}
export const NavigatePopUp: React.FC<NavigatePopUpProps>  = (props): JSX.Element => {
    return (
      <BasePopUp
          title="Leave this page?"
          description= {`${props.actionItems[0]} will be stopped and any ${props.actionItems[1]} will be cleared. To continue ${props.actionItems[0].toLowerCase()}, you must stay on this page.`}
          isOpen={props.isOpen}
          onClose={props.onClose}
          onAgree={props.onAgree}
      >
      </BasePopUp>
    );
}

interface ClearPopUpProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
}
export const ClearPopUp: React.FC<ClearPopUpProps>  = (props): JSX.Element => {
  return (
    <BasePopUp
        title="Clear & Continue?"
        description= {`Existing transcribed text will be cleared.`}
        isOpen={props.isOpen}
        onClose={props.onClose}
        onAgree={props.onAgree}
    >
    </BasePopUp>
  );
}

//"Existing Transcribed Text will be cleared before proceeding to record."