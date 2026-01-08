const Footer = () => {
    return (
        <footer className="bg-neutral-950 text-neutral-400 py-12 px-6 border-t border-neutral-900">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div>
                    <h2 className="text-white text-lg font-bold tracking-tight mb-2">BURGER.</h2>
                    <p className="text-xs max-w-xs leading-relaxed">
                        Crafting the finest burgers with passion and precision.
                        Premium ingredients, unforgettable taste.
                    </p>
                </div>

                <div className="flex gap-8 text-xs font-mono tracking-wider uppercase">
                    <a href="#" className="hover:text-white transition-colors">Instagram</a>
                    <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="hover:text-white transition-colors">TikTok</a>
                </div>

                <div className="text-[10px] text-neutral-600">
                    &copy; {new Date().getFullYear()} BURGER BRAND. ALL RIGHTS RESERVED.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
