import React, { Component } from 'react'
import ReceiptService from '../services/ReceiptService'

class ListReceiptComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                receipts: []
        }
        this.addReceipt = this.addReceipt.bind(this);
        this.editReceipt = this.editReceipt.bind(this);
        this.deleteReceipt = this.deleteReceipt.bind(this);
    }

    deleteReceipt(id){
        ReceiptService.deleteReceipt(id).then( res => {
            this.setState({receipts: this.state.receipts.filter(receipt => receipt.id !== id)});
        });
    }
    viewReceipt(id){
        this.props.history.push(`/view-receipt/${id}`);
    }
    editReceipt(id){
        this.props.history.push(`/add-receipt/${id}`);
    }

   componentDidMount(){
        ReceiptService.getReceipts().then((res) => {
            if(res.data==null)
            {
                this.props.history.push('/add-receipt/_add');
            }
            this.setState({ receipts: res.data});
        });
    }

    addReceipt(){
        this.props.history.push('/add-receipt/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Receipts List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addReceipt}> Add Receipt</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                <th>Company Name</th>
                                <th>Address</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Product Names</th>
                                <th>Product Prices</th>
                                <th>Total amount</th>
                                <th>Total KDV</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.receipts.map(
                                        receipt => 
                                        <tr key = {receipt.id}>
                                             <td> { receipt.companyName} </td>   
                                             <td> {receipt.address}</td>
                                             <td> {receipt.date}</td>
                                             <td> {receipt.time}</td>
                                             <td> {receipt.productNames}</td>
                                             <td> {receipt.productPrices}</td>
                                             <td> {receipt.totalAmount}</td>
                                             <td> {receipt.totalKDV}</td>
                                             <td>
                                                 <button onClick={ () => this.editReceipt(receipt.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteReceipt(receipt.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewReceipt(receipt.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListReceiptComponent;
