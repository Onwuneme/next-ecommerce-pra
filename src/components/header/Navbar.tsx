import Link from 'next/link';
import Menu from './Menu';

export default function Navbar() {
  return (
    <div className='p-5  flex justify-between items-center'>
      <Link href={'/'} className='text-xl'>header</Link> 
      <Menu />
    </div>
  );
}
