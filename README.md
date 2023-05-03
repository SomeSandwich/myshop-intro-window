# myshop-intro-window



<p align="left">

<img src="https://img.shields.io/badge/version-1.0.0-blue">

<img src="https://img.shields.io/badge/platforms-Windows-orange.svg">

</p>

## Thông tin nhóm


|Họ và tên|   MSSV   | Email|
|---|:---:|---|
| Nguyễn Tấn Hiếu      | 20127159 | hieucckha@gmail.com          |
| Võ Thanh Sương       | 20127312 | vothanhsuong123@gmail.com       |
| Võ Minh Thông        | 20127638 | thong89x@gmail.com |
| Nguyễn Văn Hậu       | 20127493 | vanhau02qn@gmail.com|

## Các chức năng đã làm được

#### 1. Màn hình đăng nhập

Cho nhập username và password để đi vào màn hình chính. Có chức năng lưu username và password ở local để lần sau người dùng không cần đăng nhập lại. Password cần được mã hóa

#### 2. Màn hình dashboard

Cung cấp tổng quan về hệ thống, ví dụ:

-   Có tổng cộng bao nhiêu sản phẩm đang bán
-   Liệt kê top 5 sản phẩm đang sắp hết hàng (số lượng < 5)
<div>
<img src="https://github.com/SomeSandwich/myshop-intro-window/blob/main/Img/dashboard_1.png" width="516"/>
<img src="https://github.com/SomeSandwich/myshop-intro-window/blob/main/Img/dashboard_2.png" width="516"/>
</div>

#### 3. Quản lí hàng hóa

- [x] Import dữ liệu gốc ban đầu (loại sản phẩm, danh sách các sản phẩm) từ tập tin Excel hoặc Access.
- [x] Xem danh sách các sản phẩm theo loại sản phẩm có phân trang.
- [x] Cho phép thêm một loại sản phẩm, xóa một loại sản phẩm, hiệu chỉnh loại sản phẩm
- [x] Cho phép thêm một sản phẩm, xóa một sản phẩm, hiệu chỉnh thông tin sản phẩm
- [x] Cho phép tìm kiếm sản phẩm theo tên
- [x] Cho phép lọc lại sản phẩm theo khoảng giá
<div>
<img src="https://github.com/SomeSandwich/myshop-intro-window/blob/main/Img/CreateBook_1.png" width="516"/>
<img src="https://github.com/SomeSandwich/myshop-intro-window/blob/main/Img/home_1.png" width="516"/>
<img src="https://github.com/SomeSandwich/myshop-intro-window/blob/main/Img/Cate_1.png" width="516"/>
<img src="https://github.com/SomeSandwich/myshop-intro-window/blob/main/Img/Cate_2.png" width="516"/>
<img src="https://github.com/SomeSandwich/myshop-intro-window/blob/main/Img/Cate_3.png" width="516"/>
<img src="https://github.com/SomeSandwich/myshop-intro-window/blob/main/Img/CreateBook_2.png" width="516"/>
</div>

#### 4. Quản lí các đơn hàng

- [x] Tạo ra các đơn hàng
- [x] Cho phép xóa một đơn hàng, cập nhật một đơn hàng
- [x] Cho phép xem danh sách các đơn hàng có phân trang, xem chi tiết một đơn hàng
- [x] Tìm kiếm các đơn hàng từ ngày đến ngày
<div>
<img src="https://github.com/SomeSandwich/myshop-intro-window/blob/main/Img/CreateOrder.png" width="516"/>
<img src="https://github.com/SomeSandwich/myshop-intro-window/blob/main/Img/UpdateOrder.png" width="516"/>
<img src="https://github.com/SomeSandwich/myshop-intro-window/blob/main/Img/DeleteOrder.png" width="516"/>
<img src="https://github.com/SomeSandwich/myshop-intro-window/blob/main/Img/OrderDashboard.png" width="516"/>
</div>

#### 5. Báo cáo thống kê

