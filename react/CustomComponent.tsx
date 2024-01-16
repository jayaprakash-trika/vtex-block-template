import React, { useState } from "react";
import { useQuery } from "react-apollo";
import customComponentTest from "./graphql/customComponentTest.graphql"
export default function CustomComponent() {
    const [dataCount, setDataCount] = useState(1)
    

    const { data } = useQuery(customComponentTest, {
        variables: {
            acronym: "JS",
            fields: ["firstname", "secondname", "subject", "age"],
            page: `${dataCount}`,
            where: '',
            pageSize: 10,
            schema: "jprakashForm"
        },
                ssr: false

    }
    );

console.log("array length",data?.documents.length)

    const showMore = async () => {
    
        if(data?.documents.length >0){
        setDataCount(dataCount + 1)
        }
         }
    const showLess = () => {
        if (dataCount > 1) {
            setDataCount(dataCount - 1)
        }
    }
console.log(data)


    return (
        <div className="w-100 ma5 bg-red fw6 white">
            <h3  className="flex justify-center">Custom component API</h3>

            <table className=" bt bl tc w-80">
                <thead className="fw6">
                    <tr>
                        <th className="bb br">First Name</th>
                        <th className="bb br">Second Name</th>
                        <th className="bb br">Subject</th>
                        <th className="bb br">Age</th>
                    </tr>
                </thead>
                <tbody >
                    {data?.documents?.length > 0 ?(
                   data?.documents?.map((item: any, index: any) => {

                        return (
                            <tr key={index}>
                                {item.fields?.map((item: any, index: number) => (

                                    item.key != 'id' && (

                                        <td key={index} className="bb br" >{item.value}</td>

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


        <div className="flex justify-center w-80">
        <button onClick={showLess}>less</button>
            <button onClick={showMore}>see more</button>
        </div>
        </div>
    );
}











