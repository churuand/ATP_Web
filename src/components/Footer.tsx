import { Link } from "wouter";

export default function Footer() {
    return (
        <footer className="bg-[#1a1a1a] text-white py-16 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-2 md:col-span-1">
                        <img
                            src="https://atp-global.com.au/images/logo.webp"
                            alt="ATP Global"
                            className="h-10 mb-6 brightness-0 invert"
                        />
                        <p className="text-white/40 text-sm leading-relaxed">
                            Connecting extraordinary talent with world-class opportunities
                            through meaningful internships.
                        </p>
                    </div>
                    <div>
                        <h5 className="font-medium mb-4 text-white/90">For Students</h5>
                        <ul className="space-y-2 text-sm text-white/40">
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Internship Programs
                                </a>
                            </li>
                            <li>
                                <Link
                                    href="/student-portal"
                                    className="hover:text-primary transition-colors"
                                >
                                    ATP Learning Hub
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/success-stories"
                                    className="hover:text-primary transition-colors"
                                >
                                    Success Stories
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-medium mb-4 text-white/90">For Employers</h5>
                        <ul className="space-y-2 text-sm text-white/40">
                            <li>
                                <Link
                                    href="/recruitment" className="hover:text-primary transition-colors">
                                    Recruitment Solutions
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/partners" className="hover:text-primary transition-colors">
                                    Become our Partners
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-medium mb-4 text-white/90">Company</h5>
                        <ul className="space-y-2 text-sm text-white/40">
                            <li>
                                <Link
                                    href="/about-us"
                                    className="hover:text-primary transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>

                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/20">
                    <p>© 2025 ATP Global. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
