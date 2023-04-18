import { useAppDispatch, useAppSelector } from '@/Hooks/apphooks'
import React , {useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCateById } from './CateSlice'

export default function EditCate() {
    const cateinfor = useAppSelector(state=>state.cate.editCate)
    console.log(cateinfor)
    const {id} = useParams()
    const [des,setDes] = useState(cateinfor? cateinfor.description:"")
    const dispatch = useAppDispatch()
    useEffect(() => {
        if(cateinfor!=null)
        {
            setDes(cateinfor.description)
        }  
    }, [cateinfor])
    useEffect(() => {
        const getData =async () => {
            await dispatch(getCateById(id))
        }
        getData()
    }, [])
    const navigate = useNavigate()
    return (
        <div className='editcate-view'>
            <div className='row d-fles justify-content-between' >
                <button className='btn btn-primary' onClick={()=>{navigate(-1)}} > Back</button>
                <h2 className='' style={{marginRight:50}} >Edit Cate</h2>   
                <h2 className=''  ></h2>
            </div>
             
            <form>
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
                </div>
                <button type="submit" className="btn btn-success">Update</button>
            </form>
        </div>
    )
}
