import { useRef, useState } from "react"

function App() {
  var fname = useRef();
  var lname = useRef();
  var sal = useRef();
  var inc = useRef();
  var arr = [];
  var [tbody, setTbody] = useState([])

  let getData = ((event) => {
    event.preventDefault();
    var f_name = fname.current.value;
    var l_name = lname.current.value;
    var salary = parseInt(sal.current.value);
    var incentive = parseInt(inc.current.value);

    var obj = { f_name, l_name, salary, incentive };
    var resp = arr.push(obj)

    setTbody((preData) => [...preData, obj])
    clearField();
  })
  var clearField = () => {
    var f_name = fname.current.value = "";
    var l_name = lname.current.value = "";
    var salary = sal.current.value = "";
    var incentive = inc.current.value = "";
  }

  return (
    <div className="container p2">
      <br />
      <form className="form-group" onSubmit={getData}>
        <div className="">
          <label className="form-label ">First Name :</label>
          <input type="text" ref={fname} className="form-control" />
        </div><br />
        <div className="mb-3">
          <label className="form-lable">Last Name :</label>
          <input type="text" ref={lname} className="form-control" />
        </div><br />
        <div className="mb-3">
          <label className="form-lable">Salary :</label>
          <input type="text" ref={sal} className="form-control" />
        </div><br />
        <div className="mb-3">
          <label className="form-lable">Incentive :</label>
          <input type="text" ref={inc} className="form-control" />
        </div><br />
        <button type="submit" className="btn btn-success mt-3">Submit</button>
      </form>
      <div className="container">
        <table className="table">
          <thead>
            <th>S.No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Salary</th>
            <th>Incentive</th>
            <th>Total Salary</th>
          </thead>
          <tbody>
            {tbody.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.f_name}</td>
                <td>{data.l_name}</td>
                <td>{data.salary}</td>
                <td>{data.incentive}</td>
                <td>{data.salary + data.incentive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App;