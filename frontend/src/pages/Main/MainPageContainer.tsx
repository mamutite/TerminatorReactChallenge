import { useEffect, useState } from "react";
import { store } from "../../stores/store";
import { SlideShowContainer } from "../IntroSlideShow";
import { Dashboard } from "./components";
import { updateTerminators } from "../../stores/reducers/terminatorSlice";
import { useAppDispatch } from "../../utils/hooks/storeHooks";
import { MetadataObjectI } from "../../modules/metadataObject-interface";
import { updateHumans } from "../../stores/reducers/humanSlice";

import "./MainPageContainer.scss";
import { Provider } from "react-redux";

/*
  Main Page Propbs that accept if the slideshow should be shown
*/
interface MainPagePropsI {
  showSlideShow: boolean;
}

/*
  Main Container that controls when to show the slideshow or the dashboard
*/
export function MainPageContainer(props: MainPagePropsI) {
  const [showSlideShow, setShowSlideShow] = useState(props.showSlideShow);
  const dispatch = useAppDispatch();

  // Effect that loads the images metadata on component loading
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/load_img_data")
      .then((res) => res.json())
      .then(
        (result) => {
          const imgData: MetadataObjectI[] = Object.values(result.imgData);

          dispatch(
            updateHumans(
              imgData.filter((data: MetadataObjectI) => data.group === "human")
            )
          );

          dispatch(
            updateTerminators(
              imgData.filter(
                (data: MetadataObjectI) => data.group === "terminator"
              )
            )
          );
        },
        (error) => {
          console.log("Error " + error);
        }
      );
  }, []);

  /*
    Effect that add keyboard event listener that closes the slideshow
    on Escape
  */
  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleSlideShowClose();
        document.removeEventListener("keydown", keyDownHandler);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  // Closes Slideshow
  function handleSlideShowClose() {
    setShowSlideShow(!showSlideShow);
  }

  return (
    <div className="main__container">
      {showSlideShow ? (
        <SlideShowContainer closeSlideShow={handleSlideShowClose} />
      ) : (
        <Provider store={store}>
          <Dashboard />
        </Provider>
      )}
    </div>
  );
}
