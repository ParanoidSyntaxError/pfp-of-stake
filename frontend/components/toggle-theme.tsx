"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, MoonIcon, Sun, SunIcon } from "lucide-react";

export default function ToggleTheme() {
    const { resolvedTheme, setTheme } = useTheme();

    const handleSetTheme = () => {
        if (resolvedTheme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    };

    return (
        <Button
            variant="outline"
            className="w-10 h-10 p-2 rounded-full"
            onClick={handleSetTheme}
        >
            <SunIcon
                className="h-8 w-8 transition-all flex dark:hidden"
            />
            <MoonIcon
                className="h-8 w-8 transition-all dark:flex hidden"
            />
        </Button>
    );
}