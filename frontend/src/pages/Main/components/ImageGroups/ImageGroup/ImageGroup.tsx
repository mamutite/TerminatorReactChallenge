import { ImageList } from "@mui/material";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import { MetadataObjectI } from "../../../../../modules/metadataObject-interface";
import { ImageGroupItem } from "./ImageGroupItem/ImageGroupItem";

import "./ImageGroup.scss";

// Image Group Props that accept the value which the list of elements in
// the group and the index of the group
interface ImageGroupProps {
  value: MetadataObjectI[];
  index: number;
  groupName: string;
}

// Component that shows the elements of each group
export function ImageGroup(props: ImageGroupProps) {
  return (
    <ImageList
      style={{
        width: "15vw",
        height: "70vh",
        background: "linear-gradient(180deg, #8b4744, #e8746f)",
        borderRadius: "1rem",
        boxShadow: "0 8px 24px 0 rgba(228, 228, 228, 0.5)",
      }}
      cols={1}
    >
      <Droppable key={props.index} droppableId={`${props.index}`}>
        {(provided: DroppableProvided) => (
          <div
            className="image-group__container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="group-header__container">{props.groupName}</div>
            {props.value.map((item, index) => (
              <ImageGroupItem key={index} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </ImageList>
  );
}
