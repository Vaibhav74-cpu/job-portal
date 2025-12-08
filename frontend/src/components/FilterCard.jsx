// import { Label } from "@radix-ui/react-label";
// import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";

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
  return (
    <div className="w-full">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-2" />
      <RadioGroup>
        {FilterData.map((data, index) => (
          <div>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, index) => {
              return (
                <div
                  key={item}
                  className="flex items-center my-0 space-x-2 text-xs mt-1"
                >
                  <RadioGroupItem value={item}  />
                  <Label>{item}</Label>
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
