import ToggleTheme from "./toggle-theme";
import SearchBar from "./search-bar";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import Link from "next/link";
import { Button } from "./ui/button";

export default function StickyBlurHeader() {
    return (
        <header className="sticky top-4 z-50 mx-4 rounded-xl backdrop-blur-md bg-white/5 shadow-sm">
            <div className="mx-auto px-6 py-4 flex items-center justify-between space-x-4">
                <div
                    className="flex flex-row items-center justify-center space-x-4"
                >
                    <Link
                        href=""
                    >
                        <h1 className="text-4xl font-bold w-fit">PFPoS</h1>
                    </Link>
                    <Link
                        href="/create"
                    >
                        <Button
                            variant="secondary"
                            className="font-bold"
                        >
                            CREATE
                        </Button>
                    </Link>
                    <Link
                        href="/explore"
                    >
                        <Button
                            variant="secondary"
                            className="font-bold"
                        >
                            EXPLORE
                        </Button>
                    </Link>
                </div>
                <div
                    className="flex items-center justify-center max-w-[24rem] w-full"
                >
                    <SearchBar />
                </div>
                <div
                    className="flex flex-row items-center justify-center space-x-4"
                >
                    <ToggleTheme />
                    <DynamicWidget
                        innerButtonComponent={"Connect"}
                    />
                </div>
            </div>
        </header>
    )
}