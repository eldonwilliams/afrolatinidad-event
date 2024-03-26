import { z } from "zod";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";

const codeFormSchema = z.object({
    code: z.string().length(6, "Code must be 6 characters long").regex(/^\d{6}$/, "Code must be a 6-digit number"),
});

export default function CodeForm() {
    const form = useForm({
        mode: "onSubmit",
        
        defaultValues: {
            code: "",
        },
    });

    return (
        <Form >
            <form onSubmit={()=>{}}>

            </form>
        </Form>
    );
}