import { appleImg, bagImg, searchImg  } from '../utils'
import { navLists } from '../constants';

function Navbar() {
  return (
    <header className='w-full py-5 px-5 sm:px-10 flex justify-between items-center'>
      <nav className='flex w-full screen-max-width'>
        <img src={appleImg} alt='apple' width={18} height={18} />
        
        <div className='flex flex-1 justify-center max-sm:hidden'>
          {navLists.map((item, _) => (
            <div key={item} className='px-5 text-sm cursor-pointer text-gray hover:text-white transition-all'>
              {item}
            </div>
        ))}
        </div>
        
        <div className='flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1'>
          <img src={searchImg} alt="Search" width={18} height={18} />
          <img src={bagImg} alt="Search" width={18} height={18} />
        </div>
      </nav>
    </header>
  )
}

export default Navbar;