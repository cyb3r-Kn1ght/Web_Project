import express from 'express';
import { VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat } from 'vnpay';

const router = express.Router();

router.post('/create-qr', async (req, res) => {
    const vnpay = new VNPay({
        tmnCode: 'SNBUG3T2',
        secureSecret: '1VIULX38MI6P6YB5P04A8WRJVFCBZRQ4',
        vnpayHost: 'https://sandbox.vnpayment.vn',
        testMode: true,
        hashAlgorithm: 'sha512',
        ignoreLogger: ignoreLogger,
    });

    const vnpayReponse = await vnpay.buildPaymentUrl({
        vnp_Amount: 500000,
        vnp_IpAddr: '127.0.0.1',
        vnp_TxnRef: '123456',
        vnp_OrderInfo: '123456',
        vnp_OrderType: ProductCode.Other,
        vnp_ReturnUrl: /*"https://celebritychatbot.up.railway.app/api/vnpay/check-payment",*/ "http://localhost:3001/api/vnpay/check-payment",
        vnp_Locale: VnpLocale.VN,
        vnp_CreateDate: dateFormat(new Date()),
        vnp_ExpireDate: dateFormat(new Date(new Date().getTime() + 60 * 60 * 1000)),
    });

    return res.status(201).json(vnpayReponse);
});

router.get('/check-payment', async (req, res) => {
    //logic xử lý dữ liệu đơn hàng
    console.log(req.query);
});

export default router;
