import cat_1 from "../assets/cat_1.jpg"
import cat_2 from "../assets/cat_2.jpg";
import cat_3 from "../assets/cat_3.jpg";
import cat_4 from "../assets/cat_4.jpg";
import cat_5 from "../assets/cat_5.jpg";


export const filterByCategory = [
  { id: "Faishon", label: "Faishon" },
  { id: "Mobile", label: "Mobile" },
  { id: "Laptop", label: "Laptop" },
  { id: "Headphones", label: "Headphones" },
];

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const categeris = [
     {
          img: cat_1,
          category: ""
     },
     {
          img: cat_2,
          category: "Faishon"
     },
     {
          img: cat_3,
          category: "Mobile"
     },
     {
          img: cat_4,
          category: "Headphone"
     },
     {
          img: cat_5,
          category: "Laptop"
     },
]