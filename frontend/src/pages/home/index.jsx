import { useState, useEffect } from "react";
import DisplayDrafts from "../../components/DisplayDrafts";
import CustomSugar from "../../components/CustomSugar";

// import { useStateContext } from '../context'

const Home = () => {
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [drafts, seDrafts] = useState([]);

  //   const { address, contract, getCampaigns } = useStateContext();

  //   const fetchCampaigns = async () => {
  //     setIsLoading(true);
  //     const data = await getCampaigns();
  //     setCampaigns(data);
  //     setIsLoading(false);
  //   }

  //   useEffect(() => {
  //     if(contract) fetchCampaigns();
  //   }, [address, contract]);

  return (
    <div>
      {<CustomSugar customLoading={false} />}
      <DisplayDrafts />
    </div>
  );
};

export default Home;
