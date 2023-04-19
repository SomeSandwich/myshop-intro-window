import { useAppDispatch, useAppSelector } from '@/Hooks/apphooks'
import React , {useState,useEffect, FormEvent} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AddCateThunk, UpdateCateThunk, getCateById } from './CateSlice'
import { ExistCate } from './EditCate'

export default function AddCate() {
    const listCate = useAppSelector(state=>state.cate.listCate)
    console.log(listCate)
    const desRef = React.useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch()
    const [duplicate,setDuplicate] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e:FormEvent<HTMLElement>)=>{
        e.preventDefault()
        if(desRef.current &&!duplicate){
            await dispatch(AddCateThunk(desRef.current.value))
        }
    }
    return (
        <div className='editcate-view'>
            <div className='row d-fles justify-content-between' >
                <button className='btn btn-primary' onClick={()=>{navigate(-1)}} > Back</button>
                <h2 className='' style={{marginRight:50}} >Add New Category</h2>   
                <h2 className=''  ></h2>
            </div>
             
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <div className="form-group">
                    <label htmlFor="DescriptionInput">Description:</label>
                    <input 
                        ref={desRef}
                        onChange={(e)=>{
                            setDuplicate(ExistCate(listCate,e.currentTarget.value))
                        }}
                        type="text" 
                        className="form-control" 
                        id="DescriptionInput" 
                        placeholder="Fantasy"
                        />
                    {duplicate? 
                        <small id="checkDescription" style={{color:"red"}} className="form-text text-muted">This description is existed</small>
                        :""    
                    }
                </div>
                <button type="submit" className="btn btn-success" disabled = {duplicate}>Add</button>
            </form>
        </div>
    )
}
