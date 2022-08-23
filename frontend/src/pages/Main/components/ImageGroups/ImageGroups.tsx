import {
  useAppDispatch,
  useAppSelector,
} from "../../../../utils/hooks/storeHooks";
import { ImageGroup } from "./ImageGroup/ImageGroup";
import {
  DragDropContext,
  DraggableLocation,
  DropResult,
} from "react-beautiful-dnd";

import "./ImageGroups.scss";
import { updateHumans } from "../../../../stores/reducers/humanSlice";
import { MetadataObjectI } from "../../../../modules/metadataObject-interface";
import { updateTerminators } from "../../../../stores/reducers/terminatorSlice";

// Component that shows for each group and container that shows the groups
// data. Also handles the moving and reordering of elements in the groups
export function ImageGroups() {
  const humans = useAppSelector((state) => state.humans);
  const terminators = useAppSelector((state) => state.terminators);
  const dispatch = useAppDispatch();
  const combinedGroups = [humans, terminators];

  // Function that handles the movement of elements from one group to
  // another
  function move(
    source: MetadataObjectI[],
    destination: MetadataObjectI[],
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation
  ) {
    const sourceClone = [...source];
    const destClone = [...destination];
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, {
      ...removed,
      group: removed.group === "human" ? "terminator" : "human",
    });

    const result: MetadataObjectI[][] = [];
    result[Number(droppableSource.droppableId)] = sourceClone;
    result[Number(droppableDestination.droppableId)] = destClone;

    return result;
  }

  // Function that handles the reordering of the elements in the group
  function reorder(
    list: MetadataObjectI[],
    startIndex: number,
    endIndex: number
  ) {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  // Function that handles the two cases when dragging an element.
  // First, moving the element in the same group. Second, moving the
  // element to the other group
  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(
        combinedGroups[sInd],
        source.index,
        destination.index
      );
      const newState = [...combinedGroups];
      newState[sInd] = items;

      dispatch(updateHumans(newState[0]));
      dispatch(updateTerminators(newState[1]));
    } else {
      const result = move(
        combinedGroups[sInd],
        combinedGroups[dInd],
        source,
        destination
      );
      const newState = [...combinedGroups];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      dispatch(updateHumans(newState[0]));
      dispatch(updateTerminators(newState[1]));
    }
  }

  return (
    <div className="image-groups__container">
      <DragDropContext onDragEnd={onDragEnd}>
        {combinedGroups.map((el, ind) => (
          <ImageGroup
            key={ind}
            value={el}
            index={ind}
            groupName={ind ? "terminators" : "humans"}
          />
        ))}
      </DragDropContext>
    </div>
  );
}
