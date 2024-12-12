
import { Contact } from '../types/contact';
import { notFound } from 'next/navigation'


export async function cardContact(contact: Contact) {
    return (
        <div className="align-center">
        <h1>{contact.id} - {contact.email}</h1>
        <p><b>Name:</b> {contact.name}</p>
        <p><b>Phone:</b> {contact.phone}</p>
        </div>
    );
};

export async function getContact(id: number) {
    const res = await fetch(`http://localhost:8000/contacts/${id}`)
    if (!res.ok) notFound();
    const contact: Contact = await res.json()
    return (
        cardContact(contact)
    )
};

export async function getContacts() {
    const res = await fetch(`http://localhost:8000/contacts`) 
    if (!res) notFound()
    const contacts: Contact[] = await res.json()
    return (
        <div>
            {contacts.map((contact) => (
                cardContact(contact)
            ))}
        </div>
    )
};