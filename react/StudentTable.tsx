import React,{useState,useEffect} from 'react';

const StudentTable: StorefrontFunctionComponent =  () => {
  interface studentProps{
    firstname:string,
    secondname:string,
    subject:string,
    age:number

  }

  const [displayData,setDisplayData]=useState<studentProps[]>();

    const formData = async () => {
    const data = await fetch("/v1/student");
    const result =await data.json()
    setDisplayData(result)
  }
useEffect(()=>{
formData()
},[])

  return (
    <div>
      <div className='ht4 w-100 flex justify-center'>
<h3>Service api GET and POST</h3>
      </div>
      <table className="f6 w-100 mw8 white center ba" cellSpacing="0" style={{backgroundColor: 'navy' }}>
        <thead>
          <tr>
            <th className="fw6 pa3 ba">First Name</th>
            <th className="fw6 pa3 ba">Second Name</th>
            <th className="fw6 pa3 ba">Age</th>
            <th className="fw6 pa3 ba">Subject</th>
          </tr>
        </thead>
        <tbody className="">
          {displayData?.map((student:any) => (
             <tr key={student.id}>
              <td className="pa3 tc ba">{student.firstname}</td>
              <td className="pa3 tc ba">{student.secondname}</td>
              <td className="pa3 tc ba">{student.age}</td>
              <td className="pa3 tc ba">{student.subject}</td>
            </tr> 
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default StudentTable;
