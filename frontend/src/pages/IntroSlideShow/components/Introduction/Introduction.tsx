import "./Introduction.scss";

// Introduction slide from the slideshow with the instructions
export function Introduction() {
  return (
    <div className="introduction__container">
      <div className="introduction-header__container">
        You need to save the world from the Terminator!
      </div>

      <div className="introduction-instructions__container">
        Skynet sent an agent back in time to corrupt some of the metadata, such
        that some of the killer robots are tagged as humans, and some of the
        humans are tagged as killer robots.
        <br /> <br />
        Your task is to analyze the two groups of humans and robots and find all
        wrong tagged metadata. Your goal is to move around the images to the
        correct category and fix the mess that agent left.
        <br /> <br />
        Below you can find examples of how the humans and the robots look.
        <br /> The world depends on you!
      </div>

      <div className="introduction-example-images__container">
        <div className="human-image__container">
          Image of Friendly Human
          <img src="human_example.jpg" alt="No image found" />
        </div>
        <div className="robot-image__container">
          Image of Killer Robot
          <img src="robot_example.jpg" alt="No image found" />
        </div>
      </div>
    </div>
  );
}
