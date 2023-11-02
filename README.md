ver 1.0
Dùng để upload làm bài thử
Note:

1. Cài NodeJS để chạy server (với admin)
2. Vào terminal
3. "npm init", enter đến hết
4. "npm install json-server"
5. kiểm tra trong file package.json thuộc tính dependencies đã có hay chưa. (có là cài thành công)
6. nếu chưa có file database (json) thì tạo ra, theo mẫu mà đang có trong respo này.
7. vì nãy chưa cài global (bước 4) nên giờ sẽ thêm một thuộc tính vào trong package.json như sau:
  tìm đến "scripts": {...}, thêm vào thuộc tính start: "start": "json-server --watch db.json",
8. vào terminal, "npm start", máy sẽ trả về resources có link để fetch như sau: "http://localhost:3000"
9. vào terminal của máy tính, "ssh -R 80:localhost:3000 serveo.net" (sử dụng serveo tạo tunnel server trỏ vào localhost)
10. lấy link được terminal trả về, rồi đem cho client dùng để bỏ vào chỗ điền API.
