const lmsListFeatures: Array<{ title: string }> = [
  {
    title: "Quản lý bài học",
  },
  {
    title: "Quản lý bài thi",
  },
  {
    title: "Quản lý học trực tuyến",
  },
  {
    title: "Quản lý thi trực tuyến",
  },
  {
    title: "Quản lý kết quả học",
  },
  {
    title: "Quản lý lớp học",
  },
];
const forumListFeatures: Array<{ title: string }> = [
  {
    title: "Dạy học trực tuyến",
  },
  {
    title: "Tổ chức thi trực tuyến",
  },
  {
    title: "Quản lý học sinh",
  },
  {
    title: "Quản lý kết quả",
  },
  {
    title: "Giao bài tập về nhà cho học sinh",
  },
];

const playToLearnListFeatures: Array<{ title: string }> = [
  {
    title: "Khám phá trò chơi học tập sáng tạo",
  },

  {
    title: "Học qua các trò chơi tương tác",
  },

  {
    title: "Rèn luyện kỹ năng qua trò chơi thú vị",
  },

  {
    title: "Trò chơi giúp phát triển tư duy sáng tạo",
  },
];

const stemListFeatures: Array<{ title: string }> = [
  {
    title: "Lập trình",
  },

  {
    title: "Vẽ mạch điện",
  },

  {
    title: "Vẽ mạch điện",
  },

  {
    title: "Vẽ mạch điện",
  },
  {
    title: "Vẽ mạch điện",
  },
];

const mindMapFeatures: Array<{ title: string }> = [
  {
    title: "Tạo cấu trúc phân cấp trực quan",
  },
  {
    title: "Sử dụng màu sắc, hình ảnh và biểu tượng",
  },
  {
    title: "Linh hoạt chỉnh sửa và mở rộng",
  },
  {
    title: "Tích hợp với các công cụ khác",
  },
  {
    title: "Hỗ trợ học tập",
  },
];

const whyUsListFeatures: Record<
  string,
  {
    image: string;
    parentTitle: string;
    content: { icon: string; title: string; description: string }[];
  }
> = {
  school: {
    parentTitle: "Nhà trường",
    image: "/why-us/wu_1.png",
    content: [
      {
        icon: "/gif/gif-1.gif",
        title: "Quản lý toàn diện",
        description:
          "Quản lý toàn diện hoạt động dạy và học của giáo viên, học sinh theo từng khối lớp.",
      },
      {
        icon: "/gif/gif-2.gif",
        title: "Nâng cao chất lượng dạy và học",
        description:
          "Sử dụng nguồn học liệu, hạ tầng công nghệ và các báo cáo của BKTEdu nhằm chủ động, phát huy và nâng cao chất lượng đào tạo.",
      },
      {
        icon: "/gif/gif-3.gif",
        title: "Đánh giá chính xác",
        description:
          "Báo cáo, thống kê, đánh giá hoạt động giảng dạy của giáo viên. Nắm bắt điểm mạnh, điểm yếu của học sinh từng khối lớp.",
      },
      {
        icon: "/gif/gif-4.gif",
        title: "Tối ưu thời gian",
        description:
          "Giảm thời gian thống kê, báo cáo, phân tích.Giảm thời gian tổ chức kiểm tra, đánh giá.Thuận tiện kết nối trực tiếp, kịp thời với phụ huynh.",
      },
    ],
  },
  teacher: {
    image: "/why-us/wu_2.png",
    parentTitle: "Giáo viên",
    content: [
      {
        icon: "/gif/gif-4.gif",
        title: "Tiết kiệm thời gian",
        description:
          "Tiết kiệm 95% thời gian soạn giáo án, giao bài tập, tổ chức kiểm tra, chấm điểm",
      },
      {
        icon: "/gif/gif-5.gif",
        title: "Hỗ trợ quản lý",
        description:
          "Báo cáo thống kê nhanh, chính xác hiệu quả học tập của từng học sinh.",
      },
      {
        icon: "/gif/gif-2.gif",
        title: "Dạy học hiệu quả",
        description:
          "Sử dụng nguồn học liệu của BKTEdu để đa dạng hóa cách truyền tải kiến thức. Ứng dụng LMS vào dạy học,thi trực tuyến",
      },
      {
        icon: "/gif/gif-6.gif",
        title: "Giảm áp lực",
        description:
          "Hỗ trợ phân hóa học sinh, từ đó thiết kế lộ trình bồi dưỡng riêng biệt, sát sao, hiệu quả cho học sinh.",
      },
    ],
  },
  parent: {
    image: "/why-us/wu_3.png",
    parentTitle: "Phụ huynh",
    content: [
      {
        icon: "/gif/gif-1.gif",
        title: "Báo cáo trực quan",
        description:
          "Nhận báo cáo chi tiết hàng ngày về điểm mạnh, điểm yếu và kết quả học tập của con.",
      },
      {
        icon: "/gif/gif-7.gif",
        title: "Hỗ trợ kèm con học",
        description:
          "Sử dụng học liệu, lộ trình gợi ý và các phân tích của BKTEdu để hỗ trợ con tự học hoặc có kế hoạch bồi dưỡng phù hợp.",
      },
      {
        icon: "/gif/gif-4.gif",
        title: "Tiết kiệm thời gian",
        description:
          "Sử dụng học liệu, lộ trình gợi ý và các phân tích của BKTEdu để hỗ trợ con tự học hoặc có kế hoạch bồi dưỡng phù hợp.",
      },
      {
        icon: "/gif/gif-8.gif",
        title: "Tiết kiệm tài chính",
        description:
          "Tiết kiệm chi phí, giảm áp lực học thêm khi con tự học hiệu quả.",
      },
    ],
  },
  student: {
    image: "/why-us/wu_4.png",
    parentTitle: "Học sinh",
    content: [
      {
        icon: "/gif/gif-7.gif",
        title: "Linh hoạt, chủ động",
        description:
          "Học mọi lúc, mọi nơi trên các thiết bị điện tử có kết nối Internet.",
      },
      {
        icon: "/gif/gif-9.gif",
        title: "Cạnh tranh thu hút",
        description:
          "Quà tặng hấp dẫn và nhiều cuộc thi khuyến khích, cổ vũ tinh thần ham học.",
      },
      {
        icon: "/gif/gif-10.gif",
        title: "Lộ trình học cá nhân hoá",
        description:
          "Phát hiện điểm mạnh, điểm yếu, đề xuất kiến thức và kỹ năng phù hợp với năng lực học sinh. Rút ngắn thời gian học tập từ 30% - 50%.",
      },
      {
        icon: "/gif/gif-11.gif",
        title: "Tăng hứng thú học",
        description:
          "Video bài giảng hoạt hình cùng hệ thống câu hỏi luyện tập phong phú và giàu tính tương tác giúp học sinh vững kiến thức, hào hứng học tập.",
      },
    ],
  },
};

export {
  lmsListFeatures,
  forumListFeatures,
  mindMapFeatures,
  whyUsListFeatures,
  playToLearnListFeatures,
  stemListFeatures,
};
