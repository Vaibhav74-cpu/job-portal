import React from "react";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchText } from "@/redux/jobSlice";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

const category = [
  "Fullstack developer",
  "Frontend developer",
  "Backend developer",
  "Python fullstack developer",
  "Flutter developer",
];
function CategoryCarousel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchHandler = (text) => {
    dispatch(setSearchText(text));
    navigate("/browse");
  };
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent className="-ml-2 md:-ml-4">
          {category.map((cat, index) => (
            <CarouselItem
              key={cat}
              className="md:basis-1/2  lg:basis-1/3  flex justify-center"
            >
              <Button
                onClick={()=>searchHandler(cat)}
                className="rounded-full"
                variant="outline"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
