import CateLineFilter from "@/features/Categories/CateLineFilter";
import BookList from "@/features/posts/BookList";
import { changePageBookFilter, filterBookbyCate, filterCurrentBook, getAllBookThunk, refreshBook, releaseRefreshBook, removeBook, searchBookThunk, updateBook } from "@/features/posts/BookSlice";
import { addBook } from "@/features/posts/BookSlice";
import { RootState } from "@/store";
import React, { useEffect,FormEvent,useState } from "react";
import MultiSelect from "@/components/ReactNPM/MultitySelect";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllCategoryThunk } from "@/features/Categories/CateSlice";
import { useAppDispatch, useAppSelector } from "@/Hooks/apphooks";
import useLocalStore from "@/Hooks/useLocalStore";
import RangePrice from "@/components/ReactNPM/RangePrice";
import { ToastContainer } from "react-toastify";
import { Notification, notification } from "@/components/Book/AddBook";

export default function Home() {
    const bookListPaging = useAppSelector((state: RootState) => state.book.listPaging);
    const bookListSearch = useAppSelector((state: RootState) => state.book.listSearch);
    const catelist = useSelector((state: RootState) => state.cate.listCate);
    const maxPage = useSelector((state: RootState) => state.book.maxPage);
    const curentPage = useSelector((state: RootState) => state.book.pageCurrent);
    const total = useSelector((state: RootState) => state.book.total);
    const sizeOfCurrentPage = useSelector((state: RootState) => state.book.sizeOfCurrentPage);
    const cateLoading =  useSelector((state: RootState) => state.cate.isLoading);
    const numberPaging = useAppSelector((state: RootState) => state.book.numberPaging);
    const genreList = useAppSelector((state: RootState) => state.book.currentGenre);
    const currentPriceMax = useAppSelector((state: RootState) => state.book.currentPriceMax);
    const currentPriceMin = useAppSelector((state: RootState) => state.book.currentPriceMin);
    const [searchKey, setSearchKey] = useLocalStore({key:"search",initialValue: ""});
    
    const [numberOfPaging,setNumberOfPaging] = useLocalStore({key:"numberPaging",initialValue: "8"});

    const dispatch = useAppDispatch()
    useEffect(()=>{
        const getData = async ()=>{
            await dispatch(getAllCategoryThunk())
            await dispatch(getAllBookThunk())
            dispatch(refreshBook(""))
           
        }
        getData();
    },[])
    useEffect(()=>{
        setNumberOfPaging(numberPaging)
    },[numberPaging])
    useEffect(()=>{
        const updatepaging =async () => {
            await dispatch(changePageBookFilter({page:curentPage,limit:numberOfPaging}))
        }
        updatepaging();
    },[curentPage])
    useEffect(()=>{
        const updatepaging =async () => {
            await dispatch(changePageBookFilter({page:curentPage,limit:numberOfPaging}))
        }
        updatepaging();
    },[numberOfPaging])
    useEffect(()=>{
        const updateSearch = async ()=>{
            await dispatch(filterCurrentBook({genrelist:genreList,minPrice:currentPriceMin,maxPrice:currentPriceMax}))
            await dispatch(changePageBookFilter({page:1,limit:numberPaging}))
        }
        updateSearch();
    },[bookListSearch])
    const navigate = useNavigate();
    const moveNextPage = async ()=>{
        if((curentPage<maxPage)){
            const nextPage = parseInt(curentPage.toString())+1
            await dispatch(changePageBookFilter({page:nextPage,limit:numberOfPaging}))
        }
    }
    const movePrePage = async()=>{
        if( parseInt(curentPage.toString())> 1){
            const prePage = parseInt(curentPage.toString())-1
            await dispatch(changePageBookFilter({page:prePage,limit:numberOfPaging}))
        }
        
    }
    const handelDeleteBook = (bookId: Number) => {
        dispatch(removeBook(bookId));   
    };
    const handleSearch = async (e:FormEvent<HTMLElement>)=>{
        e.preventDefault()
        if(searchKey!="")
        {
            await dispatch(searchBookThunk(searchKey))
        }
    }
    const handleRefresh = async (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        notification("Refresh Successfully",Notification.Success)
        await dispatch(refreshBook(""))
        // await dispatch(getAllCategoryThunk())
        await dispatch(getAllBookThunk())
        setSearchKey("")
    }
    return (
        <div className="home-view">
            <ToastContainer />
            <div className="row d-flex justify-content-between align-items-center">
                <button
                    onClick={handleRefresh}
                    className="btn btn-outline-success my-2 my-sm-0"
                >
                    Refresh
                </button>
                <form className="form-inline" onSubmit={(e)=>handleSearch(e)}>
                    <input
                        required
                        className="form-control mr-lg-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={searchKey}
                        onChange={(e)=>{setSearchKey(e.currentTarget.value)}}
                    />
                    <button
                        className="btn btn-outline-success my-2 my-sm-0"
                        type="submit"
                    >
                        Search
                    </button>
                </form>
                <div className="rol d-flex justify-content-start align-items-center">
                    <span className="ml-2"><strong>Filter Price:</strong></span>
                    <RangePrice />
                </div>
            </div>
            <div className="row">
                {
                    cateLoading ?
                        <button className="buttonload">
                            <i className="fa fa-refresh fa-spin"></i>Loading
                        </button> : <MultiSelect />
                }
                
                {/* <button style={{width: "150px"}}
                    className="ml-4 btn btn-success"
                    onClick={()=>{
                        navigate('/categories/view')
                    }}>
                    <span style={{color:"white"}}>Manage Genre</span>
                </button> */}
                <div className="col d-flex align-items-center">
                Max Number Book of Page:
                <input className="text-center" style={{backgroundColor:"gray" , width: "50px"}} min={0} type="number" value={numberOfPaging} onChange={(e)=>{
                    setNumberOfPaging(+e.currentTarget.value)
                }}></input>
            </div>
            </div>
            
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
            
        </div>
    );
}
