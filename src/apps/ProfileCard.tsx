import React from 'react'
import dp from "./../assets/DP.jpeg"

const ProfileCard: React.FC = () => {
    return (
        <div>
            <div className='h-screen center justify-center'>
                <div className='bg-white w-96 h-[500px] flex items-center p-2 font-bold flex-col gap-12 rounded-lg'>
                    <div> <h3>Profile Card</h3>
                    </div>
                    <div><img src={dp} alt="profile picture" className='w-44 rounded-lg'/></div>
                    <div>Kislay Raj</div>
                    
                    <div className='px-8 text-center'>Hello, My name is Kislay Raj, Im am studying in MCA and currently giving Final External Exam.</div>
                    </div>


            </div>
        </div>
    )
}

export default ProfileCard;
