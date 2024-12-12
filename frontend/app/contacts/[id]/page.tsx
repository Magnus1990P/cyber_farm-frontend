"use client"
import { useParams } from 'next/navigation'
import { getContact } from '../../../lib/contactUtils';


export default function contact() {
  const { id } = useParams();
  return (
    <div>
      {getContact(id)}
    </div>
  )
}

//export const dynamic = 'force-dynamic'