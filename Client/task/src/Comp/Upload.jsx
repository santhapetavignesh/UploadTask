import React from "react";
import Axios  from "axios";
function Upload(){
    let [val,setVal]=React.useState('')
    let [data,setData]=React.useState([])
    let [showModal, setShowModal] = React.useState(false);
  // console.log(val)
  console.log(data)
  let uploadfile=(e)=>{
      const file=e.target.files[0]
      if(file){
        if(file.type==='application/vnd.ms-excel'|| file.type==='text/csv' || file.type==='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
          console.log('file type is valid',file.name)
          setVal(file)
        }
      }
      else{
        console.error('file is not a excel')
      }
  }
  let uploadHandler=()=>{
  const formData = new FormData();
    formData.append('myfile', val, val.name);
    const url = 'http://localhost:4000/upload';
    Axios.post(url, formData);
  }
  let previewHandler=()=>{
    let url='http://localhost:4000/user'
    Axios.get(url)
    .then((resp)=>{
        setData(
            resp.data.data[0].sheets.Sheet1
        )
    })
    .catch((err)=>{
        if (err) throw err
    })
    setShowModal(true)
  }
  
  return   <div className="">
      <div className="mt-6 ml-5 flex space-y-2 flex-col">
        <input className="block  w-56  text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" onChange={uploadfile}type='file' accept='application/vnd.ms-excel,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' />
        
        <button
        className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-20"
        type="button"
        onClick={previewHandler }
      >
        Preview
      </button>
      </div>
       {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                {
            Object.keys(data).length>0?<table className=" w-90 text-sm text-left text-blue-100 dark:text-blue-100">
            <thead className="text-xs text-black uppercase bg-green-600 border border-black dark:text-white">
                <tr>
                    <th className="px-6 py-3 border border-black">ID</th>
                    <th className="px-6 py-3 border border-black">Name</th>
                    <th className="px-6 py-3 border border-black">Age</th>
                </tr>
            </thead>
            <tbody className="bg-white border border-black dark:bg-gray-9000 dark:border-gray-900 ">
                {
                    data.map(({id,name,age})=>{
                        return <tr>
                            <td className="px-6 py-3  text-black border border-black" >{id}</td>
                            <td className="px-6 py-3  text-black border border-black">{name}</td>
                            <td className="px-6 py-3  text-black border border-black">{age}</td>
                        </tr>

                    })
                }
            </tbody>
        </table>:null
        }
                </div>
                
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                <button className="text-white  bg-green-700 hover:bg-green-800  w-20 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm  py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={uploadHandler}>Submit</button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
        
    
</div>
    
}

export default Upload
