require('dotenv').config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'electronvbc@gmail.com',
        pass: process.env.APP_PASS
    }
});


function createPayloadForSendingReceiver(to, document) {
    const title = document.title;
    const sender = document.createdBy.fullName;
    const content = document.description;
    const link = process.env.REACT_APP_LINK + `/document/${document._id}`;
    const subject = `[Electron] Thông báo văn bản mới cần phê duyệt`;
    const html = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h3 style="color: #333;">Kính gửi,</h3>
            <p style="margin-bottom: 20px;">Có một văn bản cần được phê duyệt với thông tin như sau: .</p>
            <div style="background-color: #f5f5f5; padding: 10px; margin-bottom: 20px;">
            <h4 style="margin-bottom: 10px; color: #555;">Thông tin văn bản:</h4>
            <ul style="list-style-type: none; padding-left: 0;">
            <li style="margin-bottom: 5px;"><strong>Tiêu đề: </strong> ${title}</li>
            <li style="margin-bottom: 5px;"><strong>Người gửi:</strong> ${sender}</li>
            <li style="margin-bottom: 5px;"><strong>Nội dung: </strong>${content} </li>
            
            <li style="margin-bottom: 5px;"><strong>Truy cập <a href="${link}" target="_blank">tại đây</a></strong></li>
            </ul>
            </div>
            <p style="margin-bottom: 10px;">Đây là một thông báo tự động và không yêu cầu phản hồi</p>
            <p>Xin cảm ơn!</p>
            <div style="text-align: center;">
                <img src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/euodc0nsofnfhgigqvc6" alt="VBC" style="max-width: 400px; height: auto;">
            </div>
        </div>
    `
    return {
        from: "electronvbc@gmail.com",
        to: to,
        subject: subject,
        html: html
    }
}


function createPayloadForSendingFeedback(status, comment, document) {
    const title = document.title;
    const sender = document.createdBy.fullName;
    const content = document.description;
    const link = process.env.REACT_APP_LINK + `/document/${document._id}`;
    const subject = `[Electron] Thông báo phản hồi văn bản`;
    const html = `
    <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px;">
      <h2 style="color: #333;">Kính gửi ${sender},</h2>
      <p style="margin-bottom: 20px;">Văn bản "${title}" của bạn đã nhận được phản hồi.</p>
      <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 4px;">
        <h3 style="color: #333;">Phản hồi:</h3>
        <p style="margin-bottom: 20px;">${comment}</p>
        <p style="margin-bottom: 10px;"><strong>Trạng thái:</strong> ${status}</p>
      </div>
      <h3 style="color: #333; margin-top: 30px;">Nội dung văn bản:</h3>
      <p style="margin-bottom: 20px;">${content}</p>
      <li style="margin-bottom: 5px;"><strong>Truy cập <a href="${link}" target="_blank">tại đây</a></strong></li>
        <p style="margin-bottom: 10px;">Đây là một thông báo tự động và không yêu cầu phản hồi</p>
        <p>Xin cảm ơn!</p>
        <div style="text-align: center;">
            <img src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/euodc0nsofnfhgigqvc6" alt="VBC" style="max-width: 400px; height: auto;">
        </div>
    </div>
  `;

    return {
        from: "electronvbc@gmail.com",
        to: document.createdBy.email,
        subject: subject,
        html: html
    }
}

function sendMail(payload) {
    transporter.sendMail(payload, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


module.exports = { sendMail, createPayloadForSendingReceiver, createPayloadForSendingFeedback };