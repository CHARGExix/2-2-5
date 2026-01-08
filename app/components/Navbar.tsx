import Link from 'next/link';
import clsx from 'clsx'; // Good practice to use if classes get complex, though straightforward here

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
            <div className="text-2xl font-bold tracking-tighter uppercase font-sans">
                BURGER<span className="text-red-500">.</span>
            </div>

            <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
                <Link href="#" className="hover:text-neutral-400 transition-colors">MENU</Link>
                <Link href="#" className="hover:text-neutral-400 transition-colors">LOCATIONS</Link>
                <Link href="#" className="hover:text-neutral-400 transition-colors">OUR STORY</Link>
            </div>

            <button className="px-5 py-2 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                Order Now
            </button>
        </nav>
    );
};

export default Navbar;
