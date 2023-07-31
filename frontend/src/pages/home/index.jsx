import { useState, useEffect } from "react";
import DisplayDrafts from "../../components/DisplayDrafts";
import CustomSugar from "../../components/CustomSugar";
import { axiosGetAllDocument, axiosPublishedDocument } from "../../api";
import { Pagination } from "@nextui-org/react";

const Home = () => {
  const [documents, setDocuments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    axiosPublishedDocument(page)
      .then((res) => {
        setDocuments(res.data.allDocuments);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page]);
  return (
    <div>
      {<CustomSugar customLoading={false} />}
      <DisplayDrafts documents={documents} />
      <div className="flex w-full justify-end mt-12 md:mt-36">
        <Pagination
          total={totalPages}
          siblings={1}
          initialPage={1}
          controls
          onChange={(page) => {
            console.log(page);
            setPage(page);
          }}
        />
      </div>
    </div>
  );
};

export default Home;
