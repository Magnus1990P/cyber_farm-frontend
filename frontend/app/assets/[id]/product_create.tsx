"use client";

import * as React from 'react'
import { useParams } from 'next/navigation';

interface FormElements extends HTMLFormControlsCollection {
    nameInput: HTMLInputElement
}
interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

function NewProduct({
  onSubmitUsername,
}: {
  onSubmitUsername: (username: string) => void
}) {
  function handleSubmit(event: React.FormEvent<UsernameFormElement>) {
    event.preventDefault()
    onSubmitUsername(event.currentTarget.elements.usernameInput.value)
  }

  return (
    <div className='col bg-white shadow-md text-left rounded-xl col-span-2 py-3 text'>
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="nameInput">Product name:</label>
            <input id="nameInput" type="text" />
        </div>
        <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default NewProduct;