import React, { useEffect, useState } from "react";
import Header from "./Header";
import actionIcon from '../assets/mark.png';
import { ToastContainer, toast } from 'react-toastify';
import { Outlet, Link } from "react-router-dom";
function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(stored);
  }, []);
  const notify = () => toast("Deleting...");
  return (
    <>
      <Header />
      <div className="w-[80%] mx-auto p-[20px] bg-white shadow-lg rounded">
        <h2 className="text-xl font-bold text-center mb-4">Students List</h2>
        {students.length === 0 ? (
          <p className="text-center text-gray-500">No student data found.</p>
        ) : (
          
          <table className=" w-full text-left">
            <thead>
              <tr className="bg-[#f1f5f9] text-gray-700">
                <th className="p-2">Name</th>
                <th className="p-2">Mobile</th>
                <th className="p-2">Upazila</th>
                <th className="p-2">District</th>
                <th className="p-2">Class</th>
                <th className="p-2">Gender</th>
                <th className="p-2">Other Info</th>
                <th className="p-2">Delete</th>
                <th className="p-2">Update</th>
              </tr>
            </thead>
            <tbody>
            <ToastContainer />
              {students.map((student, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"} 
                >
                  <td className="p-2">{student.name}</td>
                  <td className="p-2">{student.mobile}</td>
                  <td className="p-2">{student.upazila}</td>
                  <td className="p-2">{student.district}</td>
                  <td className="p-2">{student.class}</td>
                  <td className="p-2">{student.gender}</td>
                  <td className="p-2">{student.othersInfo}</td>
                  <td className="p-2">
                    <button className="bg-red-500 p-[7px] rounded-[5px] text-white shadow-2xl" onClick={(student)=>{
                          const studentData = JSON.parse(localStorage.getItem("students")) || [];
                          const updatedData = studentData.filter(student => student.mobile !== studentData[index].mobile);
                          localStorage.setItem("students", JSON.stringify(updatedData));
                          toast("Deleting...");
                          setStudents(updatedData); 
                       }}>
                        Delete
                    </button>
                  </td>
                  <td className="p-2" >
                    <Link to="/updateinfo" state={{ mobile: student.mobile, index: index }} class="bg-[#309898] p-[7px] rounded-[5px] text-white shadow-2xl">Update</Link>
                  </td>
                </tr>

              ))}
            </tbody>
          </table>
        )}
      </div>
      <Outlet />
    </>
  );
}

export default StudentList;
