import React, {useEffect, useState} from "react";
import moment from "moment";

export const DaySlider = ({selectedDay, setSelectedDay}) => {
    const [days, setDays] = useState([])

    useEffect(() => {
        setDays([])
        const date =  moment().subtract(4, 'days')
        for (let i = 0; i < 19; i++) {
            setDays(oldArray => [...oldArray,date.add(1, 'days').format('DD-MM')])
        }
    }, [])

    const isToday = day => selectedDay === day

    return (
        <div className={"flex overflow-x-auto gap-4 flex-nowrap "} style={{ whiteSpace: "nowrap"}}>
            {
                days.map(day =>
                    <div key={day} onClick={() => setSelectedDay(day)}
                         className={isToday(day) ?
                             "bg-[#ffaf64] p-1 rounded-lg text-white cursor-pointer inline-block"
                             : "p-1 rounded-lg cursor-pointer inline-block"}>{day}</div>
                )
            }
        </div>
    )
}
