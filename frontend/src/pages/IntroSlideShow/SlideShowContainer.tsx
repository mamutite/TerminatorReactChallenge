import React, { useEffect } from "react";
import { CustomButton } from "../../components/CustomButton";
import { Introduction, Welcome } from "./components";

import "./SlideShowContainer.scss";

interface SlideShowPropsI {
  closeSlideShow: () => void;
}

/*
  Container that shows the different slideshow slides and the 
  two control buttons for closing the slideshow and going to the
  next slide
*/
export function SlideShowContainer(props: SlideShowPropsI) {
  const [componentIndex, setComponentIndex] = React.useState(0);

  // Returns the slide that needs to be shown
  function getSlideShowComponent(): JSX.Element | undefined {
    if (componentIndex === 0) return <Welcome />;
    else if (componentIndex === 1) return <Introduction />;
    else props.closeSlideShow();
  }

  // Effect that add keyboard event listener that goes to the next slide
  // on Enter
  useEffect(() => {
    const keyDownHandler = (event: any) => {
      if (event.key === "Enter") {
        event.preventDefault();
        setComponentIndex(componentIndex + 1);
        document.removeEventListener("keydown", keyDownHandler);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [componentIndex]);

  // On click funtion that listens for the escape button and the next one
  function handleButtonClick(value: string) {
    switch (value) {
      case "Escape":
        props.closeSlideShow();
        break;

      case "Next":
        setComponentIndex(componentIndex + 1);
        break;
    }
  }

  return (
    <div className="slideshow__container">
      <div className="escape-header__container">
        <CustomButton value="Escape" onClick={handleButtonClick} />
        <div className="button-description-text">Press Escape To Close</div>
      </div>

      <div className="slideshow-component__container">
        {getSlideShowComponent()}
      </div>

      <div className="next-footer__container">
        <div className="next__container">
          <CustomButton value="Next" onClick={handleButtonClick} />
          <div className="button-description-text">Press Enter To Continue</div>
        </div>
      </div>
    </div>
  );
}
