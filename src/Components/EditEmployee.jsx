import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployee = () => {
    const {Emp_Id} = useParams()
    const [employee, setEmployee] = useState({
        Emp_Id: "",
        name: "",
        email: "",
        salary: "",
        position: "",
        category_id: "",
      });
      const [category, setCategory] = useState([])
      const navigate = useNavigate()

      useEffect(()=> {
        axios.get('http://localhost:4000/auth/category')
        .then(result => {
            if(result.data.Status) {
                setCategory(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))

        axios.get('http://localhost:4000/auth/employee/'+Emp_Id)
        .then(result => {
            setEmployee({
                ...employee,
                Emp_Id: result.data.Result[0].Emp_Id,
                name: result.data.Result[0].name,
                email: result.data.Result[0].email,
                position: result.data.Result[0].position,
                salary: result.data.Result[0].salary,
                category_id: result.data.Result[0].category_id,
            })
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:4000/auth/edit_employee/'+Emp_Id, employee)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/employee')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }
    
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Employee</h3>
        <p className='text-danger'>* You can`t change Employee Id.</p>
        <form className="row g-1" onSubmit={handleSubmit}>

        <div className="col-12">
            <label for="Emp_Id" className="form-label">
              Employee Id
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="Emp_Id"
              placeholder="144"
              value={employee.Emp_Id}
              onChange={(e) =>
                setEmployee({ ...employee, Emp_Id: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className='col-12'>
            <label for="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              value={employee.salary}
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Position
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="Senior Developer"
              autoComplete="off"
              value={employee.position}
              onChange={(e) =>
                setEmployee({ ...employee, position: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="category" className="form-label">
              Department
            </label>
            <select name="category" id="category" className="form-select"
                onChange={(e) => setEmployee({...employee, category_id: e.target.value})}>
              {category.map((c) => {
                return <option value={c.id}>{c.name}</option>;
              })}
            </select>
          </div>
          
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditEmployee