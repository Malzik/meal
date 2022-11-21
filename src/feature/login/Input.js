import React from "react";

export const Input = (props) => {
    return (
        <div className='flex flex-row-reverse border border-b-2 border-b-[#58a4b0] my-[20px] align-middle'>
            <input type={props.type} name={props.name} placeholder={props.placeholder} required value={props.value}
                   onChange={e => props.onChange(e.target.value)} autoComplete='false'
                   className={"px-2 pt-3 bg-transparent w-full outline-none border-none border-0"}/>
            <label htmlFor={props.name} className={"mt-auto mb-1 ml-1"}>{props.icon}</label>
        </div>
    )
}
