const Footer = () => {
  return (
    <footer className="h-[540px] bg-[#005CB9] overflow-hidden">
      <div className="w-full pt-[95px] grid grid-cols-3 mx-20 ">
        {/* left container */}
        <div className="flex flex-col gap-y-14 col-span-1">
          <img src={"/logo-2xl.png"} width={306} height={128} alt="bkt-logo" />
          <p className="w-[333px] text-white">
            Cuộc sống vốn đa dạng muôn màu, không ngừng biến đổi và có nhiều
            thách thức, cùng với tri thức khoa học, việc hình thành và rèn luyện
            kỹ năng cuộc sống đợc xem là chìa khóa quan trọng giúp mỗi chúng ta
            tồn tại, phát triển và mở cánh cửa thành công
          </p>
        </div>
        {/* middle container */}
        <div className="col-span-1 flex justify-center">
          <div className="mr-32">
            <h3 className="text-white text-2xl font-semibold">Giới thiệu</h3>
            <ul className="mt-10 text-white">
              <li className="mb-7">
                <a href={"/"}>Tài nguyên</a>
              </li>
              <li className="mb-7">
                <a href={"/"}>Giới thiệu</a>
              </li>
              <li className="mb-7">
                <a href={"/"}>Tính năng chính</a>
              </li>
            </ul>
          </div>
        </div>
        {/* Right container */}
        <div className="col-span-1">
          <h3 className="text-white text-2xl font-semibold">Liên hệ</h3>
          <ul className="mt-10 text-white">
            <li className="mb-6">
              <p>
                LKC39 Embasy Garden, đường Hoàng Minh Thảo, <br></br> Phường
                Xuân Tảo, Quận Bắc Từ Liêm, Hà Nội
              </p>
            </li>
            <li className="mb-6">
              <p>Tel: 0337 218 868</p>
            </li>
            <li className="mb-6">
              <p>Email: info.bktjsc@gmail.com</p>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
