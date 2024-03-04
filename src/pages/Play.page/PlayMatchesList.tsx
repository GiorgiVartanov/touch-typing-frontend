import { useState } from "react";
import Button from "../../components/Form/Button";
import { MatchStateList } from "../../types/match.types";
import PlayMatchCard from "./PlayMatchesCard";

interface Props {
  matches: MatchStateList;
  onClick: (key: string) => void;
}

const PlayMatchesList = ({ matches, onClick }: Props) => {
  const [option, setOption] = useState<boolean>(false);
  return (
    <div className="match-list">
      <div className="options">
        <Button
          key={1}
          className={option === false ? "active" : ""}
          onClick={() => setOption(false)}
        >
          Active rooms
        </Button>
        <Button
          key={2}
          className={option === false ? "" : "active"}
          onClick={() => setOption(true)}
        >
          Active matches
        </Button>
      </div>
      {Object.keys(matches)
        .filter((key) => matches[key].has_started === option)
        .map((key, ind) => (
          <PlayMatchCard
            key={ind}
            match={matches[key]}
            match_key={key}
            onClick={onClick}
            option={option}
          />
        ))}
    </div>
  );
};

export default PlayMatchesList;
