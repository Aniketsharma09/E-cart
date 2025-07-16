import github from '../images/github.png'
import linkdin from '../images/linkdin.png'
import insta from '../images/instagram.png'
const Footer = () => {
  return (
    <div className='footer px-5 py-7 h-70 w-full bg-[var(--nav)] flex flex-col items-center justify-center gap-5 '>
        <h1 className="text-3xl font-fascinate text-[var(--text-h)] ">E-Cart</h1>
        <div className='footerDetail w-[40%] flex justify-between '>
            <h3 className='text-md capitalize text-[var(--text-p)] font-md '>about</h3>
            <h3 className=' text-md capitalize text-[var(--text-p)] font-md '>contect</h3>
            <h3 className='text-md capitalize text-[var(--text-p)] font-md '>terms and service</h3>
            <h3 className='text-md capitalize text-[var(--text-p)] font-md '>privacy policy</h3>
        </div>
        <div className='footerIcons w-[15%] flex justify-between'>
            <img onClick={() => window.open("https://www.linkedin.com/in/aniketsharma09", "_blank")} className='w-9 hover:scale-105 active:scale-100' src={linkdin}/>
            <img onClick={() => window.open("https://github.com/Aniketsharma09", "_blank")} className='w-9 hover:scale-105 active:scale-100' src={github}/>
            <img onClick={() => window.open("https://www.instagram.com/aniket_shar09?igsh=MW9xcHNvajFxbTZhYQ==", "_blank")} className='w-9 hover:scale-105 active:scale-100' src={insta}/>
        </div>
        <h2 className='text-md text-[var(--text-p)] '>© 2025 Made By Aniket, All right reserved</h2>
    </div>
  )
}

export default Footer