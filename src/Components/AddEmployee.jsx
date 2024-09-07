import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { useForm } from "react-hook-form"

const AddEmployee = () => {

    //const { register} = useForm()
  const [employee, setEmployee] = useState({
    Emp_Id: "",
    name: "",
    email: "",
    salary: "",
    position: "",
    category_id: "",
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:4000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('Emp_Id', employee.Emp_Id);
    formData.append('position', employee.position);
    formData.append('salary', employee.salary);
    formData.append('category_id', employee.category_id);

    axios.post('http://localhost:4000/auth/add_employee', formData)
    .then(result => {
        if(result.data.Status) {
            navigate('/dashboard/employee')
        } else {
            alert(result.data.Error)
        }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
        <div className="text-danger">
          <p className="pb-0 mb-1">* All Fields are mandatory.</p>
          <p className="pt-0">* Employee Id should be Unique.</p>
        </div>

        <form className="row g-1" onSubmit={handleSubmit}>

          <div className="col-12">
            <label htmlFor="Emp_Id" className="form-label">
              Employee Id
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="Emp_Id"
              placeholder="144"
              //{...register("name", { required: true })}
              onChange={(e) =>
                setEmployee({ ...employee, Emp_Id: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="name"
              placeholder="Enter Name"
              //{...register("name", { required: true })}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="email"
              placeholder="Enter Email"
              //{...register("email", { required: true })}
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="salary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="salary"
              placeholder="Enter Salary"
              //{...register("salary", { required: true })}
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="position" className="form-label">
              Position
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="position"
              placeholder="Senior Developer"
              //{...register("address", { required: true })}
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, position: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="category_id" className="form-label">
              Department
            </label>
            <select name="category" id="category_id" className="form-select"
                onChange={(e) => setEmployee({...employee, category_id: e.target.value})}>
                <option value="" disabled selected>Select Department</option> 
              {category.map((c) => {
                return <option key={c.id} value={c.id}>{c.name}</option>;
              })}
            </select>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddEmployee;