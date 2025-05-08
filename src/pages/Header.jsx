import { Outlet, Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="bg-[#309898] p-[20px] flex flex-wrap items-center justify-between px-[5%] text-white text-2xl">
        <div>Student Management System</div>
        <div className="flex gap-[20px] text-[20px]">
          <Link to="/">Admission</Link>
          <Link to="/studentlist">Student List</Link>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Header;
