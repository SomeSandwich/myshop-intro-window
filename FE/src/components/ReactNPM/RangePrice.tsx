import React, { useState, useEffect } from 'react'
import { Range, getTrackBackground } from "react-range";
import RangeSlider from 'react-bootstrap-range-slider';
import { useAppDispatch, useAppSelector } from '@/Hooks/apphooks';
import { RootState } from '@/store';
import { RefreshPrice, changePageBookFilter, filterCurrentBook, filterCurrentBookWithMinMax, releaseRefreshBook } from '@/features/posts/BookSlice';
import MultiRangeSlider from './MultiRange';
export default function RangePrice() {
    const [maxVlue, setMaxValue] = useState(100000)
    const [currentPriceMin, setCurrentPriceMin] = useState(0)
    const [currentPriceMax, setCurrentPriceMax] = useState(100000)
    const numberPaging = useAppSelector((state: RootState) => state.book.numberPaging);
    const refresh = useAppSelector((state: RootState) => state.book.isRefresh);
    const genreList = useAppSelector((state: RootState) => state.book.currentGenre);
    const dispatch = useAppDispatch()
    console.log(genreList)
    useEffect(() => {
        setCurrentPriceMax(maxVlue)
    }, [maxVlue])
    useEffect(() => {
        const filterPrice = async () => {

            await dispatch(filterCurrentBookWithMinMax({ genrelist: genreList, minPrice: currentPriceMin,maxPrice: currentPriceMax }))
            await dispatch(changePageBookFilter({page:1,limit:numberPaging}))

        }
        filterPrice()
    }, [currentPriceMax,currentPriceMin])
    // useEffect(() => {
    //     if (refresh) {
    //         setCurrentPrice(maxVlue)
    //         dispatch(releaseRefreshBook(""))
    //         dispatch(RefreshPrice(""))
    //         dispatch(filterCurrentBook({ genrelist: genreList, price: maxVlue }))
    //     }
    // }, [refresh])
    return (
        <>
            <div style={{ width: "50%" }}>
                <MultiRangeSlider
                    min={0}
                    max={maxVlue}
                    onChange={({ min, max }: { min: number; max: number }) =>{
                        setCurrentPriceMax(max)
                        setCurrentPriceMin(min)
                        console.log(`min = ${min}, max = ${max}`)
                    }}
                />
            </div>
            {/* <RangeSlider
                style={{ width: "100%" }}
                className='mt-3 ml-1 d-flex align-items-center'
                value={currentPrice}
                max={maxVlue}
                onChange={changeEvent => setCurrentPrice(parseInt(changeEvent.target.value))}
            /> */}
            <input type='number'  style={{ width: "20%", backgroundColor: "gray" }} className='ml-2 text-center' value={maxVlue} onChange={(e) => {
                setMaxValue(parseInt(e.currentTarget.value))
            }}></input>
        </>
    )
}
