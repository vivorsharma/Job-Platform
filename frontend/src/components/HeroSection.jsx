import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {

    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const searchJobHandler = () => {
        dispatch(setSearchQuery(query))
        navigate("/browse")
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='px-4 py-2 rounded-full bg-ray-100 text-[#f83022] font-medium'>No, 1 job Hunt Website </span>
                <h1 className='text-5xl font-bold'>Search Apply & <br /> Get Your <span className='text-[#6A3bC2]'>Dream Job</span></h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam sed eligendi voluptatem nostrum beatae. Vitae quasi quas quae eveniet numquam non cum pariatur omnis repellendus ab? Cum quos modi fugiat.</p>
                <div className='flex w-[40%] shadow-lg border-ray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type='text'
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full'
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
                        <Search className='h-5 m-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection