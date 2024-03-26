"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Welcome() {
    const router = useRouter();

    function handleSubmit(inputElement: HTMLInputElement) {
        const code = inputElement.value;
        router.push(`/welcome/${code}`)
    }

    return (
        <div className="w-full h-full">
            <div className="border border-black rounded-lg p-2 flex flex-col gap-2 max-w-[350px]">
                <div className="font-bold font-sans">
                    Welcome to the Afrolatinidad Event!
                </div>
                <div>
                    If you are have not yet done so, please find a poster and scan the QR code to sign in to the event.
                    You may also sign in by copying in the code from a poster manually.
                </div>
                <form>
                    <label htmlFor="code">Enter code here:</label>
                    <input id="code" type="text" onSubmit={(event: FormEvent<HTMLInputElement>) => handleSubmit(event.nativeEvent.target as HTMLInputElement)} placeholder="Enter code here" />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}