import Header from "./Header";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from "react-router-dom";
function Update(){
    const location = useLocation();
    const { mobile,index } = location.state || {};
    const studentData = JSON.parse(localStorage.getItem("students")) || [];
    const [flag, setFlag] = useState(true);
    const studentsInfo = studentData.filter(student => student.mobile == mobile);
    const [inputs, setInputs] = useState(
        {username:studentsInfo[0].name,
        mobile:studentsInfo[0].mobile,
        upazila:studentsInfo[0].upazila,
        district:studentsInfo[0].district
    });
    const [sClass, setsClass] = useState(studentsInfo[0].class);
    const [gender, setGender] = useState(studentsInfo[0].gender);
    const [othersInfo, setOthersInfo] = useState(studentsInfo[0].othersInfo);
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
    const handleChangeClass = (event) => {
        setsClass(event.target.value);
    };
    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const handleChangeOthersInfo = (event) => {
        setOthersInfo(event.target.value);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const newStudent = {
        name: inputs.username ? inputs.username : '',
        mobile: inputs.mobile ? inputs.mobile : '',
        upazila: inputs.upazila ? inputs.upazila : '', 
        district: inputs.district ? inputs.district: '',
        class: sClass,
        gender: gender ? gender : '',
        othersInfo: othersInfo ? othersInfo : ''
       };

       if(newStudent.name.length < 3){
        setFlag(false);
      } 
      else if(newStudent.mobile.length != 11 || newStudent.mobile.slice(0, 2) !== '01'){
        setFlag(false);
      }
      else if(newStudent.upazila.length < 2){
        setFlag(false);
      }
      else if(newStudent.district.length < 2){
        setFlag(false);
      }
      else if(newStudent.gender.length == 0){
        alert("Please Select Gender!");
        setFlag(false);
      }
      else if(newStudent.othersInfo.length < 2){
        setFlag(false);
      }
      else{
        setFlag(true);
        studentData[index].name = newStudent.name;
        studentData[index].mobile = newStudent.mobile;
        studentData[index].upazila = newStudent.upazila;
        studentData[index].district =  newStudent.district;
        studentData[index].class = newStudent.class;
        studentData[index].gender = newStudent.gender;
        studentData[index].othersInfo = newStudent.othersInfo;
        localStorage.setItem("students", JSON.stringify(studentData));
        notify();
      }

    };
    const notify = () => toast("Updating...");
    return(
        <>
        <Header/>
        <div className="w-[80%]  p-[20px] mx-auto my-[10px] shadow-2xl rounded-2xl">
         <p className=" text-[25px] text-center text-[gray]">Update Student Information</p><br/>
         <form onSubmit={handleSubmit} className=" max-w-[100%] grid sm:grid-cols-1 lg:grid-cols-2 gap-[20px]">
            <div>
                <p className="text-[18px]">Student Name</p>
                <input 
                    type="text" 
                    name="username" 
                    value={inputs.username || ""} 
                    onChange={handleChange}
                    className="w-[100%] p-[8px] outline-0 border-[1px] border-[#309898] rounded-[5px]"
                    required
                />
                {
                  inputs.username && inputs.username.length < 3 && (
                    <span className="text-red-500">Name should be greater than 3 letters</span>
                  )
                }
            </div>
            <div>
                <p className="text-[18px]">Mobile</p>
                <input 
                    type="number" 
                    name="mobile" 
                    value={inputs.mobile || ""} 
                    onChange={handleChange}
                    className="w-[100%] p-[8px] outline-0 border-[1px] border-[#309898] rounded-[5px]"
                    required
                />
                {
                  inputs.mobile && 
                  (inputs.mobile.length !== 11 || inputs.mobile.slice(0, 2) !== '01') && (
                    <span className="text-red-500">Mobile number should be 11 digits and start with '01'</span>
                  )
                }

            </div>
            <div>
                <p className="text-[18px]">Upazila</p>
                <input 
                    type="text" 
                    name="upazila" 
                    value={inputs.upazila || ""} 
                    onChange={handleChange}
                    className="w-[100%] p-[8px] outline-0 border-[1px] border-[#309898] rounded-[5px]"
                    required
                />
                {
                  inputs.upazila && inputs.upazila.length < 2 && (
                    <span className="text-red-500">Please Provive Valid Upazila Name</span>
                  )
                }
            </div>
            <div>
                <p className="text-[18px]">District</p>
                <input 
                    type="text" 
                    name="district" 
                    value={inputs.district || ""} 
                    onChange={handleChange}
                    className="w-[100%] p-[8px] outline-0 border-[1px] border-[#309898] rounded-[5px]"
                    required
                />
                {
                  inputs.district && inputs.district.length < 2 && (
                    <span className="text-red-500">Please Provive Valid District Name</span>
                  )
                }
            </div>
            <div>
                <p className="text-[18px]">Class</p>
                <select value={sClass} onChange={handleChangeClass}  className="w-[100%] p-[8px] outline-0 border-[1px] border-[#309898] rounded-[5px]">
                    <option value="Six">Six</option>
                    <option value="Seven">Seven</option>
                    <option value="Eight">Eight</option>
                    <option value="Nine">Nine</option>
                    <option value="Ten">Ten</option>
                </select>
            </div>
            <div>
                <p className="text-[18px] mb-[5px]">Gender</p>
                <div className="flex items-center gap-[15px]">
                    <label className="flex items-center gap-[5px]">
                    <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={gender === "Male"}
                        onChange={handleGenderChange}
                        className="accent-[#309898]"
                    />
                    Male
                    </label>
                    <label className="flex items-center gap-[5px]">
                    <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={gender === "Female"}
                        onChange={handleGenderChange}
                        className="accent-[#309898]"
                    />
                    Female
                    </label>
                    <label className="flex items-center gap-[5px]">
                    <input
                        type="radio"
                        name="gender"
                        value="Other"
                        checked={gender === "Other"}
                        onChange={handleGenderChange}
                        className="accent-[#309898]"
                    />
                    Other
                    </label>
                </div>
            </div>
            <div className="lg:col-span-2" >
                <p className="text-[18px]">Others Information</p>
                <textarea value={othersInfo} onChange={handleChangeOthersInfo} className="w-[100%] p-[8px] outline-0 border-[1px] border-[#309898] rounded-[5px]" required/>
                {
                  othersInfo && othersInfo.length < 2 && (
                    <span className="text-red-500">Please Added Some Additional Information</span>
                  )
                }
            </div>

            <button type="Submit" className="lg:col-span-2 bg-[#309898] border-[2px] text-white text-[18px] p-[10px] rounded-[10px]  duration-[0.5s] border-box hover:border-[2px]  hover:bg-white border-[#309898] hover:text-[#309898]">Submit</button>
            {
              flag === false && (
                <span className="text-red-500">Please fix all issues before submitting this form</span>
              )
            }
            <ToastContainer />
         </form>
        </div>
        </>
    );
}
export default Update;