import { useAppDispatch, useAppSelector } from "@/Hooks/apphooks";
import useLocalStore from "@/Hooks/useLocalStore";
import { arraysEqual, getAllCategoryThunk } from "@/features/Categories/CateSlice";
import { changePageBookFilter, filterBookbyCate, filterCurrentBook, releaseRefreshBook } from "@/features/posts/BookSlice";
import { Genre } from "@/interfaces/Genre";
import { Category } from "@/interfaces/category";
import { getAllCate } from "@/services/categories.service";
import { RootState } from "@/store";
import React, { useState, useEffect, useMemo } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useDispatch, useSelector } from 'react-redux'
import { Notification, notification } from "../Book/AddBook";


const MultiSelectCategory = () => {
    const cateList = useAppSelector((state: RootState) => state.cate.listCate)
    const refresh = useAppSelector((state: RootState) => state.book.isRefresh);
    const numberPaging = useAppSelector((state: RootState) => state.book.numberPaging);
    const currentPriceMax = useAppSelector((state: RootState) => state.book.currentPriceMax);
    const currentPriceMin = useAppSelector((state: RootState) => state.book.currentPriceMin);
    const [emptylist, setemptylist] = useState([]);
    // const [storeSelected, setStoreSelected] = useLocalStore({ key: "genreSelect", initialValue: JSON.stringify(emptylist)});
    const [selected, setSelected] = useState([]);
    // const [selectedClone, setselectedClone] = useState([]);
    const [options, setOptions] = useState<Genre[]>([]);
    
    const dispatch = useAppDispatch()
    // console.log("storeSelected "+ JSON.stringify(storeSelected))
    // console.log("storeSelected "+ storeSelected)
    console.log("Seleted "+ selected)
    console.log("Seleted "+ JSON.stringify(selected))
    // console.log("Seleted "+ selectedClone)
    useEffect(() => {
        if(refresh){
            setSelected([])
            dispatch(releaseRefreshBook(""))
        }
    }, [refresh])
    useEffect(() => {
        console.log("catelist multy")
        const changeOption = async () => {
            const newoptions: Genre[] = [];
            cateList.map(cate => {
                newoptions.push({ label: cate.description, value: cate.description })
            })
            setOptions(newoptions)
            // setSelected(storeSelected)
        }
        changeOption();
    }, [cateList])
    useEffect(() => {
        console.log("change")
        
        const filterGenre = async () => {
            // setStoreSelected(selected)
            await dispatch(filterCurrentBook({genrelist:selected,minPrice:currentPriceMin,maxPrice:currentPriceMax}))
            await dispatch(changePageBookFilter({page:1,limit:numberPaging}))
            if(selected.length>0){
                notification("Filter Successfully",Notification.Success)
            }
        }
        filterGenre();
    }, [selected])
    useEffect(() => {
        console.log("reset")
        
        const filterGenreRefresh = async () => {
            if (selected.length > 0) {
                // setStoreSelected(JSON.stringify(selected))
                await dispatch(filterCurrentBook({genrelist:selected,minPrice:0,maxPrice:100000}))
            }
        }
        filterGenreRefresh();
    }, [])
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
