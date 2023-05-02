import { RootState } from '@/store'
import React, { BaseSyntheticEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import "./styles/cateCard.scss"
export default function CateLineFilter() {
    const [listGenre,setlistGenre] = useState<string[]>([]);
    const [isClickCheckBox,setisClickCheckBox] = useState<boolean>(false);
    const cateList = useSelector((state:RootState)=>state.cate.listCate) 
    const dispatch = useDispatch()
    const handleClickCheckBox = (genre:string) => {
        if(listGenre.some(type=>type==genre))
        {
            setlistGenre(pre=>{
                pre = pre.filter(type=> type !== genre)
                return pre
            });
        }
        else{
            setlistGenre(pre=>{
                pre.push(genre)
                pre = pre.filter(function(item, pos) {
                    return pre.indexOf(item) == pos;
                })
                return pre
            });
        }
    }
    return (
        <div>
            <div id="listcheckboxgenre" className={isClickCheckBox?"dropdown-check-list visible":"dropdown-check-list"} tabIndex={100}>
                <span className="anchor" onClick={(e)=>{
                    setisClickCheckBox(pre=>!pre)
                }}>Select Genre</span>
                <ul className="items">
                    {cateList.map((cate,index)=>{
                            return(
                                <li><input onClick={(e)=>{
                                    handleClickCheckBox(cate.description)
                                }}  value={cate.description} type="checkbox" />
                                    <span>
                                        {cate.description} 
                                    </span>
                                </li>
                            )
                        })}
                </ul>
            </div>
        </div>
    )
}
