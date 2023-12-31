import http from '../utils/http'

const URL = 'Receiver'

const ReceiverAPI = {
    /**
     * @description Lấy tất cả người nhận theo id chứng từ
     * @author @LB.Thành (06/09/2023)
     */
    getAllReceiverByTransfer(id) {
        return http.get(`${URL}/${id}`);
    },

    /**
     * @description Lấy tất cả người nhận theo id chứng từ
     * @author @LB.Thành (06/09/2023)
     */
    getNewestReceiverByTransfer() {
        return http.get(URL);
    }

}

export default ReceiverAPI