import Link from 'next/link';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const Header:React.FC = () => {
  return (
    <header className="p-3 mb-3 border-bottom bg-dark">
      <nav className='nav justify-content-left'>
            <Link href="/" className='nav-link px-4 fs-5 text-yellow'>Home</Link>
        
            <DropdownButton id="dropdown-basic-button" title="Overviews" className='nav-link px-4 fs-5'>
                <Dropdown.Item><Link href="/planet/overview" className='nav-link px-4 fs-5 text-black'>Planet Overview</Link></Dropdown.Item>
                <Dropdown.Item><Link href="/satellite/overview" className='nav-link px-4 fs-5 text-black'>Satellite Overview</Link></Dropdown.Item>
                <Dropdown.Item><Link href="/resource/overview" className='nav-link px-4 fs-5 text-black'>Resource Overview</Link></Dropdown.Item>
                <Dropdown.Item><Link href="/account/overview" className='nav-link px-4 fs-5 text-black'>Account Overview</Link></Dropdown.Item>
            </DropdownButton>

            <DropdownButton id="dropdown-basic-button" title="Add" className='nav-link px-4 fs-5'>
                <Dropdown.Item><Link href="/planet/add" className='nav-link px-4 fs-5 text-black'>Planet Add</Link></Dropdown.Item>
                <Dropdown.Item><Link href="/account/add" className='nav-link px-4 fs-5 text-black'>Account Add</Link></Dropdown.Item>
            </DropdownButton>
            <Link href="/account/login" className='nav-link px-4 fs-5 text-yellow'>Login</Link>
      </nav>
    </header>
  );
}

export default Header;
