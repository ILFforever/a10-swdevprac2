'use client';

import styles from './banner.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Banner() {
    const router = useRouter();
    const covers = ['/img/cover.jpg', '/img/cover2.jpg', '/img/cover3.jpg','/img/cover4.jpg'];
    const [index, setIndex] = useState(0);
    const {data:session} = useSession()
    console.log(session?.user.token)

    const handleBannerClick = () => {
        setIndex((prevIndex) => (prevIndex + 1) % covers.length);
    };

    return (
        <div className={styles.banner} onClick={handleBannerClick}>
            <Image 
                src={covers[index]}
                alt="cover"
                fill={true}
                objectFit='cover'
            />
            <div className={`${styles.bannerText} bg-black bg-opacity-40 p-4 rounded-lg`}>
                <h1 className='text-4xl font-medium text-white'>where every event finds its venue</h1>
                <h3 className='text-xl font-serif text-white'>Perfect Spaces, Memorable Moments - Your Event Journey Starts Here</h3>
            </div>
            {
                session? <div className='z-30 absolute top-5 right-10 font-semibold text-white-800 text-xl'>
                    Hello {session.user?.name}</div>:null
            }
                <button 
                    className="bg-white text-cyan-600 border border-cyan-600 font-semibold py-2 px-2 m-2 rounded z-30 absolute bottom-0 right-0 
                              hover:bg-cyan-600 hover:text-white hover:border-transparent"
                    onClick={(e) => {
                        e.stopPropagation();  // Prevent banner image changing
                        router.push('/venue');
                    }}>
                    Select Your Venue NOW
                </button>
            </div>
    );
}