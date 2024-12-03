"use client";

import { Card } from "@/components/ui/card";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import NumberInput from "./number-input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { ChangeEvent, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageInput } from "./image-input";

interface CreateCardProps extends React.HTMLAttributes<HTMLElement> {
}

const formSchema = z.object({
    name: z.string().min(1).max(32),
    url: z.string().min(1).max(32),
    image: z.instanceof(File).optional(),
    description: z.string().max(256),
    symbol: z.string().min(1).max(32),
    maxSupply: z.number().min(0),
    baseUri: z.string(),
})

export default function CreateCard({
    ...props
}: CreateCardProps) {
    const [tabValue, setTabValue] = useState<string>("token");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            url: "",
            description: "",
            symbol: "",
            maxSupply: 0,
            baseUri: "",
        },
    });

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        form.setValue("name", event.currentTarget.value);
        form.setValue("url", event.currentTarget.value);
    };

    const onSubmit = (values: z.infer<typeof formSchema>) => {
    };

    return (
        <div
            {...props}
        >
            <Tabs
                value={tabValue}
            >
                <TabsList className="h-fit w-full justify-between mb-4">
                    <TabsTrigger
                        value="token"
                        className="flex items-center justify-center w-full space-x-2"
                        onClick={() => { setTabValue("token") }}
                    >
                        <Badge
                            variant="secondary"
                            className="flex items-center justify-center w-6 h-6 p-0 text-lg text-center rounded-full"
                        >
                            1
                        </Badge>
                        <div
                            className="text-xl font-bold"
                        >
                            TOKEN
                        </div>
                    </TabsTrigger>
                    <TabsTrigger
                        value="pfp"
                        className="flex items-center justify-center w-full space-x-2"
                        onClick={() => { setTabValue("pfp") }}
                    >
                        <Badge
                            variant="secondary"
                            className="flex items-center justify-center w-6 h-6 p-0 text-lg text-center rounded-full"
                        >
                            2
                        </Badge>
                        <div
                            className="text-xl font-bold"
                        >
                            PFP
                        </div>
                    </TabsTrigger>
                    <TabsTrigger
                        value="deploy"
                        className="flex items-center justify-center w-full space-x-2"
                        onClick={() => { setTabValue("deploy") }}
                    >
                        <Badge
                            variant="secondary"
                            className="flex items-center justify-center w-6 h-6 p-0 text-lg text-center rounded-full"
                        >
                            3
                        </Badge>
                        <div
                            className="text-xl font-bold"
                        >
                            DEPLOY
                        </div>
                    </TabsTrigger>
                </TabsList>
                <Card
                    className="p-8"
                >
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <TabsContent
                                value="token"
                                className="space-y-6"
                            >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-lg font-bold">NAME</FormLabel>
                                            <FormControl>
                                                <Input value={field.value} onChange={handleNameChange} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-lg font-bold">URL</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <Badge
                                                variant="secondary"
                                            >
                                                pfpos.fun/{field.value}
                                            </Badge>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="symbol"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-lg font-bold">SYMBOL</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div
                                    className="flex flex-row justify-between pt-8 space-x-8"
                                >
                                    <Button
                                        className="w-full py-6 text-xl font-bold invisible"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        className="w-full py-6 text-xl font-bold"
                                        onClick={() => { setTabValue("pfp") }}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </TabsContent>
                            <TabsContent
                                value="pfp"
                                className="space-y-6"
                            >
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel className="text-lg font-bold">PICTURE</FormLabel>
                                            <FormControl>
                                                <ImageInput
                                                    className="w-32 h-32 rounded-xl"
                                                    inputProps={{
                                                        onChange: (event) => {
                                                            if (event.target.files?.[0] !== undefined) {
                                                                form.setValue("image", event.target.files[0]);
                                                            }
                                                        },
                                                    }}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-lg font-bold">DESCRIPTION</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    className="resize-none h-24"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="maxSupply"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-lg font-bold">MAX SUPPLY</FormLabel>
                                            <FormControl>
                                                <NumberInput />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="baseUri"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-lg font-bold">BASE URI</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div
                                    className="flex flex-row justify-between pt-8 space-x-8"
                                >
                                    <Button
                                        className="w-full py-6 text-xl font-bold"
                                        onClick={() => { setTabValue("token") }}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        className="w-full py-6 text-xl font-bold"
                                        onClick={() => { setTabValue("deploy") }}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </TabsContent>
                            <TabsContent
                                value="deploy"
                                className="space-y-6"
                            >
                                <div
                                    className="pt-8"
                                >
                                    <Button
                                        className="w-full py-6 text-xl font-bold"
                                    >
                                        Create Collection
                                    </Button>
                                </div>
                            </TabsContent>
                        </form>
                    </Form>
                </Card>
            </Tabs>
        </div>
    );
}