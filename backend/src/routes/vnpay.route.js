import express from 'express';
import qs from "qs";
import crypto from "crypto";
import moment from 'moment';
import { verifyToken } from '../middleware/auth.middleware.js';  
import User from '../models/users.model.js'; 
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

router.get('/check-payment', verifyToken, async (req, res) => {
    //logic xử lý dữ liệu đơn hàng
    console.log(req.query);

    const vnp_Params = req.query;
    const secretKey = "1VIULX38MI6P6YB5P04A8WRJVFCBZRQ4";
    
    // Get secure hash from request
    const secureHash = vnp_Params['vnp_SecureHash'];
    
    // Remove hash from params before validation
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];
    
    // Sort parameters
    const sortedParams = sortObject(vnp_Params);

    // Create validation signature
    const signData = Object.keys(sortedParams)
        .map(key => `${key}=${sortedParams[key]}`)
        .join('&');
        
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

    // Compare signatures
    const isValidSignature = secureHash === signed;

    try {
        if (isValidSignature) {
            const vnp_ResponseCode = vnp_Params['vnp_ResponseCode'];
            
            if (vnp_ResponseCode === '00') {
                   await User.findByIdAndUpdate(
          req.user._id,
          { tier: 'premium' },
          { new: true }
        );
                return res.redirect('https://web-project-flame-five.vercel.app/chat?payment=success');
            } else {
                // Payment failed
                console.log('Payment failed with code:', vnp_ResponseCode);
                return res.redirect('https://web-project-flame-five.vercel.app/chat?payment=failed');
            }
        } else {
            // Invalid signature
            console.log('Invalid signature');
            console.log('Expected:', signed);
            console.log('Received:', secureHash);
            return res.redirect('https://web-project-flame-five.vercel.app/chat?payment=invalid');
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        return res.redirect('https://web-project-flame-five.vercel.app/chat?payment=error');
    }
});

export default router;
