import { PatternBackground } from "@/components/pattern-background"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Loading() {
    return (
        <div className="min-h-screen bg-radial-[at_25%_25%] from-slate-50 to-slate-600 to-75%">
            <PatternBackground
                colorPrimary="#000000"
                colorSecondary="#3b82f6"
                patternType="waves"
                size={25}
                opacity={0.4}
                className="h-64 w-full"
            />

            <main className="container mx-auto px-4 -mt-32">
                <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 ">
                    <Card className="md:col-span-1 shadow-lg">
                        <CardHeader className="flex flex-col items-center space-y-2 pb-2">
                            <div className="relative">
                                <div className="h-25 w-25 bg-cyan-500 rounded-full">
                                    <Avatar className="h-24 w-24 border-4 border-cyan-500">
                                        <Skeleton className="h-full w-full rounded-full" />
                                    </Avatar>
                                </div>
                            </div>
                            <div className="space-y-1 text-center w-full">
                                <Skeleton className="h-8 w-32 mx-auto" />
                                <Skeleton className="h-4 w-24 mx-auto" />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Contact info section */}
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2 text-sm">
                                    <Skeleton className="h-4 w-4 text-muted-foreground" />
                                    <Skeleton className="h-4 w-40" />
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                    <Skeleton className="h-4 w-4 text-muted-foreground" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                    <Skeleton className="h-4 w-4 text-muted-foreground" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                    <Skeleton className="h-4 w-4 text-muted-foreground" />
                                    <Skeleton className="h-4 w-16" />
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                    <Skeleton className="h-4 w-4 text-muted-foreground" />
                                    <Skeleton className="h-4 w-36" />
                                </div>
                            </div>
                            <Separator />
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full" disabled>
                                <Skeleton className="mr-2 h-4 w-4" />
                                <Skeleton className="h-4 w-16" />
                            </Button>
                        </CardFooter>
                    </Card>

                    <div className="md:col-span-2 lg:col-span-3 space-y-6">
                        {/* About section */}
                        <Card className="shadow-lg">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="mr-2 h-4 w-4" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-3/4" />
                            </CardContent>
                        </Card>

                        {/* Tabs section */}
                        <Tabs defaultValue="posts">
                            <div className="flex justify-between items-center mb-4">
                                <TabsList>
                                    <TabsTrigger value="posts" className="flex items-center">
                                        <Skeleton className="mr-2 h-4 w-4" />
                                        <Skeleton className="h-4 w-16" />
                                    </TabsTrigger>
                                    <TabsTrigger value="featured" className="flex items-center">
                                        <Skeleton className="mr-2 h-4 w-4" />
                                        <Skeleton className="h-4 w-16" />
                                    </TabsTrigger>
                                    <TabsTrigger value="connections" className="flex items-center">
                                        <Skeleton className="mr-2 h-4 w-4" />
                                        <Skeleton className="h-4 w-16" />
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            {/* Projects tab */}
                            <TabsContent value="posts" className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    {Array(4)
                                        .fill(0)
                                        .map((_, i) => (
                                            <Card key={i} className="overflow-hidden">
                                                <Skeleton className="h-48 w-full" />
                                                <CardContent className="p-4">
                                                    <Skeleton className="h-6 w-3/4 mb-2" />
                                                    <Skeleton className="h-4 w-full mb-1" />
                                                    <Skeleton className="h-4 w-2/3" />
                                                </CardContent>
                                            </Card>
                                        ))}
                                </div>
                            </TabsContent>

                            {/* Other tabs content */}
                            <TabsContent value="featured" className="space-y-4">
                                <Skeleton className="h-64 w-full" />
                            </TabsContent>

                            <TabsContent value="connections" className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-3">
                                    {Array(6)
                                        .fill(0)
                                        .map((_, i) => (
                                            <Card key={i} className="p-4">
                                                <div className="flex items-center space-x-4">
                                                    <Skeleton className="h-12 w-12 rounded-full" />
                                                    <div className="space-y-2">
                                                        <Skeleton className="h-4 w-24" />
                                                        <Skeleton className="h-3 w-16" />
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </main>
        </div>
    )
}

import React from 'react'

export const ProfielCardSkeleton = () => {
    return (
        <Card className="md:col-span-1 shadow-lg">
            <CardHeader className="flex flex-col items-center space-y-2 pb-2">
                <div className="relative">
                    <div className="h-25 w-25 bg-cyan-500 rounded-full">
                        <Avatar className="h-24 w-24 border-4 border-cyan-500">
                            <Skeleton className="h-full w-full rounded-full" />
                        </Avatar>
                    </div>
                </div>
                <div className="space-y-1 text-center w-full">
                    <Skeleton className="h-8 w-32 mx-auto" />
                    <Skeleton className="h-4 w-24 mx-auto" />
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Contact info section */}
                <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                        <Skeleton className="h-4 w-4 text-muted-foreground" />
                        <Skeleton className="h-4 w-40" />
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                        <Skeleton className="h-4 w-4 text-muted-foreground" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                        <Skeleton className="h-4 w-4 text-muted-foreground" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                        <Skeleton className="h-4 w-4 text-muted-foreground" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                        <Skeleton className="h-4 w-4 text-muted-foreground" />
                        <Skeleton className="h-4 w-36" />
                    </div>
                </div>
                <Separator />
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full" disabled>
                    <Skeleton className="mr-2 h-4 w-4" />
                    <Skeleton className="h-4 w-16" />
                </Button>
            </CardFooter>
        </Card>
    )
}
