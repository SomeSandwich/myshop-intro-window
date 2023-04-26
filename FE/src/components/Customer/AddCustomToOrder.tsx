import { useAppDispatch, useAppSelector } from '@/Hooks/apphooks';
import { Customer, CustomerOption, InputCustomer } from '@/interfaces/Customer';
import { getAllCustomerByIdService } from '@/services/customer.service';
import { RootState } from '@/store';
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddCustomerThunk } from './CustomerSlice';
import { Notification } from '../Book/AddBook';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddCustomToOrder(props:{setCurrentCustomerId:React.Dispatch<React.SetStateAction<Number | null>>}) {
    const listCustomer = useAppSelector((state: RootState) => state.customer.listAllCustomer)
    const [toggleBtn, setToggleBtn] = useState("old")
    const [selected, setSelected] = useState<CustomerOption | null>(null);
    const [options, setOptions] = useState<CustomerOption[]>([]);
    const [currentCustomer, setCurrentCustomer] = useState<Customer>();
    const [show, setShow] = useState(false);
    const nameRef = React.useRef<HTMLInputElement>(null);
    const phoneRef = React.useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch()
    const handleClose = () => setShow(false);
    const handleAddNewCustomer =async ()=>{
        if(nameRef.current &&  phoneRef.current){
            const newCustomer: InputCustomer= {
                name: nameRef.current?.value,
                phoneNumber: phoneRef.current?.value
            }
            console.log(newCustomer)
            await dispatch(AddCustomerThunk(newCustomer))
            setShow(false);
        }
    }
    const handleShow = () => {  
        setShow(true)
    };
    useEffect(() => {
        const changeOption = async () => {
            const newoptions: CustomerOption[] = [];
            listCustomer.map(customer => {
                newoptions.push({ label: customer.name, value: customer.id })
            })
            setOptions(newoptions)
            // setSelected(storeSelected)
        }
        changeOption();
    }, [listCustomer])
    const handleChange = (selectedOption: any) => {
        setSelected(selectedOption);
        console.log(`Option selected:`, selectedOption);
    };
    useEffect(() => {
        const uploadData = async () => {
            if (selected) {
                const id = selected.value
                listCustomer.forEach(customer => {
                    if (customer.id == id) {
                        console.log(customer)
                        setCurrentCustomer(customer)
                        props.setCurrentCustomerId(customer.id)
                    }
                })
            }
        }
        uploadData()
    }, [selected])
    const converNumphone = (phone: String) => {
        if (!phone || phone == "" || phone.length == 0) return "**********"
        return phone.substring(0, 4).concat("xxx").concat(phone.substring(7))
    }
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <input ref={nameRef} type="text" className="form-control" required id="inputPhone" placeholder={"Name"} />
                    <input maxLength={10} minLength={10} ref={phoneRef} type="text" className="form-control" required id="inputPhone" placeholder={"phoneNumber"} /> */}
                    <div className="row">
                    <div className="form-group col-6">
                        <label  className="font-weight-bold">Tên Khách Hàng</label>
                        <input ref={nameRef} id="inputName" name="request_code" type="text" className="form-control" placeholder="Nhập tên khách hàng" />
                    </div>
                    <div className="form-group col-6">
                        <label className="font-weight-bold">Số điện thoại</label>
                        <input ref={phoneRef} id="inputPhone" name="material_info" type="text" className="form-control" placeholder="Nhập số điện thoại" />
                    </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddNewCustomer}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
            <h5>Khách Hàng</h5>
            <form>
                <div className="form-row" >
                    <div className="form-group col-md-6" style={{ width: "250px" }}>
                        <Select className="form-control" onChange={handleChange} options={options} />
                    </div>
                    <div className="form-group">
                        <div className="btn-group btn-group-toggle" style={{ padding: "10px" }} data-toggle="buttons">
                        <Button variant="success" onClick={handleShow}>
                            Create Customer
                        </Button>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-8">
                        <label htmlFor="inputPhone">Phone</label>
                        <input type="text" className="form-control" disabled id="inputPhone" placeholder={converNumphone(currentCustomer ? currentCustomer.phoneNumber : "")} />
                    </div>
                </div>
            </form>
        </div>

    )
}
const notification = (message: string, type: Notification) => {
    if (type == Notification.Warn) {
        toast.warn(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    } else if (type == Notification.Success) {
        toast.success(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    } else if (type == Notification.Error) {
        toast.error(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
};
