import React, { useState, useEffect } from "react"; //hook
import "./App.css"; //styling sheet
import GenerateExcel from "./GenerateExcel"; //component

var jsonData = [];

const fetchData = () => {
  return fetch("https://gorest.co.in//public-api/users/")
    .then((response) => response.json())
    .then((data) => data.data.map((item) => {
      jsonData.push(item);
    }));
}

export const excelData = [];

const HomePageHeader = ({ item }) => {
  return (
    <header className="header">
      <h2>Hareesh's Grid</h2>
      <GenerateExcel pageValue={item} />
    </header>
  );
};

export const Tables = () => {
  const [name, setName] = useState(''); //hook
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [c_date, setC_date] = useState('');
  const [u_date, setU_date] = useState('');
  const [pageValue, setPageValue] = useState('');

  useEffect(() => {
    jsonData = [];
    fetchData();
  }, [name, email, gender, status, c_date, u_date, pageValue]);

  //Getting today's date and Storing It
  var today = new Date(),
    usedate = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();



  return (
    <>
      <HomePageHeader item={pageValue} />
      <h1>{name}</h1>
      <h1>{email}</h1>
      <h1>{gender}</h1>
      <h1>{status}</h1>
      <h1>{c_date}</h1>
      <h1>{u_date}</h1>
      <h3 className="h4">Total Users in Grid {excelData.length}</h3>
      <div className="stock-container">
        <div className="container">
          <Table
            id={"ID"}
            name={"NAME"}
            email={"EMAIL"}
            gender={"GENDER"}
            status={"STATUS"}
            created_at={"CREATED AT"}
            updated_at={"UPDATED AT"} />
        </div>
        <div className="container">
          <table>
            <tbody>
              <tr>{/* table row */}
                <td className="id"> {/* Table data */}
                  <h5>FILTER</h5>
                </td>
                <td className="name">
                  <form>
                    <input
                      type="text"
                      placeholder="Name"
                      pattern="[A-Za-z ]{1,50}"
                      title="Name should only contain letters. e.g. Aishu"
                      onChange={(e) => { setName(e.target.value); setEmail(); setC_date(); setGender(); setStatus(); setU_date(); }} />
                  </form>
                </td>
                <td className="email">
                  <form action="submit">
                    <input type="email" placeholder="E-Mail" onChange={(e) => { setName(); setEmail(e.target.value); setC_date(); setGender(); setStatus(); setU_date(); }} />
                  </form>
                </td>
                <td className="gender">
                  <p>
                    <form >
                      <label for="gender">Gender</label>
                      <select name="gender" id="gender" onChange={(e) => { setGender(e.target.value); setName(); setEmail(); setC_date(); setStatus(); setU_date(); }}>
                        <option value="">ALL</option>
                        <option value="Male">M</option>
                        <option value="Female">F</option>
                      </select>
                    </form>
                  </p>
                </td>
                <td className="status">
                  <p>
                    <form >
                      <label for="status">status</label>
                      <select name="status" id="status" onChange={(e) => { setGender(); setStatus(e.target.value); setName(); setEmail(); setC_date(); setU_date(); }}>
                        <option value="">ALL</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </form>
                  </p>
                </td>
                <td className="created_at">
                  <p>
                    <input type="date" max={usedate} onChange={(e) => { setC_date(e.target.value); setGender(); setStatus(); setName(); setEmail(); setU_date(); }} />
                  </p>
                </td>
                <td className="updated_at">
                  <p>
                    <input type="date" min={usedate} onChange={(e) => { setU_date(e.target.value); setC_date(); setGender(); setStatus(); setName(); setEmail(); }} />
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          {
            (!name && !email && !gender && !status && !c_date && !u_date) ?
              jsonData.map((val, index) => {
                while (excelData.length > 0) excelData.pop();
                for (let i = 0; i < jsonData.length && i < pageValue; i++) {
                  let ID = jsonData[i].id;
                  let NAME = jsonData[i].name;
                  let EMAIL = jsonData[i].email;
                  let GENDER = jsonData[i].gender;
                  let STATUS = jsonData[i].status;
                  let CREATED_DATE = jsonData[i].created_at;
                  let UPDATED_DATE = jsonData[i].updated_at;

                  excelData.push({ ID, NAME, EMAIL, GENDER, STATUS, CREATED_DATE, UPDATED_DATE });
                }
                if (index < excelData.length)
                  for (let i = 0; i < excelData.length; i++) {
                    return (
                      <div className="container">
                        <div key={index}>
                          <Table
                            key={index}
                            id={excelData[index].ID}
                            name={excelData[index].NAME}
                            email={excelData[index].EMAIL}
                            gender={excelData[index].GENDER}
                            status={excelData[index].STATUS}
                            created_at={excelData[index].CREATED_DATE}
                            updated_at={excelData[index].UPDATED_DATE} />
                        </div>
                      </div>
                    );
                  }
              }
              )
              :
              jsonData.map((val, index) => {
                while (excelData.length > 0) excelData.pop();
                for (let i = 0; i < jsonData.length; i++) {
                  let ID, NAME, EMAIL, GENDER, STATUS, CREATED_DATE, UPDATED_DATE;
                  if (name && jsonData[i].name === name) {
                    ID = jsonData[i].id;
                    NAME = jsonData[i].name;
                    EMAIL = jsonData[i].email;
                    GENDER = jsonData[i].gender;
                    STATUS = jsonData[i].status;
                    CREATED_DATE = jsonData[i].created_at;
                    UPDATED_DATE = jsonData[i].updated_at;

                    excelData.push({ ID, NAME, EMAIL, GENDER, STATUS, CREATED_DATE, UPDATED_DATE });

                  } else if (email && jsonData[i].email === email) {
                    ID = jsonData[i].id;
                    NAME = jsonData[i].name;
                    EMAIL = jsonData[i].email;
                    GENDER = jsonData[i].gender;
                    STATUS = jsonData[i].status;
                    CREATED_DATE = jsonData[i].created_at;
                    UPDATED_DATE = jsonData[i].updated_at;
                    excelData.push({ ID, NAME, EMAIL, GENDER, STATUS, CREATED_DATE, UPDATED_DATE });

                  } else if (gender && jsonData[i].gender === gender) {
                    ID = jsonData[i].id;
                    NAME = jsonData[i].name;
                    EMAIL = jsonData[i].email;
                    GENDER = jsonData[i].gender;
                    STATUS = jsonData[i].status;
                    CREATED_DATE = jsonData[i].created_at;
                    UPDATED_DATE = jsonData[i].updated_at;
                    excelData.push({ ID, NAME, EMAIL, GENDER, STATUS, CREATED_DATE, UPDATED_DATE });

                  } else if (status && jsonData[i].status === status) {
                    ID = jsonData[i].id;
                    NAME = jsonData[i].name;
                    EMAIL = jsonData[i].email;
                    GENDER = jsonData[i].gender;
                    STATUS = jsonData[i].status;
                    CREATED_DATE = jsonData[i].created_at;
                    UPDATED_DATE = jsonData[i].updated_at;
                    excelData.push({ ID, NAME, EMAIL, GENDER, STATUS, CREATED_DATE, UPDATED_DATE });

                  } else if (c_date) {
                    var myDate = jsonData[i].created_at.slice(0, 10)
                    myDate = myDate.slice(0, 4) + "-" + myDate.slice(5, 7) + "-" + myDate.slice(8, 10);
                    if (myDate === c_date) {
                      ID = jsonData[i].id;
                      NAME = jsonData[i].name;
                      EMAIL = jsonData[i].email;
                      GENDER = jsonData[i].gender;
                      STATUS = jsonData[i].status;
                      CREATED_DATE = jsonData[i].created_at;
                      UPDATED_DATE = jsonData[i].updated_at;
                      excelData.push({ ID, NAME, EMAIL, GENDER, STATUS, CREATED_DATE, UPDATED_DATE });

                    }
                  } else if (u_date) {
                    var myDate2 = jsonData[i].updated_at.slice(0, 10)
                    myDate2 = myDate2.slice(0, 4) + "-" + myDate2.slice(5, 7) + "-" + myDate2.slice(8, 10);
                    if (myDate2 === u_date) {
                      ID = jsonData[i].id;
                      NAME = jsonData[i].name;
                      EMAIL = jsonData[i].email;
                      GENDER = jsonData[i].gender;
                      STATUS = jsonData[i].status;
                      CREATED_DATE = jsonData[i].created_at;
                      UPDATED_DATE = jsonData[i].updated_at;
                      excelData.push({ ID, NAME, EMAIL, GENDER, STATUS, CREATED_DATE, UPDATED_DATE });

                    }
                  }
                }
                if (index < excelData.length && index < pageValue) {
                  return (
                    <div className="container">
                      <div key={index}>
                        <Table
                          key={index}
                          id={excelData[index].ID}
                          name={excelData[index].NAME}
                          email={excelData[index].EMAIL}
                          gender={excelData[index].GENDER}
                          status={excelData[index].STATUS}
                          created_at={excelData[index].CREATED_DATE}
                          updated_at={excelData[index].UPDATED_DATE} />
                      </div>
                    </div>
                  );
                }

              })}
        </div>

      </div>
      <div className="pagination">
        <form >
          <label for="pages">Show Per Page&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <select name="pages" id="pages" onChange={(e) => { setPageValue(e.target.value); }} >
            <option value="0" >0</option>
            <option value="1" >1</option>
            <option value="3" >3</option>
            <option value="5" >5</option>
            <option value="999999" >ALL</option>
          </select>
          <label for="pages">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Records</label>
        </form>
      </div>
    </>
  );
}


const Table = ({ id, name, email, gender, status, created_at, updated_at }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td className="id">
            <h4>{id}</h4>
          </td>
          <td className="name">
            <h4>{name}</h4>
          </td>
          <td className="email">
            <h4>{email}</h4>
          </td>
          <td className="gender">
            <h4>{gender}</h4>
          </td>
          <td className="status">
            <h4>{status}</h4>
          </td>
          <td className="created_at">
            <h4>{created_at}</h4>
          </td>
          <td className="updated_at">
            <h4>{updated_at}</h4>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
