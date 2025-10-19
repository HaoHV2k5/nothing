// main.js - Phiên bản đã được tối ưu hóa (Loại bỏ SweetAlert và logic xung đột)

document.addEventListener('DOMContentLoaded', () => {
  // Lấy các phần tử cần thiết
  const startButton = document.getElementById('startButton');
  const splashScreen = document.querySelector('.splash-screen');
  const song = document.querySelector('.song');
  const body = document.body;

  // 1. Thêm sự kiện click cho nút BẮT ĐẦU
  // Chỉ chạy một lần (once: true)
  startButton.addEventListener('click', () => {
    // Cố gắng phát nhạc
    const playPromise = song.play();

    // Xử lý Promise trả về từ play() để đảm bảo tuân thủ Autoplay Policy
    if (playPromise !== undefined) {
      playPromise.then(() => {
        // Nhạc đã bắt đầu phát thành công
        console.log("Nhạc đã phát thành công.");

        // 2. Ẩn màn hình chào mừng (sử dụng class 'hidden' trong CSS)
        splashScreen.classList.add('hidden');

        // 3. KÍCH HOẠT HIỆU ỨNG HOA/CỎ 
        // Loại bỏ class 'not-loaded' khỏi body, kích hoạt các animation CSS
        body.classList.remove('not-loaded');

      }).catch(error => {
        // Xử lý khi Autoplay bị chặn (rất hiếm khi xảy ra với tương tác click)
        console.error("Lỗi phát nhạc, Autoplay bị chặn:", error);

        // Nếu nhạc bị chặn, vẫn ẩn màn hình chào và kích hoạt hiệu ứng hoa
        splashScreen.classList.add('hidden');
        body.classList.remove('not-loaded');

        alert("Âm thanh có thể đã bị trình duyệt của bạn chặn. Vui lòng kiểm tra cài đặt loa và làm mới trang.");
      });
    } else {
      // Fallback: cho các trình duyệt không hỗ trợ Promise từ play()
      splashScreen.classList.add('hidden');
      body.classList.remove('not-loaded');
    }
  }, { once: true });
});

/*
    LƯU Ý: Nếu bạn muốn sử dụng logic hoạt ảnh GSAP/TimelineMax (animationTimeline) ban đầu, 
    bạn cần phải bao gồm thư viện GSAP trong HTML và đảm bảo các tên class (như ".one", ".two", ".hbd-chatbox") 
    có tồn tại. Nếu không cần, bạn chỉ cần sử dụng đoạn code tối ưu hóa này.
*/