"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function SearchBar({ onSearch = (query: string) => console.log(`Searching for: ${query}`) }) {
    const [query, setQuery] = useState("")

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch(query)
    }

    return (
        <form onSubmit={handleSearch} className="relative w-full bg-secondary rounded-xl">
            <Input
                type="text"
                placeholder="Search collections"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border-none bg-transparent rounded-xl pr-10 pl-4"
                aria-label="Search input"
            />
            <Button
                type="submit"
                size="icon"
                className="absolute right-0 top-0 rounded-l-none rounded-r-xl h-full"
                aria-label="Search"
            >
                <Search className="h-4 w-4" />
            </Button>
        </form>
    )
}