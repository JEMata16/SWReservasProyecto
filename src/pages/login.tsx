import { SignInButton } from "@clerk/nextjs";
import Login from "~/Login";


const login: React.FC = () => {

    return (
        <>
            <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 lg:px-8 font-serif">
                <div className="mx-auto w-full max-w-sm space-y-8">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Log in to your account</h1>
                        <p className="text-gray-500 dark:text-gray-400">Or continue with Google</p>
                    </div>
                    <div className="space-y-4">
                        <SignInButton redirectUrl="/">
                            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium ring-offset-blue-500 transition-colors focus-visible:outline-none text-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-950 text-primary-foreground hover:bg-opacity-70 h-10 px-4 py-2 w-full">
                                Sign in with Google
                            </button>
                        </SignInButton>
                        <div data-orientation="horizontal" role="none" className="shrink-0 bg-gray-100 h-[1px] w-full"></div>
                        <div className="space-y-2 text-center text-sm">
                            <p>
                                By continuing, you agree to our&nbsp;
                                <a className="underline" href="#">
                                    Terms of Service&nbsp;
                                </a>
                                and&nbsp;
                                <a className="underline" href="#">
                                    Privacy Policy
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default login;

