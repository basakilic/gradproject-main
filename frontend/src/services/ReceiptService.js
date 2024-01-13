import axios from 'axios';

const RECEIPT_API_BASE_URL = "http://localhost:5000/receipts";

class ReceiptService {

    getReceipts(){
        return axios.get(RECEIPT_API_BASE_URL);
    }

    createReceipt(receipt){
        return axios.post(RECEIPT_API_BASE_URL, receipt);
    }

    getReceiptById(receiptId){
        return axios.get(RECEIPT_API_BASE_URL + '/' + receiptId);
    }

    updateReceipt(receipt, receiptId){
        return axios.put(RECEIPT_API_BASE_URL + '/' + receiptId, receipt);
    }

    deleteReceipt(receiptId){
        return axios.delete(RECEIPT_API_BASE_URL + '/' + receiptId);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ReceiptService()