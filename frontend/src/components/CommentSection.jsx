import {
  Button,
  Card,
  Loading,
  Pagination,
  Text,
  Textarea,
  useInput,
} from "@nextui-org/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import CommentBox from "./CommentBox";
import CommentBox2nd from "./CommentBox2nd";
import { useEffect, useState } from "react";
import { axiosGetComment, axiosPostComment } from "../api";
import { AnimatePresence } from "framer-motion";
import CustomRotatingSquare from "./CustomRotatingSquare";
import CustomSugar from "./CustomSugar";
import { toast } from "react-toastify";
import { encryptLinkToBytes32 } from "../utils";
import { SCcomment } from "../contract";
import LoginModal from "./LoginModal";
const CommentSection = ({ docId }) => {
  const [loading, setLoading] = useState(false);
  const [isNeed, setNeedRefresh] = useState(0);
  const handleSubmit = () => {
    const myPromise = new Promise((resolve, reject) => {
      SCcomment({
        _id: docId,
        _contentHashed: encryptLinkToBytes32(comment, "123456"),
      })
        .then((hash) => {
          setIsLoading(true);
          // console.log(hash);
          resolve(hash);
          setIsLoading(false);
          axiosPostComment({
            documentId: docId,
            content: comment,
            txHash: hash,
          })
            .then((res) => {
              setIsLoading(false);
              // console.log(res);
              setIsNeed((pre) => pre + 1);
              resolve(hash);
            })
            .catch((err) => {
              console.error(err),
                setTimeout(() => {
                  setLoading(false);
                }, 3000);
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err.message);
        });
    });
    toast.promise(
      myPromise,
      {
        pending: "Draft is being commented",
        success: {
          render({ data }) {
            return `Comment draft successfully:  ${data}`;
          },
        },
        error: {
          render({ data }) {
            return `Comment draft error:  ${data}`;
          },
        },
      },
      { position: toast.POSITION.BOTTOM_RIGHT }
    );
    // {
    //   docId && setLoading(true);
    //   docId &&
    //     axiosPostComment({
    //       content: comment,
    //       documentId: docId,
    //       txHashed:
    //         "0xbb2c813fb9b30fc8906ed4cec8bac1a4cbab46af57a75150e671b9286a4fc3d3",
    //     })
    //       .then((res) => {
    //         setIsNeed((pre) => pre + 1);
    //       })
    //       .catch((err) => {
    //         console.error(err),
    //           setTimeout(() => {
    //             setLoading(false);
    //           }, 3000);
    //       });
    // }
  };
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    {
      setIsLoading(true);
      docId !== undefined &&
        axiosGetComment(docId, page)
          .then((res) => {
            setComments(res.data.allOpinions);
            setTotalPages(res.data.totalPages);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            // console.log(err);
          });
    }
  }, [page, docId, isNeed]);
  const {
    value: comment,
    setValue: setComment,
    reset,
    bindings,
  } = useInput("");
  const [isLoading, setIsLoading] = useState(false);
  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 ">
      {<CustomSugar customLoading={false} />}
      {isLoading && <CustomRotatingSquare />}
      <div className="max-w-5xl mx-auto px-10 ">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-light-blue-600 dark:text-white">
            Discussion
          </h2>
        </div>
        <div className="mb-6 flex flex-col items-center w-full min-w-[800px]">
          <Textarea
            {...bindings}
            rows="10"
            placeholder="Write a comment..."
            required
            autoComplete="on"
            // status="primary"
            borderWeight="bold"
            css={{
              width: "100%",
            }}
            className="bg-gradient-to-br from-cyan-500 to-blue-500 p-[2px] hover:shadow-lg hover:shadow-cyan-500/50"
          ></Textarea>

          <LoginModal
            scFunction={SCcomment}
            scData={{
              _id: docId,
              _contentHashed: encryptLinkToBytes32(comment, "123456"),
            }}
            axiosFunction={axiosPostComment}
            axiosData={{
              documentId: docId,
              content: comment,
              // txHash: hash,
            }}
            setIsLoading={setIsLoading}
            setNeedRefresh={setNeedRefresh}
          >
            <Button
              auto
              className="my-4 py-7 bg-gradient-to-br from-cyan-500 to-blue-500 w-fit text-white rounded-2xl hover:shadow-lg hover:shadow-cyan-500/50"
              // onClick={() => handleSubmit()}
            >
              <Text b color="white">
                Post Comment
              </Text>
              <CheckCircleIcon
                className={`ml-1 h-5 w-6 text-white ${
                  loading ? "hidden" : "block"
                }`}
              />
              <Loading
                type="spinner"
                color="currentColor"
                size="sm"
                // css={{ mx: "$1" }}
                className={` ml-1   h-5 w-6 ${!loading ? "hidden" : "block"}`}
              />
            </Button>
          </LoginModal>
        </div>
        <AnimatePresence mode="popLayout">
          {comments.map((item) => {
            return <CommentBox item={item} />;
          })}
        </AnimatePresence>
      </div>
      <div className="flex justify-end p-10 mr-[-50px]">
        <Pagination
          initialPage={1}
          total={totalPages}
          siblings={1}
          controls
          onChange={(page) => {
            setPage(page);
          }}
        />
        ;
      </div>
    </section>
  );
};

export default CommentSection;
