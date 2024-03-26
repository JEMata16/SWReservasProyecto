import { SignInButton, SignOutButton, SignedIn, UserButton, useAuth, useSession, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { checkUserRole } from "~/utils/checkUserRole";
const Hero = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isSignedIn } = useUser();
    const {session} = useSession();
    const userRole = session ? checkUserRole(session) : null;
   
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <>
            <div className="w-full h-screen relative brightness-50">
                <img
                    src="images/CostaRica.jpg"
                    alt=""
                    className="w-full h-full object-cover "
                />
            </div>
            <nav className="w-full absolute top-0 p-5 flex justify-between text-white z-10">
                <div>
                    <h1 className="text-3xl font-bold cursor-pointer"><a href="/">MkConnection</a></h1>
                </div>
                <div className="lg:flex hidden">
                    <ul className="flex space-x-5 font-bold cursor-pointer text-gray-300">
                        <li className="hover:text-white"><a href="/about">About</a></li>
                        <li className="hover:text-white"><a href="/places">Places</a></li>
                        <li className="hover:text-white">Contact</li>
                        {userRole == "org:admin" ? (
                            <li className="hover:text-white"><a href="/dashboards/admin">Admin</a></li>
                        ) : (<></>)
                            
                        }
                        {isSignedIn ? (
                            <>
                                <UserButton />
                                <SignOutButton>
                                    <li>
                                        <button className="hover:text-orange-500">Sign out</button>
                                    </li>
                                </SignOutButton>
                            </>
                        ) : (
                            <Link href={{ pathname: "/login" }}>
                                <p className="hover:text-orange-500">Login</p>
                            </Link>
                        )}
                    </ul>
                </div>
            </nav>

            <div className="absolute top-0 h-screen flex flex-col space-y-10 justify-center items-center bg-black opacity-75 xl:w-1/3 sm:w-1/2 z-0">
                <div className="text-white text-center space-y-5">
                    <h2 className="text-2xl font-bold cursor-default">D I S C O V E R</h2>
                    <h1 className="text-5xl font-bold cursor-default">C O S T A  &nbsp; R I C A</h1>
                    <p className="mx-10 text-gray-400 cursor-default">
                        Marketing Connection & Travel DMC! Grows with the vision of gives personalize and quality services using advance techniques in each tourism and marketing areas.
                    </p>
                </div>

                <div className="space-x-4">
                    <button className="bg-gray-300 py-2 px-5 rounded-md hover:bg-white hover:duration-300">
                        Book a Trip
                    </button>
                </div>

                <div className="text-white flex space-x-5">
                </div>
            </div>
        </>
    );
}

export default Hero;