import React from 'react'

const DevicesBtn = ({ img, txt }) => {
    return (
        <button className='p-2 m-2 font-semibold text-base '>
            <img src={img} alt="" />
            {txt}
        </button>
    )
}

export default DevicesBtn