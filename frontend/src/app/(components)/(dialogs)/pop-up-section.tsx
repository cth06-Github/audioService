import { NavigatePopUp, ClearPopUp } from "./pop-up-type";

interface SectionPopUpProps {
  actionItems: string[];
  state: boolean[];
  onClose: () => void;
  onAgree: (() => void)[]; // can define fixed number?
}

export const SectionPopUpProps: React.FC<SectionPopUpProps> = (
  props
): JSX.Element => {
  return (
    <>
      {props.state[0] && (
        <ClearPopUp
          isOpen={props.state[0]}
          onClose={props.onClose}
          onAgree={props.onAgree[0]}
          needInput={true}
        ></ClearPopUp>
      )}

      {props.state[1] && (
        <NavigatePopUp
          actionItems={props.actionItems}
          isOpen={props.state[1]}
          onClose={props.onClose}
          onAgree={props.onAgree[1]}
        />
      )}
    </>
  );
};
