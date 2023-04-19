import { useAppDispatch } from "@/Hooks/apphooks";
import { getAllCategoryThunk } from "@/features/Categories/CateSlice";
import { filterBookbyCate, filterBookbyGenre } from "@/features/posts/BookSlice";
import { Genre } from "@/interfaces/Genre";
import { Category } from "@/interfaces/category";
import { getAllCate } from "@/services/categories.service";
import { RootState } from "@/store";
import React, { useState,useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useDispatch, useSelector } from 'react-redux'


const MultiSelectCategory = () => {
    const cateList = useSelector((state:RootState)=>state.cate.listCate) 
    const [selected, setSelected] = useState([]);
    const [options, setOptions] = useState<Genre[]>([]);
    const dispatch = useAppDispatch()
    useEffect(() => {
        const changeOption = ()=>{
            const newoptions : Genre[]= [];
            cateList.map(cate=>{
                newoptions.push({ label: cate.description, value: cate.description })
            })
            setOptions(newoptions)
        }
        changeOption();
    }, [cateList])
    useEffect(() => {
        const getData = async () => {
          if (selected.length>0) {
            console.log(selected)
            await dispatch(filterBookbyGenre(selected))
          }else{
            await dispatch(filterBookbyCate(cateList))
          }
        }
        getData();
      }, [selected])
    return (
        <div className="filter-genre" style={{ width: "150px" }} >
            <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy="Select Genre"
            />
        </div>
    );
};

export default MultiSelectCategory;
