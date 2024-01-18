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
console.log(displayData);

  return (
    <div>
      <div className='ht4 w-100 flex justify-center'>
<h3>Node Service</h3>
      </div>
      <table className="f6 w-100 mw8 white center ba" cellSpacing="0" style={{backgroundColor: 'navy' }}>
        <thead>
          <tr>
            <th className="fw6 pa3 ba">Name</th>
            <th className="fw6 pa3 ba">Email</th>
            <th className="fw6 pa3 ba">Subject</th>
          </tr>
        </thead>
        <tbody >
          {displayData?.map((student:any) => (
             <tr key={student.id}>
              <td className="pa3 tc ba">{student.name}</td>
              <td className="pa3 tc ba">{student.email}</td>
              <td className="pa3 tc ba">{student.subject}</td>
            </tr> 
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default StudentTable;