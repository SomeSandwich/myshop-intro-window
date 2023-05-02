import { useAppDispatch, useAppSelector } from '@/Hooks/apphooks'
import React , {useState,useEffect, FormEvent} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AddCateThunk, UpdateCateThunk, getCateById } from './CateSlice'
import AddCate from './AddCate'
import { Category } from '@/interfaces/category'
import { ToastContainer } from 'react-toastify'
export const ExistCate = (array:Category[],des:string)=>{
    const index = array.findIndex(cate=>cate.description==des)
    return index >= 0
}
export default function EditCate() {
    const cateinfor = useAppSelector(state=>state.cate.editCate)
    const catelist = useAppSelector(state=>state.cate.listCate)
    const {id} = useParams()
    if(!id) return <></>
    const [des,setDes] = useState(cateinfor? cateinfor.description:"")
    const [duplicate,setDuplicate] = useState(false)
    const dispatch = useAppDispatch()
    useEffect(() => {

        if(cateinfor!=null)
        {
            setDes(cateinfor.description)
            
        }  
    }, [cateinfor])
    useEffect(() => {
        setDuplicate(ExistCate(catelist,des))
    }, [des])
    useEffect(() => {
        const getData =async () => {
            await dispatch(getCateById(id))
        }
        getData()
    }, [])
    const navigate = useNavigate()
    
    const handleSubmit = async (e:FormEvent<HTMLElement>)=>{
        e.preventDefault()
        if(!duplicate){
            await dispatch(UpdateCateThunk({id,description:des}))
        }
    }
    return (
        <div className='editcate-view'>
            <ToastContainer/>
            <div className='row d-fles justify-content-between' >
                <button className='btn btn-primary' onClick={()=>{navigate(-1)}} > Back</button>
                <h2 className='' style={{marginRight:50}} >Edit Cate</h2>   
                <h2 className=''  ></h2>
            </div>
             
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <div className="form-group">
                    <label htmlFor="IDInput">ID Category:</label>
                    <input type="number" className="form-control" id="IDInput" placeholder={id} disabled/>
                </div>
                <div className="form-group">
                    <label htmlFor="DescriptionInput">Description:</label>
                    <input 
                        value={des} 
                        onChange={(e)=>{setDes(e.currentTarget.value)}} 
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
                <button type="submit" className="btn btn-success">Update</button>
            </form>
        </div>
    )
}
