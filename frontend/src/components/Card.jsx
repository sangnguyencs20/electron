import { tagType, thirdweb } from "../assets";
import { daysLeft } from "../utils";

const Card = (
  {
    // owner,
    // title,
    // description,
    // target,
    // deadline,
    // amountCollected,
    // image,
    // handleClick,
  }
) => {
  const remainingDays = daysLeft("29/05/2002");

  return (
    <div
      className="bg-white sm:w-[288px] w-full  cursor-pointer group relative rounded-xl border border-slate-50 dark:border-slate-800 shadow-md"
      // onClick={handleClick}
    >
      <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]"></div>
      <div className="relative overflow-hidden rounded-xl p-6">
        <img
          src={
            "https://th.bing.com/th/id/OIP.tLqp2Sz48JqTYOZBnZpvwgHaEK?pid=ImgDet&rs=1"
          }
          alt="fund"
          className="w-full h-[158px] object-cover rounded-xl"
        />

        <div className="flex flex-col p-4">
          <div className="flex flex-row items-center mb-[18px]">
            <img
              src={
                "https://th.bing.com/th/id/R.8e2c571ff125b3531705198a15d3103c?rik=gzhbzBpXBa%2bxMA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-big-image-png-2240.png&ehk=VeWsrun%2fvDy5QDv2Z6Xm8XnIMXyeaz2fhR3AgxlvxAc%3d&risl=&pid=ImgRaw&r=0"
              }
              alt="tag"
              className="w-[17px] h-[17px] object-contain"
            />
            <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">
              Education
            </p>
          </div>

          <div className="block">
            <h3 className="font-epilogue font-semibold text-[16px] text-[#808191] text-left leading-[26px] truncate">
              {"title"}
            </h3>
            <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
              {"description"}
            </p>
          </div>

          <div className="flex justify-between flex-wrap mt-[15px] gap-2">
            <div className="flex flex-col">
              <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
                {"amountCollected"}
              </h4>
              <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
                Raised of {"target"}
              </p>
            </div>
            <div className="flex flex-col">
              <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
                {remainingDays}
              </h4>
              <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
                Days Left
              </p>
            </div>
          </div>

          <div className="flex items-center mt-[20px] gap-[12px]">
            <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
              <img
                src={thirdweb}
                alt="user"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
            <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
              by <span className="text-[#b2b3bd]">{"owner"}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
