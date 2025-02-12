import { AreaGraphSkeleton } from '@/components/dashboard/overview/AreaSkeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

const page = () => {
  return (
    <div className='flex '>
        <Card >
          <CardHeader>Hello</CardHeader>
          <CardContent>This is a card for greetings</CardContent>
        </Card>

        <Card >
          <CardHeader>Hello</CardHeader>
          <CardContent>This is a card for greetings</CardContent>
        </Card>

        <Card >
          <CardHeader>Hello</CardHeader>
          <CardContent>This is a card for greetings</CardContent>
        </Card>

        <AreaGraphSkeleton/>
    </div>
  )
}

export default page