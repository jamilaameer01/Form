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
  const [selectedBranch, setSelectedBranch] = useState([]);
  const [multiChecked, setMultiChecked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://testapi.easefix.com/api/v1/en/admin/areas?page=${page}&limit=${limit}`
        );
        const areas = response.data.areaWithBranches;

        setData(areas);

        const selectOptions = areas.map((area) => ({
          label: area.name,
          value: area._id,
        }));

        setOptions(selectOptions);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBranches = async () => {
      if (!selectedArea) return;

      try {
        const response = await axios.get(
          `https://testapi.easefix.com/api/v1/en/admin/area/${selectedArea.value}`
        );

        const branches = response.data.data.assignedBranches;

        if (Array.isArray(branches)) {
          const branchOptions = branches.map((branch) => ({
            label: branch.name,
            value: branch._id,
          }));

          setBranchOptions(branchOptions);
        } else {
          setBranchOptions([]);
        }
      } catch (err) {
        setError(err);
      }
    };

    fetchBranches();
  }, [selectedArea]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleAreaChange = (selectedOption) => {
    setSelectedArea(selectedOption);
    setBranchOptions([]);
    setSelectedBranch([]); 
  };

  const handleBranchChange = (selectedOption) => {
    setSelectedBranch(selectedOption);
  };

  const submitHandle = (e) => {
    e.preventDefault();
    console.log("Form submitted:", {
      area: selectedArea,
      branches: selectedBranch,
    });
  };

  return (
    <div>
      <h1 className="text-2xl mb-10">Fetched Data</h1>

      <div className="max-w-lg mx-auto bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-8 rounded-lg shadow-lg">
        <form onSubmit={submitHandle}>
          <div className="flex flex-col gap-y-6">
            <div>
              <label className="block text-md text-sm font-medium text-gray-700 mb-5">
                Select Area
              </label>
              <Select
                isClearable
                isSearchable
                options={options}
                onChange={handleAreaChange}
                className="text-sm"
              />
            </div>

            <label className="flex text-sm items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                name="multiSelect"
                checked={multiChecked}
                onChange={(e) => setMultiChecked(e.target.checked)}
                className="h-4 w-4 text-sm rounded border-gray-300 text-purple-500 focus:ring-purple-500"
              />
              Select multiple Branches
            </label>

            {selectedArea && (
              <div>
                <label className="block text-md text-sm font-medium text-gray-700 mb-5">
                  Select Branch
                </label>
                <Select
                  isClearable
                  isSearchable
                  isMulti={multiChecked}
                  options={branchOptions}
                  value={selectedBranch}
                  onChange={handleBranchChange}
                  placeholder="Select a branch"
                  className="mt-2 text-gray-700 text-sm"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full text-sm py-3 mt-6 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormApi;
