import { useNavigate } from "react-router-dom";
import type { Redirect } from "../../../server/types/urls";

const LinkCard = ({ redirect }: { redirect: Redirect }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        return navigate(`/links/edit/${redirect.id}`);
      }}
      className="cursor-pointer group border-2 h-full grid grid-cols-1 gap-5 min-w-fit min-h-fit w-1/8 p-10 pt-3 border-blue-900 shadow-sm shadow-blue-950/60 text-white transition-all hover:scale-110 hover:z-40 hover:backdrop-blur-lg"
    >
      <p className="text-white/80 text-shadow-sm text-lg w-fit m-auto">
        {redirect.id}
      </p>
      <p className="group-hover:text-shadow-md text-shadow-white/30 w-fit m-auto text-lg">
        {redirect.url}
      </p>
    </div>
  );
};

export default LinkCard;
