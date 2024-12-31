import { Link } from "react-router-dom";

type NavListType = {
  title: string;
  link: string;
};

const navList: NavListType[] = [
  {
    title: "Trang chủ",
    link: "/",
  },
  {
    title: "Hệ thống LMS",
    link: "https://lms.bkt.net.vn/",
  },
  {
    title: "Diễn đàn",
    link: "https://forum.bkt.net.vn/apps/dashboard/",
  },
  {
    title: "Chơi mà học",
    link: "http://playtolearn.bksgroup.vn/",
  },
  {
    title: "Bản đồ tư duy",
    link: "https://mindmap.bkt.net.vn/#/",
  },
  {
    title: "Đăng nhập",
    link: "/",
  },
];

const Header = () => {
  return (
    <header className="absolute top-14 left-0 right-0 z-50 h-[80px] bg-transparent">
      <nav className="w-full px-28 flex justify-between items-center">
        {/* logos */}
        <section>
          <img src="/logo-2xl.png" className="w-[140px] h-[62px]" />
        </section>

        {/* nav list */}
        <section className="flex items-center gap-x-16">
          <ul className="w-full flex items-center gap-x-20">
            {navList.slice(0, -1).map((navItem, index) => (
              <li key={index} className={`hover:cursor-pointer `}>
                <Link
                  to={navItem.link}
                  target={navItem.link === "/" ? "_self" : "_blank"}
                  className="text-[24px] font-normal"
                >
                  {navItem.title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="">
            <li>
              <button className="w-[220px] h-[62px] rounded-[48px] border-[1px] border-[#FFA726] font-normal text-[24px] text-[#FFA726] bg-white ">
                {navList[navList.length - 1].title}
              </button>
            </li>
          </ul>
        </section>
      </nav>
    </header>
  );
};

export default Header;
