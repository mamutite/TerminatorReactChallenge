import { ImageListItem } from "@mui/material";
import { useEffect, useState } from "react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { MetadataObjectI } from "../../../../../../modules/metadataObject-interface";
import { updateClikedOnHuman } from "../../../../../../stores/reducers/humanSlice";
import { updateClikedOnTerminator } from "../../../../../../stores/reducers/terminatorSlice";
import "./ImageGroupItem.scss";

// Image Group Item Props that accept the item which is the image metadata
// item and index of that item in the group
interface ImageGroupItemPropsI {
  item: MetadataObjectI;
  index: number;
  name?: string;
}

// Component that shows each Image item of the group
export function ImageGroupItem(props: ImageGroupItemPropsI) {
  const [imageUrl, setImageUrl] = useState<string>();
  const dispatch = useDispatch();

  // Function that loads the image of the item
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/images/${props.item.id}`).then(
      (result) => {
        setImageUrl(result.url);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [props.item]);

  // Function that handles the click on the image and selects it
  function handleImageClick() {
    if (props.item.group === "human")
      dispatch(updateClikedOnHuman({ id: props.item.id }));
    else dispatch(updateClikedOnTerminator({ id: props.item.id }));
  }

  return (
    <Draggable
      key={props.item.id}
      draggableId={props.item.id}
      index={props.index}
    >
      {(provided: DraggableProvided) => {
        return (
          <ImageListItem
            key={props.item.id}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="image-item__container">
              <img
                src={imageUrl}
                alt={props.item.title}
                loading="lazy"
                style={{
                  border: props.item.isClicked ? "5px solid white" : "none",
                }}
                onClick={handleImageClick}
              />
            </div>
          </ImageListItem>
        );
      }}
    </Draggable>
  );
}
