import React,{useState} from 'react'
import Select from 'react-select'
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]
export default function AddCustomToOrder() {
    const [toggleBtn, setToggleBtn] = useState("old")
    return (
        <div>
            <h5>Khách Hàng</h5>
            <form>
                <div className="form-row">
                    <div className="form-group col-md-6" style={{width:"250px"}}>
                        <Select className="form-control"  options={options} />
                    </div>
                    <div className="form-group">
                        <div className="btn-group btn-group-toggle" style={{padding:"10px"}} data-toggle="buttons">
                            <button style={{padding:"2px"}}>Create Customer</button>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress">Address</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                </div>
                <div className="form-row">
                    <div className="form-group col-md-8">
                        <label htmlFor="inputPhone">Phone</label>
                        <input type="text" className="form-control" id="inputPhone" placeholder="08999887xx"/>
                    </div>
                </div>
            </form>
        </div>

    )
}
