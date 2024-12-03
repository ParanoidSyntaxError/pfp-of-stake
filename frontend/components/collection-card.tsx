import Image from "next/image";
import { Card } from "./ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

interface CollectionCardProps extends React.HTMLAttributes<HTMLElement> {
    name: string;
    description: string;
    progress: number;
}

export function CollectionCard({
    name,
    progress,
    description,
    ...props
}: CollectionCardProps) {
    return (
        <Card
            {...props}
            className={cn(
                "p-4",
                props.className
            )}
        >
            <div
                className="relative w-full h-32 rounded-lg overflow-hidden"
            >
                <Image
                    src=""
                    alt=""
                    fill
                    className="bg-red-600"
                />
            </div>
            <div className="text-4xl font-bold">
                {name.toUpperCase()}
            </div>
            <Progress value={progress}/>
            <div>
                {description}
            </div>
            <Separator/>
            <div>
                <div>
                    
                </div>
            </div>
        </Card>
    );
}