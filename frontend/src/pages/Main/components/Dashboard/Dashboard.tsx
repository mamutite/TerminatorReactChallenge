import { CompletionStatus } from "../CompletionStatus/CompletionStatus";
import { ImageGroups } from "../ImageGroups/ImageGroups";
import { MoveButton } from "../MoveButton/MoveButton";
import "./Dashboard.scss";

// Dashboard component that shows the different elements on that page
export function Dashboard() {
  return (
    <div className="dashboard__container">
      <div className="dashboard-header__container">
        <CompletionStatus />

        {/* <div className="player-lives">Player Lives</div> */}
      </div>

      <div className="dashboard-main-content__container">
        <div className="dashboard-heading-text">Save the world, Tenyksian!</div>
        <MoveButton />
        <ImageGroups />
      </div>
    </div>
  );
}
