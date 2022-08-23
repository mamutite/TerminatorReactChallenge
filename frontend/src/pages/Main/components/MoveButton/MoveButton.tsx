import { CustomButton } from "../../../../components/CustomButton";
import { MetadataObjectI } from "../../../../modules/metadataObject-interface";
import { removeHuman, addHuman } from "../../../../stores/reducers/humanSlice";
import {
  addTerminator,
  removeTerminator,
} from "../../../../stores/reducers/terminatorSlice";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../utils/hooks/storeHooks";
import "./MoveButton.scss";

// Button component that handles the move of one image to the other group
export function MoveButton() {
  const humans = useAppSelector((state) => state.humans);
  const terminators = useAppSelector((state) => state.terminators);
  const dispatch = useAppDispatch();
  const combinedGroups = [humans, terminators];

  // On click function on the move button that switches the groups of
  // the selected elements
  function moveButtonClicked(value: string): void {
    combinedGroups
      .map((group: MetadataObjectI[]) =>
        group.filter((el: MetadataObjectI) => el.isClicked)
      )
      .flat()
      .forEach((item: MetadataObjectI) => {
        if (item.group === "human") {
          dispatch(removeHuman(item.id));
          dispatch(
            addTerminator({
              ...item,
              isClicked: !item.isClicked,
              group: "terminator",
            })
          );
        } else {
          dispatch(removeTerminator(item.id));
          dispatch(
            addHuman({
              ...item,
              isClicked: !item.isClicked,
              group: "human",
            })
          );
        }
      });
  }
  return (
    <div className="move-button__container">
      <CustomButton
        value="Move Items"
        onClick={moveButtonClicked}
      ></CustomButton>
    </div>
  );
}
