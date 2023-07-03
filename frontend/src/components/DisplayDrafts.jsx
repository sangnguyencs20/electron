import Card from "./Card";

const DisplayDrafts = () => {
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        Draft
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[30px]">
        {/* {isLoading && (
      <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
    )} */}

        {/* {!isLoading && campaigns.length === 0 && (
      <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
        You have not created any campigns yet
      </p>
    )} */}

        {/* {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard 
      key={campaign.id}
      {...campaign}
      handleClick={() => handleNavigate(campaign)}
    />)} */}

        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default DisplayDrafts;