- [x] Báo cáo doanh thu và lợi nhuận theo ngày đến ngày, theo tuần, theo tháng, theo năm (vẽ biểu đồ)
- [x]  Xem các sản phẩm và số lượng bán theo ngày đến ngày, theo tuần, theo tháng, theo năm (vẽ biểu đồ)
<div>
<img src="https://github.com/SomeSandwich/myshop-intro-window/blob/main/Img/Statistic.png" width="516"/>
</div>

#### 6. Cấu hình
- [x] Cho phép hiệu chỉnh số lượng sản phẩm mỗi trang
- [x] Cho phép khi chạy chương trình lên thì mở lại màn hình cuối mà lần trước tắt

#### 7. Đóng gói thành file cài đặt
- [x] Cần đóng gói thành file exe để tự cài chương trình vào hệ thống


### Các chức năng chưa làm được theo yêu cầu của thầy
  

### Các chức năng, đặc điểm đặc sắc của bài tập đề nghị cộng điểm
- [x]  Sử dụng một thiết kế giao diện tốt lấy từ pinterest (0.5 điểm):
<div>
<img src="https://github.com/SomeSandwich/myshop-intro-window/blob/main/Img/priterest.png" width="516"/>
<img src="https://github.com/SomeSandwich/myshop-intro-window/blob/main/Img/orderDetail.png" width="516"/>
</div>

- [ ]  Làm rối mã nguồn (obfuscator) chống dịch ngược (0.5 điểm)
- [ ] Thêm chế độ dùng thử - cho phép xài full phần mềm trong 15 ngày. Hết 15 ngày bắt đăng kí (mã code hay cách kích hoạt nào đó) (0.5 điểm)
- [ ] Báo cáo các sản phẩm bán chạy trong tuần, trong tháng, trong năm (1 điểm)
- [x] Bổ sung khuyến mãi giảm giá (1 điểm)
- [x] Quản lí khách hàng : Tạo và Thêm khách hàng vô đơn hàngg(0.5 điểm)
- [ ] Sử dụng giao diện Ribbon (0.5 điểm)
- [ ]  Backup / restore database (0.5 điểm)
- [x] Tổ chức theo mô hình 3 lớp (1 điểm)
- [ ] Chương trình có khả năng mở rộng động theo kiến trúc plugin (1 điểm)
- [ ] Sử dụng mô hình MVVM (1 điểm)
- [x] Cho phép tìm các sản phẩm sắp hết hàng (số lượng < 5) (0.5 điểm)
- [ ] Sử dụng DevExpress / Telerik / Kendo UI (1 điểm)
- [ ] Có khả năng cập nhật tính năng mới qua mạng sử dụng ClickOnce(0.5 điểm)
- [ ] Sử dụng thư viện WinUI mới (1 điểm)
- [x] Kết nối API Rest API (2 điểm)
- [ ] Kết nối GraphQL API (2 điểm)
**1. Thêm bánh vào hóa đơn hiện tại**
- Khi xem chi tiết một sách nào đó, người dùng có thể thêm nhanh chúng vào hóa đơn và sau đó có thể cân nhắc mua hay không mua ở mục Order. 

- Link to other pages:
  - Project Management: **Dùng Github Project**

- The host:
  - API
    - Direct IP: [139.59.248.73:7772](http://139.59.248.73:7772/)
    - Domain: [myshop.hieucckha.me](http://myshop.hieucckha.me/)

  - Database: **Ib vùng kín để biết thêm thông tin chi tiết**

- Frontend: Chưa biết dùng gì hết

## Điểm đề nghị cho bài tập

- **Điểm đề nghị: 10đ.**

- **Điểm cộng đề nghị: 2đ.**

  

### Link demo

>***https://drive.google.com/file/d/1mMN-qJc9VIYd-CRSJXDlSgyHweMX5QfS/view?usp=share_link***

### Link drive bài nộp

>***not yet***

### Link github

> ***https://github.com/SomeSandwich/myshop-intro-window.git***

### License

