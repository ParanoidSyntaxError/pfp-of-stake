"use client"

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageInputProps extends React.HTMLAttributes<HTMLElement> {
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

interface ImageInputControlledProps extends React.HTMLAttributes<HTMLElement> {
    previewSrc?: string;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

interface ImagePreviewProps extends React.HTMLAttributes<HTMLElement> {
    src?: string;
}

function ImagePreview({
    src,
    ...props
}: ImagePreviewProps) {
    if (src !== undefined) {
        return (
            <div
                {...props}
                className={cn(
                    "w-full h-full",
                    props.className
                )}
            >
                <Image
                    src={src}
                    alt="Preview Image"
                    fill
                    className="object-cover"
                />
            </div>
        );
    }

    return (
        <div
            {...props}
            className={cn(
                "w-full h-full flex",
                props.className
            )}
        >
            <ImageIcon
                className="w-1/4 h-1/4 self-center mx-auto"
            />
        </div>
    );
}

export function ImageInputControlled({
    previewSrc,
    inputProps,
    ...props
}: ImageInputControlledProps) {
    return (
        <div
            {...props}
            className={cn(
                "border relative overflow-hidden",
                props.className
            )}
        >
            <ImagePreview
                src={previewSrc}
            />
            <Input
                {...inputProps}
                type="file"
                accept="image/*"
                className="opacity-0 w-full h-full absolute top-0"
            />
        </div>
    );
}

export function ImageInput({
    inputProps,
    ...props
}: ImageInputProps) {
    const [preview, setPreview] = useState<string | undefined>(undefined);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0] !== undefined) {
            const url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };

    return (
        <div
            {...props}
            className={cn(
                "border relative overflow-hidden",
                props.className
            )}
        >
            <ImagePreview
                src={preview}
            />
            <Input
                {...inputProps}
                type="file"
                accept="image/*"
                onChange={(e) => {
                    handleImageChange(e);
                    if (inputProps?.onChange !== undefined) {
                        inputProps.onChange(e);
                    }
                }}
                className="opacity-0 w-full h-full absolute top-0"
            />
        </div>
    );
}