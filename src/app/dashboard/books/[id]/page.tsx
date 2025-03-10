import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditBook from "@/components/dashboard/book/EditBook";


const page = () => {
    return (
        <div className="p-10">
            <Card className="p-2 ">
                <CardHeader>
                    <CardTitle>Update Author</CardTitle>
                </CardHeader>
                <CardContent>
                    <EditBook />
                </CardContent>
            </Card>
        </div>
    );
};

export default page;