import { useAppSelector } from '@/Hooks/apphooks';
import { Customer, CustomerOption } from '@/interfaces/Customer';
import { getAllCustomerByIdService } from '@/services/customer.service';
import { RootState } from '@/store';
import React,{useEffect, useState} from 'react'
import Select from 'react-select'

export default function AddCustomToOrder() {
    const listCustomer = useAppSelector((state: RootState) => state.customer.listAllCustomer)
    const [toggleBtn, setToggleBtn] = useState("old")
    const [selected, setSelected] = useState<CustomerOption|null>(null);
    const [options, setOptions] = useState<CustomerOption[]>([]);
    const [currentCustomer, setCurrentCustomer] = useState<Customer>();
    
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
    const handleChange = (selectedOption:any) => {
        setSelected(selectedOption);
        console.log(`Option selected:`, selectedOption);
      };
    useEffect(()=>{
        const uploadData =async () => {
            if(selected){
                const id = selected.value
                listCustomer.forEach(customer=>{
                    if(customer.id == id){
                        console.log(customer)
                        setCurrentCustomer(customer)
                    }
                })
            }
        }
        uploadData()
    },[selected])
    const converNumphone=(phone:String)=>{
        if(!phone || phone == "" || phone.length == 0) return "**********"
        return phone.substring(0,4).concat("xxx").concat(phone.substring(7))
    }
    return (
        <div>
            <h5>Khách Hàng</h5>
            <form>
                <div className="form-row" >
                    <div className="form-group col-md-6" style={{width:"250px"}}>
                        <Select className="form-control"  onChange={handleChange}  options={options} />
                    </div>
                    <div className="form-group">
                        <div className="btn-group btn-group-toggle" style={{padding:"10px"}} data-toggle="buttons">
                            <button style={{padding:"2px"}}>Create Customer</button>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-8">
                        <label htmlFor="inputPhone">Phone</label>
                        <input type="text" className="form-control" disabled id="inputPhone" placeholder={converNumphone(currentCustomer? currentCustomer.phoneNumber:"")}/>
                    </div>
                </div>
            </form>
        </div>

    )
}
