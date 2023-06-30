import React from "react";

const NotFound = () => {
  return (
    <div className="h-screen w-screen relative flex justify-center items-center flex-col bg-404">
      {/* <img src={AGD} alt="" style={{ height: 80 }} /> */}
      <h1 className="text-green-600 font-bold mt-5">
        Oh no, something went wrong!
      </h1>
      <h4 className="text-404">
        Sorry, but our site is under maintenance right now.
      </h4>
      <h4 className="text-404">
        We are doing our best and we will be back soon!
      </h4>
      <div className="mt-5">
        {/* <Button color="success" size="lg" className="font-weight-bold">
      BACK TO HOME
    </Button> */}
      </div>
    </div>
  );
};

export default NotFound;
