import { green } from "@material-ui/core/colors";
import {
  Alert,
  AlertColor,
  AlertTitle,
  Box,
  Dialog,
  Modal,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MetadataObjectI } from "../../../../modules/metadataObject-interface";
import { useAppSelector } from "../../../../utils/hooks/storeHooks";
import "./CompletionStatus.scss";

// Completion Status component that shows when the user has managed to
// group up the image data the correct way
export function CompletionStatus() {
  const [status, setStatus] = useState<AlertColor>();
  const humans = useAppSelector((state) => state.humans);
  const terminators = useAppSelector((state) => state.terminators);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  console.log('asdadasdasd');
  // styling of the modal when user manages to order all the images
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70vw",
    bgcolor: "#16172e",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    color: "white",
  };

  // Effect that checks each time the humans and terminators group change
  // if that is the correct grouping of the images
  useEffect(() => {
    const dataObject = [...humans, ...terminators].reduce(
      (accumulator, cur: MetadataObjectI) => {
        return { ...accumulator, [cur.id]: cur };
      },
      {}
    );

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imgMetadata: dataObject }),
    };

    fetch("http://127.0.0.1:5000/api/check_grouping", requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result["success"]);
          if (result["success"]) {
            setStatus("success");
            setOpen(true);
          } else setStatus("error");
        },
        (error) => {
          console.log("Error " + error);
        }
      );
  }, [humans, terminators]);

  return (
    <div>
      <Alert severity={status} onClick={() => setStatus("success")}>
        {status === "success" ? (
          <>
            <AlertTitle>Great job!</AlertTitle>
            Contragulations you saved the world!
          </>
        ) : (
          <>
            <AlertTitle>Continue searching for wrong metadata!</AlertTitle>
            There is still wrong tagged metadata, go and find it!
          </>
        )}
      </Alert>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h1>Congratulations you saved the world!</h1>
          <img
            src="utopia.jpg"
            style={{ width: "50vw", borderRadius: "1rem" }}
          ></img>
        </Box>
      </Modal>
    </div>
  );
}
