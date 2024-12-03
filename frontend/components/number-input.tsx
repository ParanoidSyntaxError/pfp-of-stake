'use client'

import * as React from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function NumberInput() {
    const [value, setValue] = React.useState<number>(0);

    const increment = () => {
        setValue(Math.max(0, value + 1));
    }

    const decrement = () => {
        setValue(Math.max(0, value - 1));
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        if(!isNaN(newValue)) {
            setValue(newValue);
        }
    }

    return (
        <div className="w-full">
            <div className="relative">
                <Input
                    type="number"
                    id="number-input"
                    value={value}
                    onChange={handleInputChange}
                    className="pr-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <div className="absolute inset-y-0 right-0 flex flex-col">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-1/2 px-2 rounded-none rounded-tr-md hover:bg-accent"
                        onClick={increment}
                        aria-label="Increment"
                    >
                        <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-1/2 px-2 rounded-none rounded-br-md hover:bg-accent"
                        onClick={decrement}
                        aria-label="Decrement"
                    >
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}