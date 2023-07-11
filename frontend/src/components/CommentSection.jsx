import { Button, Card, Pagination, Text, Textarea } from "@nextui-org/react";
import CommentBox from "./CommentBox";
import CommentBox2nd from "./CommentBox2nd";
const CommentSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 ">
      <div className="max-w-5xl mx-auto px-10 ">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Discussion (20)
          </h2>
        </div>
        <div className="mb-6 flex flex-col items-center w-full">
          <Textarea
            rows="10"
            placeholder="Write a comment..."
            required
            autoComplete="on"
            // status="primary"
            borderWeight="bold"
            css={{
              width: "100%",
            }}
          ></Textarea>

          <Button
            auto
            className="my-4 py-7 bg-gradient-to-br from-cyan-500 to-blue-500 w-fit text-white rounded-2xl"
          >
            <Text b color="white">
              Post Comment
            </Text>
          </Button>
        </div>
        <CommentBox />
        <CommentBox2nd />
        <CommentBox />
      </div>
      <div className="flex justify-end p-10 mr-[-50px]">
        <Pagination total={20} initialPage={1} />;
      </div>
    </section>
  );
};

export default CommentSection;
