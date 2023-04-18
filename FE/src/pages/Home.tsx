import CateLineFilter from "@/features/Categories/CateLineFilter";
import BookList from "@/features/posts/BookList";
import { removeBook, updateBook } from "@/features/posts/BookSlice";
import { addBook } from "@/features/posts/BookSlice";
import { RootState } from "@/store";
import React, { useEffect } from "react";
import MultiSelect from "@/components/ReactNPM/MultitySelect";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllCategory } from "@/features/Categories/CateSlice";
import { useAppDispatch } from "@/Hooks/apphooks";
export default function Home() {
    const bookList = useSelector((state: RootState) => state.book.allBook);
    const cateLoading =  useSelector((state: RootState) => state.cate.isLoading);
    console.log(bookList);
    const dispatch = useAppDispatch()
    useEffect(()=>{
        const getData = async ()=>{
            await dispatch(getAllCategory())
        }
        getData();
    },[])
    const navigate = useNavigate();
    const handleAddBtnClick = () => {
        dispatch(
            addBook({
                Id: 5,
                Price: 55000,
                Discount: 5300,
                Title: "Lap Trinh Unity",
                Description: "Lap Trinh Game Thieu Nhi",
                MediaPath: "meedia",
                CreateAt: new Date(),
                UpdateAt: new Date(),
                Quantity: 15,
                Status: 1,
                CategpryId: 1,
            })
        );
    };
    const handleUpdateBtnClick = () => {
        dispatch(
            updateBook({
                Id: 4,
                Price: 55000,
                Discount: 5300,
                Title: "Sach Update",
                Description: "Lap Trinh Game Thieu Nhi",
                MediaPath: "meedia",
                CreateAt: new Date(),
                UpdateAt: new Date(),
                Quantity: 15,
                Status: 1,
                CategpryId: 1,
            })
        );
    };
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
                    booklist={bookList}
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
                <div>Hiển thị {} trong tổng số {} kết quả</div>
                <ul className="pagination justify-content-center">
                    <li className="page-item disabled">
                    <a className="page-link" href="#" tabIndex={-1} >Previous</a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                    <a className="page-link" href="#">Next</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
