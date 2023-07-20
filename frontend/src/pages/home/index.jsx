import { useState, useEffect } from "react";
import DisplayDrafts from "../../components/DisplayDrafts";
import CustomSugar from "../../components/CustomSugar";
import { axiosGetAllDocument } from "../../api";

const Home = () => {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    axiosGetAllDocument()
      .then((res) => {
        setDocuments(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div>
      {<CustomSugar customLoading={false} />}
      <DisplayDrafts documents={documents} />
    </div>
  );
};

export default Home;
