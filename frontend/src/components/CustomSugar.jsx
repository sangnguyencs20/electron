import { Sugar } from "react-preloaders";

const CustomSugar = ({ customLoading }) => {
  return (
    <div>
      <Sugar background="blur" customLoading={customLoading} />
    </div>
  );
};

export default CustomSugar;
