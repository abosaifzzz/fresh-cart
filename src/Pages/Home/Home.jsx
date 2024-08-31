import React, { useContext, useEffect, useState } from "react";
import style from "./Home.module.css";
import { CounterContext } from "../../context/CounterContext";
import RecentProducts from "../RecentProducts/RecentProducts";
import CategoriesSlider from "../../components/categoriesSlider/categoriesSlider";
import MainSlider from "../../components/MainSlider/MainSlider";
import { Helmet } from "react-helmet";
export default function Home(props) {
  const [count, setCount] = useState(0);
  useEffect(() => { }, []);
  let { counter, handleCounter } = useContext(CounterContext);
  return (
    <>
      <div className="overflow-hidden">
        <Helmet>
          <title>Home</title>
        </Helmet>
        <MainSlider />
        <CategoriesSlider />
        <RecentProducts />
      </div>
    </>
  );
}
