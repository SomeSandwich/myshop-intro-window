import { Genre } from "@/interfaces/Genre";
import { Category } from "@/interfaces/category";
import { RootState } from "@/store";
import React, { useState,useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useDispatch, useSelector } from 'react-redux'


const Example = () => {
    const cateList = useSelector((state:RootState)=>state.cate) 
    const [selected, setSelected] = useState([]);
    const [options, setOptions] = useState<Genre[]>([]);
    useEffect(() => {
        const changeOption = ()=>{
            const newoptions : Genre[]= [];
            cateList.map(cate=>{
                newoptions.push({ label: cate.Description, value: cate.Description })
            })
            setOptions(newoptions)
        }
        changeOption();
    }, [cateList])
    
    return (
        <div className="filter-genre" style={{ width: "150px" }} >
            {/* <pre>{JSON.stringify(selected)}</pre> */}
            <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy="Select Genre"
            />
        </div>
    );
};

export default Example;
