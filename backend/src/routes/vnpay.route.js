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
        vnp_IpAddr: req.ip || '127.0.0.1',
        vnp_TxnRef: Date.now().toString(), // Mã giao dịch duy nhất
        vnp_OrderInfo: '123456',
        vnp_OrderType: ProductCode.Other,
        vnp_ReturnUrl: "https://celebritychatbot.up.railway.app/api/vnpay/check-payment", /*"http://localhost:3001/api/vnpay/check-payment",*/
        vnp_Locale: VnpLocale.VN,
        vnp_CreateDate: dateFormat(new Date()),
        vnp_ExpireDate: dateFormat(new Date(new Date().getTime() + 60 * 60 * 1000)),
    });

    return res.status(201).json(vnpayReponse);
});

router.get('/check-payment', async (req, res) => {
    //logic xử lý dữ liệu đơn hàng
    console.log(req.query);

    const vnp_Params = req.query;
    const vnpay = new VNPay({
        tmnCode: 'SNBUG3T2',
        secureSecret: '1VIULX38MI6P6YB5P04A8WRJVFCBZRQ4',
        vnpayHost: 'https://sandbox.vnpayment.vn',
        testMode: true,
    });

    try {
        // Verify the payment response
        const isValidSignature = vnpay.verifySignature(vnp_Params);

        if (isValidSignature) {
            const vnp_ResponseCode = vnp_Params['vnp_ResponseCode'];
            
            if (vnp_ResponseCode === '00') {
                // Payment successful - redirect to frontend chat page with success notif
                return res.redirect('https://web-project-flame-five.vercel.app/chat?payment=success');
            } else {
                // Payment failed - redirect with error
                return res.redirect('https://web-project-flame-five.vercel.app/chat?payment=failed');
            }
        } else {
            // Invalid signature - redirect with error
            return res.redirect('https://web-project-flame-five.vercel.app/chat?payment=invalid');
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        return res.redirect('https://web-project-flame-five.vercel.app/chat?payment=error');
    }
});

export default router;
