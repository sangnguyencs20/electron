import { Button } from "@mui/material";

const TableRow = () => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id="checkbox-table-search-1"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="checkbox-table-search-1" className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        Draft 1
      </th>
      <td className="px-6 py-4">Author 1</td>
      <td className="px-6 py-4">29/05/2002</td>
      <td className="px-6 py-4">Draft</td>
      <td className="px-6 py-4 flex flex-row gap-[10px] text-center">
        {/* <a
                  href="#"
                  className="font-medium  dark:text-blue-500 hover:underline"
                >
                  Detail
                </a> */}
        <Button
          variant="contained"
          className="text-white font-bold bg-[#1877f2] border-2 border-[#1877f2] hover:text-[#1877f2] hover:bg-white"
        >
          Detail
        </Button>

        <Button
          variant="contained"
          className="text-white font-bold bg-red-500 border-2 border-[#1877f2] hover:text-red-500 hover:bg-white"
        >
          Delete
        </Button>
        <Button
          variant="contained"
          className="text-white font-bold bg-orange-500 border-2 border-[#1877f2] hover:text-orange-500 hover:bg-white"
        >
          Submit
        </Button>
      </td>
    </tr>
  );
};

export default TableRow;
