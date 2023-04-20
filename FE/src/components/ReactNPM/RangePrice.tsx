import React, { useState,useEffect } from 'react'
import { Range, getTrackBackground } from "react-range";
import RangeSlider from 'react-bootstrap-range-slider';
import { useAppDispatch, useAppSelector } from '@/Hooks/apphooks';
import { RootState } from '@/store';
import { changePageBookFilter, filterCurrentBook, filterCurrentBookbyPrice, releaseRefreshBook } from '@/features/posts/BookSlice';
export default function RangePrice() {
    const [maxVlue,setMaxValue] =  useState(100000)
    const [currentPrice,setCurrentPrice] =  useState(100000)
    const refresh = useAppSelector((state: RootState) => state.book.isRefresh);
    const genreList = useAppSelector((state: RootState) => state.book.currentGenre);
    const dispatch = useAppDispatch()
    useEffect(() => {
        setCurrentPrice(maxVlue)
    }, [maxVlue])
    useEffect(() => {
        const filterPrice = async () => {
            await dispatch(filterCurrentBook({genrelist:genreList,price:currentPrice}))
            await dispatch(changePageBookFilter(1))
        }
        filterPrice()
    }, [currentPrice])
    useEffect(() => {
        if(refresh){
            setCurrentPrice(maxVlue)
            dispatch(releaseRefreshBook(""))
            dispatch(filterCurrentBook({genrelist:genreList,price:maxVlue}))
        }
    }, [refresh])
    return (
        <>
            <RangeSlider
                style={{width:"100%"}}
                className='mt-3 ml-1 d-flex align-items-center'
                value={currentPrice}
                max={maxVlue}
                onChange={changeEvent => setCurrentPrice(parseInt(changeEvent.target.value))}
            />
            <input type='number' style={{width:"25%",backgroundColor:"gray"}} className='ml-2' value={maxVlue} onChange={(e)=>{
                setMaxValue(parseInt(e.currentTarget.value))
            }}></input>
        </>
    )
}
