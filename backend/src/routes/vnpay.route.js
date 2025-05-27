import express from 'express';
import qs from "qs";
import crypto from "crypto";
import moment from 'moment';

const router = express.Router();

function sortObject(obj){
    let sorted = {};
    let str = [];
    let key;
    for (key in obj){
        if (obj.hasOwnProperty(key)){
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++){
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

router.post("/create-payment", async (req, res) => {

    const ipAddr = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  // Cấu hình tham số
  const tmnCode = "SNBUG3T2";
  const secretKey = "1VIULX38MI6P6YB5P04A8WRJVFCBZRQ4";
  const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  const returnUrl = "https://celebritychatbot.up.railway.app/api/vnpay/check-payment";


  // Format date for VNPAY (YYYYMMDDHHmmss)
  const date = new Date();
  const createDate = moment(date).format("YYYYMMDDHHmmss");

  // Create order ID like VNPAY example
  const orderId = moment(date).format("DDHHmmss");


  // Tạo các tham số bắt buộc
  const params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Amount: 250000 * 100,
    vnp_CreateDate: createDate,
    vnp_CurrCode: "VND",
    vnp_IpAddr: ipAddr,
    vnp_Locale: "vn",
    vnp_OrderInfo: "THANH TOAN CELEBRITY PRO",
    vnp_OrderType: "other",
    vnp_ReturnUrl: returnUrl,
    vnp_TxnRef: orderId
  };


  let vnp_Params = sortObject(params);

  const signData = qs.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

  // Add hash to parameters
  vnp_Params['vnp_SecureHash'] = signed;
  // Thêm chữ ký vào URL
  const paymentUrl = `${vnpUrl}?${qs.stringify(vnp_Params, { encode: false })}`;

  res.status(201).json({ paymentUrl });
});

// router.get('/check-payment', async (req, res) => {
//     //logic xử lý dữ liệu đơn hàng
//     console.log(req.query);

//     const vnp_Params = req.query;
//     const vnpay = new VNPay({
//         tmnCode: 'SNBUG3T2',
//         secureSecret: '1VIULX38MI6P6YB5P04A8WRJVFCBZRQ4',
//         vnpayHost: 'https://sandbox.vnpayment.vn',
//         testMode: true,
//     });

//     try {
//         // Verify the payment response
//         const isValidSignature = vnpay.verifySignature(vnp_Params);

//         if (isValidSignature) {
//             const vnp_ResponseCode = vnp_Params['vnp_ResponseCode'];
            
//             if (vnp_ResponseCode === '00') {
//                 // Payment successful - redirect to frontend chat page with success notif
//                 return res.redirect('https://web-project-flame-five.vercel.app/chat?payment=success');
//             } else {
//                 // Payment failed - redirect with error
//                 return res.redirect('https://web-project-flame-five.vercel.app/chat?payment=failed');
//             }
//         } else {
//             // Invalid signature - redirect with error
//             return res.redirect('https://web-project-flame-five.vercel.app/chat?payment=invalid');
//         }
//     } catch (error) {
//         console.error('Payment verification error:', error);
//         return res.redirect('https://web-project-flame-five.vercel.app/chat?payment=error');
//     }
// });

export default router;
