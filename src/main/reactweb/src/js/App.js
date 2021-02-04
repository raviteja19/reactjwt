import React, { useState, useEffect } from "react";
import { resdata, getCookie } from "./module/Helper";
import Axios from "axios";

const App = (props) => {
  const [currpage, setCurrpage] = useState(1);
  const [noofpage, setNoOfPage] = useState(1);
  const [noofitems,setNoOfItems]=useState(0);
  
  const [orgdata,setOrgData]=useState([]);
    const [copydata,setCopyData]=useState([]);
  const [pageno, setPageno] = useState();
  const [filterval, setFilterVal] = useState("");
  let timerout;
  const [response, setResponse] = useState([]);
  // const orgdata = resdata;
  // const copydata=[...resdata];
  useState(() => {
    getListData();
    // let fildata = orgdata.filter((item) => item.userId == currpage);
    // setResponse(fildata);
    // let no = Math.floor(orgdata.length / 10);
    // no == 0 ? setNoOfPage(1) : setNoOfPage(no);
    // setNoOfItems(orgdata.length);

    return () => {};
  }, []);

  function FilterByPage(pageno, currdata) {
    console.log(currdata.length);
    let data = currdata.filter((item, i) => Math.ceil((i + 1) / 10) == pageno);
    setResponse(data);
  }

  const changePage = (evt) => {
    evt.preventDefault();
    if (pageno != "" && pageno <= noofpage) {
      setCurrpage(pageno);
      FilterByPage(pageno, orgdata);
    }
  };

  const filterTitel = (e) => {
    e.preventDefault();
    let val = e.target.value;
    let timerout;

    let data;

    if (timerout) {
      clearTimeout(timerout);
    } else {
      console.log(e);
      timerout = setTimeout(
        function () {
          data = copydata.filter((item) => item.title.indexOf(val) != -1);
          setNoOfItems(data.length);
          if (data.length > 10) {
            FilterByPage(1, data);
          } else {
            setResponse(data);
          }
         
          setCurrpage(1);
          setPageno(1);

          let no = Math.floor(data.length / 10);
          no == 0 ? setNoOfPage(1) : setNoOfPage(no+1);
        setOrgData(data);
          console.log("my no"+no,data.length);
        }.bind(this),
        1000
      );
    }
  };

  function getListData() {
    const token = "Bearer " + getCookie("mytoken");
    Axios.get("/getdata", { Authorization: token })
      .then((res) => {
        let data = res.data;
        setOrgData(data);
        setCopyData(data);
        FilterByPage(currpage,data);
        setNoOfItems(data.length);
        let no = Math.floor(res.data.length / 10);
        no == 0 ? setNoOfPage(1) : setNoOfPage(no);
      })
      .catch((err) => {});
  }

  const nextPage = (e) => {
    e.preventDefault();
    let id = e.target.id;
    let val = parseInt(currpage);

    if (id == "prev" && currpage != 1) {
      FilterByPage(val - 1, orgdata);
      setCurrpage(val - 1);
    }

    if (id == "next" && currpage != noofpage) {
      FilterByPage(val + 1, orgdata);
      setCurrpage(val + 1);
    }
  };

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <label className="mr-10">Filter row as per Title</label>
        <input
          id="date"
          type="text"
          style={{ marginLeft: "5px" }}
          onChange={filterTitel}
        />
      </section>
      <div className="layout-row align-items-center justify-content-center">
        <div className="card mt-50">
          <table className="table">
            <thead>
              <tr className="table">
                <th className="table-header">No</th>
                <th className="table-header">User Id</th>
                <th className="table-header">Title</th>
                <th className="table-header">Description</th>
              </tr>
            </thead>
            <tbody>
              {response.map((data, i) => {
                return (
                  <tr key={data.id + "-" + i}>
                    <td>{data.userId}</td>
                    <td>{data.id}</td>
                    <td>
                      <div style={{ display: "flex" }}>{data.title}</div>
                    </td>
                    <td>
                      <div style={{ display: "flex" }}>{data.body}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="paginations">
            <label>Page</label>
            <form onSubmit={changePage}>
              <input
                type="text"
                id="pageno"
                value={pageno}
                style={{ width: "35px", marginLeft: "5px", marginRight: "5px" }}
                onChange={(e) => setPageno(e.target.value)}
                maxLength="2"
              ></input>
            </form>
            <label>
              {" "}
              of {noofpage} ({currpage==1?1:((currpage-1)*10+1)}-{currpage*10>noofitems?noofitems:currpage*10} of {noofitems} items)
            </label>
            <button
              className="small"
              style={{ marginLeft: "5px" }}
              id="prev"
              onClick={nextPage}
            >
              Previous
            </button>
            <div className="" style={{ padding: "5px" }}>
              {currpage}
            </div>
            <button
              className="small"
              style={{ marginRight: "5px" }}
              id="next"
              onClick={nextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
