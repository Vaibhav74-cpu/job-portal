// import { Label } from "@radix-ui/react-label";
// import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { setSearchText } from "@/redux/jobSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const FilterData = [
  {
    filterType: "Location",
    array: ["Mumbai", "Bangalore", "Hyderabad", "Pune", "Chennai"],
  },
  {
    filterType: "Industry",
    array: [
      "Software Development",
      "Healthcare",
      "Finance",
      "Education",
      "Marketing",
    ],
  },
  {
    filterType: "Salary",
    array: [
      "0 - 3 LPA",
      "3 - 6 LPA",
      "6 - 10 LPA",
      "10 - 15 LPA",
      "15 - 20 LPA",
    ],
  },
];
function FilterCard() {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");
  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    dispatch(setSearchText(selectedValue));
    // console.log(selectedValue);
  }, [selectedValue]);
  return (
    <div className="w-full">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-2" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {FilterData.map((data, index) => (
          <div>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index - idx}`;
              return (
                <div
                  key={item}
                  className="flex items-center my-0 space-x-2 text-xs mt-1"
                >
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default FilterCard;
