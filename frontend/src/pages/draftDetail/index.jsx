import { Button } from "@mui/material";
import Comment from "../../components/Comment";

const DraftDetail = () => {
  return (
    <div className="flex flex-col">
      <Button className="self-end w-10 bg-blue-400 hover:bg-blue-500 hover:translate-y-[-1px] ease-out duration-300 text-white px-10 shadow-md">
        Back
      </Button>
      <div className="w-full flex gap-4 bg-white py-10 rounded-lg mt-10 border">
        <div className="ml-8 px-4 py-1 border-2 border-zinc-100 rounded-x">
          <p className="text-3xl font-semibold mb-23 leading-loose">
            Draft Information
          </p>
          <p className="text-xl capitalize font-semibold mb-8 text-slate-400">
            Title:
          </p>
          <p className="text-xl capitalize font-semibold mb-8 text-slate-400">
            Author:{" "}
          </p>
          <p className="pt-2 text-xl capitalize font-semibold mb-8 text-slate-400">
            Date Created:
          </p>
          <p className="pt-5 text-xl capitalize font-semibold mb-8 text-slate-400">
            Status:
          </p>
        </div>
        <Button variant="contained" className="h-10 mt-5 bg-[#3b71ca] ml-">
          Download draft
        </Button>
      </div>
      <hr className="my-12 dark:border-neutral-600" />
      <div className="mt-10">
        <p className="text-white mb-6">Comment</p>
        <div className="flex flex-col gap-4">
          <p className="font-bold text-xl">Comment Section</p>
          <div className="flex flex-col gap-5">
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftDetail;
