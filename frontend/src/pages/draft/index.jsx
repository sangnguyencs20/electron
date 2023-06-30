import Table from "../../components/Table";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
const Draft = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div className="w-full min-h-max flex justify-end pb-10 shadow-white">
        <Button
          className="bg-[#0ea5e9] flex justify-center items-center cursor-pointer"
          variant="contained"
          onClick={() => {
            navigate("/create");
          }}
        >
          Create new Draft
        </Button>
      </div>
      <Table />
    </div>
  );
};

export default Draft;
