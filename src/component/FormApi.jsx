import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";

const FormApi = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null); 
  const [options, setOptions] = useState([]); // Area options
  const [branchOptions, setBranchOptions] = useState([]); 
   const [selectedAreaId, setSelectedAreaId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://testapi.easefix.com/api/v1/en/admin/areas?page=${page}&limit=${limit}`
        );
        const areas = response.data.areaWithBranches;

        setData(areas);
        console.log("data>>>>>>>>>>>>>>>>", areas);

        const selectOptions = areas.map((area) => ({
          label: area.name,
          value: area._id,
        }));

        setOptions(selectOptions);
        console.log("Select options:", selectOptions);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleAreaChange = (selectedOption) => {
    setSelectedArea(selectedOption); 

   
    if (selectedOption) {
      const branches = [
        { label: "Branch 1", value: "branch1" }, 
        { label: "Branch 2", value: "branch2" },
      ];
      setBranchOptions(branches);
    } else {
      setBranchOptions([]); 
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-10">Fetched Data</h1>

      <div className="max-w-lg mx-auto bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-8 rounded-lg shadow-lg">
        <div className="flex flex-col gap-y-6">
          <div>
            <label className="block text-md text-sm font-medium text-gray-700 mb-5">
              Select Area
            </label>
            <Select
              options={options}
              onChange={handleAreaChange} 
              className="text-sm"
            />
          </div>

      
          {selectedArea && (
            <div>
              <label className="block text-md text-sm font-medium text-gray-700 mb-5">
                Select Branch
              </label>
              <Select
                options={branchOptions} 
                placeholder="Select a branch"
                className="mt-2 text-gray-700 text-sm"
                required
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormApi;
