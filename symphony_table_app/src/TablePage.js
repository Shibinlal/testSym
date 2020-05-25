import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

const TablePage = () => {
  const [file, setFile] = useState("");
  //   const [uploadedFile, setUploadedFile] = useState({});
  const [filename, setFilename] = useState("Choose File");
  const [tableData, setTableData] = useState([
    {
      name: "Jim Smith",
      address: "123 Any Street|Boston",
      country: "US",
      pin: "02134",
    },
    {
      name: "Jane Lee",
      address: "248 Another St.|Boston",
      country: "US",
      pin: "02130",
    },
  ]);
  const [lines, setLines] = useState(2);

  //   const getTableData = (data) => {
  //     return data.data.split("");
  //   };
  //Jim Smith|123 Any Street|Boston|US|02134
  //Jane Lee|248 Another St.|Boston|US|02130
  const delimFilter = (e) => {
    //e.stopPropagation();
    e.preventDefault();
    // e.nativeEvent.stopImmediatePropagation();
    setTableData((data) => data.split(e.target.value));
  };
  const numberFilter = (e) => {
    e.preventDefault();
    e.target.value == 0 ? setLines(2) : setLines(e.target.value);
  };
  const onFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  const onSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      debugger;
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      alert("ss");
      //setTableData(res.data.split("")); //getTableData(res.data);
      //console.log(tableData);
    } catch (err) {
      debugger;
      console.log("error");
      if (err.response.status === 500) {
        // setMessage("There was a problem with the server");
      } else {
        // setMessage(err.response.data.msg);
      }
    }
  };
  //   const upload = () => {};
  return (
    <div>
      <Fragment>
        <span>
          <form>
            <input type="file" id="customFile" onChange={onFileChange} />
            <button type="button" onClick={onSubmit}>
              Upload file
            </button>
          </form>
        </span>
      </Fragment>

      {/* <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input type="file" id="customFile" onChange={onChange} />
          <label>{filename}</label>
        </div>
        <input type="submit" value="Upload" />
      </form> */}
      <Fragment>
        <div>
          {tableData && (
            <div>
              <h3>Generated table</h3>
              <div className="filter_wrap">
                <span>
                  Delimiter:
                  <input onChange={delimFilter} />
                </span>
                <span>
                  Lines:
                  <input onChange={numberFilter} />
                </span>
              </div>

              {tableData.map((item, index) => (
                <div className="table_wrap">
                  <ul className="table_container">
                    {index + 1 <= lines && (
                      <li key={index}>
                        <span>{item.name}</span>
                        <span>{item.address}</span>
                        <span>{item.country}</span>
                        <span>{item.pin}</span>
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </Fragment>
    </div>
  );
};

export default TablePage;
