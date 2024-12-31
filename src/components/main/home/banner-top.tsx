const BannerTop = () => {
  return (
    <div className="w-full h-[1075px] relative bg-cover bg-no-repeat bg-banner-top-background">
      {/* Title */}
      <section className="flex flex-col gap-y-14 w-[550px] absolute left-[15%] top-1/2 -translate-y-1/2 ">
        <h1 className="text-left text-[48px] font-semibold text-[#004C70]">
          HỆ THỐNG BKT LMS
        </h1>
        <p className="text-justify text-[24px] text-[#004C70]">
          Được xây dựng và phát triển bởi công ty Cổ Phần Đầu tư Thương Mại và
          công nghệ BKT. Nguồn học liệu số và các chức năng tiện ích trên
          website sẽ giúp người quản lý, nhà trường thuận tiện trong việc kiểm
          tra, đánh giá chất lượng an toàn trường học và giúp giáo viên, học
          sinh thuận tiện trong quá trình triển khai chương trình dạy học.
        </p>
      </section>
    </div>
  );
};

export default BannerTop;
