import React, { useState } from "react";
import { useQuery } from "react-apollo";
import customComponentTest from "./graphql/customComponentTest.graphql"
export default function CustomComponent() {
    const [dataCount, setDataCount] = useState(1)
    const [pageNo,setPageNo] =useState(0)

    const { data } = useQuery(customComponentTest, {
        variables: {
            acronym: "JP",
            fields: ["name", "email", "subject"],
            page: `${dataCount}`,
            where: '',
            pageSize: 5,
            schema: "jprakashForm"
        },
                ssr: false

    }
    );
 
    const showMore = async () => {
    
        if(data?.documents.length >0){
        setDataCount(dataCount + 1)
        setPageNo(pageNo+1)
        }
         }
    const showLess = () => {
        if (dataCount > 1) {

            setDataCount(dataCount - 1)
            setPageNo(pageNo-1)

        }
    }


    return (
        <div className=" ma5 bg-white fw6 black flex flex-column items-center">
            <h3  className="flex justify-center">Custom component </h3>
            <table className=" tc w-80">
                <thead className="fw6">
                    <tr>
                        <th className="ba">Name</th>
                        <th className="ba">Email</th>
                        <th className="ba">Subject</th>
                    </tr>
                </thead>
                <tbody >
                    {data?.documents?.length > 0 ?(
                   data?.documents?.map((item: any, index: any) => {

                        return (
                            <tr key={index}>
                                {item.fields?.map((item: any, index: number) => (

                                    item.key != 'id' && (

                                        <td key={index} className=" ba" >{item.value}</td>

                                    )
                                ))}
                            </tr>
                        )
                    })
              ):(
                <tr>
                <td colSpan={4} className="tc">
                  <h3>No data found</h3>
                </td>
              </tr>
              )  }
                </tbody>
            </table>


        <div className="flex justify-center w-80 mt2">
        <button onClick={showLess}disabled={dataCount <= 1} className={`${dataCount <= 1 ?"":"bg-blue white"}`}>Previous</button>
       <div> <span className="f5 lh-copy ml2 mr2">{pageNo+1}</span></div>
            <button   className={`${data?.documents?.length === 0||data?.documents?.length!==5?"":"bg-blue white"}`}   onClick={showMore}disabled={data?.documents?.length === 0 || data?.documents?.length!==5}>next</button>
        </div>
        </div>
    );
}
