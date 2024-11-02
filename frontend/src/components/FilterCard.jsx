import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi", "NCR", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Delhi", "NCR", "Pune", "Mumbai"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakhs", "1Lakh", "1-5Lakhs"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const dispatch = useDispatch()
    const changeHandler = (value) => {
        setSelectedValue(value)
    }

    useEffect(() => {
        dispatch(setSearchQuery(selectedValue));
    }, [selectedValue])

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filtered jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((data, index) =>
                        <div>
                            <h1 className='font-bold text-lg'>{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index} - ${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard