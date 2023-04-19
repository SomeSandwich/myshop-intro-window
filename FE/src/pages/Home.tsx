import CateLineFilter from "@/features/Categories/CateLineFilter";
import BookList from "@/features/posts/BookList";
import { changePageBookFilter, filterBookbyCate, getAllBookThunk, removeBook, updateBook } from "@/features/posts/BookSlice";
import { addBook } from "@/features/posts/BookSlice";
import { RootState } from "@/store";
import React, { useEffect } from "react";
import MultiSelect from "@/components/ReactNPM/MultitySelect";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllCategoryThunk } from "@/features/Categories/CateSlice";
import { useAppDispatch } from "@/Hooks/apphooks";


export default function Home() {
    const bookListPaging = useSelector((state: RootState) => state.book.listPaging);
    const maxPage = useSelector((state: RootState) => state.book.maxPage);
    const curentPage = useSelector((state: RootState) => state.book.pageCurrent);
    const total = useSelector((state: RootState) => state.book.total);
    const sizeOfCurrentPage = useSelector((state: RootState) => state.book.sizeOfCurrentPage);
    const cateLoading =  useSelector((state: RootState) => state.cate.isLoading);
    const dispatch = useAppDispatch()
    useEffect(()=>{
        const getData = async ()=>{
            await dispatch(getAllCategoryThunk())
            await dispatch(getAllBookThunk())
        }
        getData();
    },[])
   
    const navigate = useNavigate();
    const moveNextPage = async ()=>{
        if((curentPage<maxPage)){
            const nextPage = parseInt(curentPage.toString())+1
            await dispatch(changePageBookFilter(nextPage))
        }

        
    }
    const movePrePage = async()=>{
        if( parseInt(curentPage.toString())> 1){
            const prePage = parseInt(curentPage.toString())-1
            await dispatch(changePageBookFilter(prePage))
        }
        
    }
    const handelDeleteBook = (bookId: Number) => {
        dispatch(removeBook(bookId));   
    };
   
    return (
        <div className="home-view">
            <div className="row">
                <form className="form-inline">
                    <input
                        className="form-control mr-lg-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button
                        className="btn btn-outline-success my-2 my-sm-0"
                        type="submit"
                    >
                        Search
                    </button>
                </form>
            </div>
            <div className="row">
                {/* <CateLineFilter/> */}
                {
                    cateLoading ?
                        <button className="buttonload">
                            <i className="fa fa-refresh fa-spin"></i>Loading
                        </button> : <MultiSelect />
                }
                
                <button style={{width: "150px"}}
                    className="ml-4 btn btn-success"
                    onClick={()=>{
                        navigate('/categories/view')
                    }}>
                    <span style={{color:"white"}}>Manage Genre</span>
                </button>
            </div>
            <div className="row d-flex justify-content-center">
                <BookList
                    booklist={bookListPaging}
                    handleDeleteBook={handelDeleteBook}
                />
            </div>
            {/* <div className="row">
                <button onClick={() => handleAddBtnClick()}>Add</button>
                <button onClick={() => handleUpdateBtnClick()}>Update</button>
            </div> */}
            <div className="row d-flex justify-content-between"
                style={{
                    bottom: 0,
                    right: 10,
                    left:350,
                    paddingTop:"10px",
                    paddingLeft:"10px",
                    paddingRight:"10px",
                    paddingBottom:"0px",
                    alignContent:"center",
                    backgroundColor: "rgba(255, 251, 251,1)",
                    }}
                >
                <div>Hiển thị {sizeOfCurrentPage.toString()} trong tổng số {total.toString()} kết quả</div>
                <ul className="pagination justify-content-center">
                    <li className={"page-item "+(curentPage==1?"disabled":"")} onClick={movePrePage}>
                    <a className="page-link" href="#" tabIndex={-1} >Previous</a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">{curentPage.toString()}</a></li>
                    <li className={"page-item "+(curentPage<maxPage?"":"disabled")} onClick={moveNextPage}>
                        <a className="page-link" href="#" tabIndex={-1} >Next</a>
                    </li>
                </ul>
                
            </div>
        </div>
    );
}
