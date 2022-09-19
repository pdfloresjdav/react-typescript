import React, { useState, useEffect, KeyboardEvent, MouseEvent } from 'react';
// call functionality to get data from json file in public data folder 
import {GetData} from '../controllers/Data';
// TypeScript interface
export interface Props {
    id: number;
    name: string;
    desc: string;
    url: string;
}
// main functional component 
export const Main = () => {
    const [leaders, setLeaders] = useState([] as Props[]);
    const [data, setData] = useState([] as Props[]);
    const [message, setMessage] = useState('' as string | null | undefined);
    let getDataInit = async () => {return await GetData();};
    //first load to get data from json file and set into data and leaders variables
    useEffect(() => {
        getDataInit().then(function(myJson) {
        setData(myJson);
        setLeaders(myJson);
        });
    }, []);
    // Render information as td element
    const renderLeader = (data: Props) => {
        const id = `${data.id}`
        return (<tr key={data.id} id={id} onClick={handleClick}>
            <td className='td-center name'>{data.name}</td>
            <td className='td-center'>{data.desc}</td>
            <td className='td-center'>{data.url}</td>
        </tr>)
    };
    // handle key change for search data from json 
    const handleChange = (event: KeyboardEvent)=>{
        let find = data.filter((el)=>{
            let filter = document.getElementById("filter") as HTMLInputElement | null;
            let value = filter?.value as string;
            let a = el.name;
            if(a.includes(value)){
                return el;   
            }
            return false;
            }
            );
        setLeaders(find);
    };
    // handle click element into td table
    const handleClick = (event: MouseEvent)=>{
        let a = event.currentTarget.firstChild
        let msn = a?.textContent
         setMessage(msn);
    };

    return (
        <>
            <h2>Selected: {message}</h2>
            {/* autocomplete to search data from json file */}
            <div className="input-group" style={{width: "300px",margin: "auto" }}>
                <span className="input-group-addon">Autocomplete</span>
                <input type="text" id="filter" onKeyUp={handleChange} defaultValue="" className="form-control"/>
            </div>
            
            <table className="table table-hover table-striped" style={{width: "500px",margin: "auto",border: "3px solid gree"}}>
                
                    <thead>
                        <tr>
                            <th className='td-center'>Name</th>
                            <th className='td-center'>Desc</th>
                            <th className='td-center'>URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaders && leaders.map((l: Props)=>renderLeader(l))}
                    </tbody>
            </table>
        </>
    )
};