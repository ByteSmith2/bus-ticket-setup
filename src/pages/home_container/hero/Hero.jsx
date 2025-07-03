import React from 'react'
import Bus5 from '../../../assets/bus5.png'
import { motion } from 'framer-motion'
import { Link } from "react-router-dom";
const Hero = () => {
  const imageVariants = {
    initial: { opacity: 0, y: -10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'linear',
        delay: 0.2
      }
    }
  }

  return (
    <div className='w-full h-[calc(100vh-8ch)] lg:px-28 md:px-16 sm:px-7 px-4 flex items-center justify-center flex-col hero relative text-center'>
      <div className="flex-1 w-full flex items-stretch justify-between gap-10 relative z-10">
        {/* Text Section */}
        <motion.div
          className="w-[45%] h-auto rounded-md flex justify-center flex-col space-y-14"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'linear', delay: 0.2 }}
        >
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'linear', delay: 0.2 }}
          >
            <motion.h1
              className="text-7xl font-bold text-neutral-50 leading-[1.15]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'linear', delay: 0.2 }}
            >
              Reserve Your Bus{' '}
              <span className='text-violet-400 tracking-wider'>Tickets</span>{' '}
              Now
            </motion.h1>
            <motion.p
              className="text-lg font-normal text-neutral-300 line-clamp-3 text-ellipsis"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: 'linear', delay: 0.6 }}
            >
              Find and book your bus tickets with just a few clicks. Enjoy a seamless travel experience with our user-friendly platform, offering real-time availability and secure payment options.
            </motion.p>
          </motion.div>

          <motion.div>
            <Link to="/Booking">
            <motion.button className='w-fit bg-violet-700 hover:bg-violet-800 text-neutral-50 font-medium py-3 px-6 rounded-md ease-in-out duration-300' >
              Reserve Seat Now
            </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="w-[55%] h-full flex items-end justify-end"
          initial="initial"
          animate="animate"
          variants={imageVariants}
        >
          <img
            src={Bus5}
            alt="bus"
            className="w-full max-w-[600px] object-contain"
          />
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
