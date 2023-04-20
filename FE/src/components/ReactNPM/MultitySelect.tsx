import { useAppDispatch, useAppSelector } from "@/Hooks/apphooks";
import useLocalStore from "@/Hooks/useLocalStore";
import { arraysEqual, getAllCategoryThunk } from "@/features/Categories/CateSlice";
import { changePageBookFilter, filterBookbyCate, filterBookbyGenre, filterCurrentBook, releaseRefreshBook } from "@/features/posts/BookSlice";
import { Genre } from "@/interfaces/Genre";
import { Category } from "@/interfaces/category";
import { getAllCate } from "@/services/categories.service";
import { RootState } from "@/store";
import React, { useState, useEffect, useMemo } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useDispatch, useSelector } from 'react-redux'


const MultiSelectCategory = () => {
    const cateList = useAppSelector((state: RootState) => state.cate.listCate)
    const refresh = useAppSelector((state: RootState) => state.book.isRefresh);
    const currentPrice = useAppSelector((state: RootState) => state.book.currentPrice);
    const [storeSelected, setStoreSelected] = useLocalStore({ key: "genreSelect", initialValue: "[]" });
    const [selected, setSelected] = useState(JSON.parse(storeSelected));
    const [options, setOptions] = useState<Genre[]>([]);
    
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(refresh){
            setSelected(JSON.parse("[]"))
            dispatch(releaseRefreshBook(""))
        }
    }, [refresh])
    useEffect(() => {
        console.log("catelist multy")
        const changeOption = () => {
            const newoptions: Genre[] = [];
            cateList.map(cate => {
                newoptions.push({ label: cate.description, value: cate.description })
            })
            setOptions(newoptions)
        }
        changeOption();
    }, [cateList])
    useEffect(() => {
        console.log("change")
        const filterGenre = async () => {
            setStoreSelected(JSON.stringify(selected))
            if (selected.length > 0) {
                await dispatch(filterCurrentBook({genrelist:selected,price:currentPrice}))
                await dispatch(changePageBookFilter(1))

            } else {
                await dispatch(filterBookbyCate(cateList))
                await dispatch(changePageBookFilter(1))
            }
        }
        filterGenre();
    }, [selected])
    useEffect(() => {
        console.log("reset")
        const filterGenreRefresh = async () => {
            if (selected.length > 0) {
                setStoreSelected(JSON.stringify(selected))
                await dispatch(filterCurrentBook({genrelist:selected,price:currentPrice}))
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
