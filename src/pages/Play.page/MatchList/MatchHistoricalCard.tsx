import Button from "../../../components/Form/Button";
import { MatchState } from "../../../types/match.types";

interface Props {
  match: MatchState;
  onClick: (key: string) => void;
}

const MatchHistoricalCard = ({ match, onClick }: Props) => {
  return (
    <div className="match-card">
      <div className="head">
        <p>time limit: {match.time_limit} seconds</p>
        <p>user limit: {match.user_limit}</p>
      </div>
      <p>
        {match.text.length > 100
          ? match.text.slice(0, 100) + "..."
          : match.text}
      </p>
      {/* if we want to show the text generation type, instead of the text */}
      {/* <p>
        {match.request ? "text generation type: " + match.request.type : ""}
      </p> */}
      <div className="match-card-bottom">
        <p>{new Date(match.date).toString().slice(4, 25)}</p>
        <Button onClick={() => onClick(match._id)}>View</Button>
      </div>
    </div>
  );
};

export default MatchHistoricalCard;
