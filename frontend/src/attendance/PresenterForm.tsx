import AttachFile from "@mui/icons-material/AttachFile";
import Close from "@mui/icons-material/Close";
import { TextField, Typography } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { useState } from "react";
import { SuccessStatePresenter } from "./Presenter";
import API_URL from "../API";
import { LoadingButton } from "@mui/lab";

export type PresenterFormProps = {
    successState: SuccessStatePresenter | undefined,
    setSuccessState: ReturnType<typeof useState<SuccessStatePresenter>>[1],
    p: string,
}

type FormState = {
    email: string,
    first: string,
    last: string,
    crn: string,
    errors: (keyof FormState)[];
}

export default function PresenterForm({ setSuccessState, p }: PresenterFormProps) {
    const [file, setFile] = useState<File | null>(null);
    const [form, setForm] = useState<FormState>({
        crn: "SPAN-101",
        email: "",
        first: "",
        last: "",
        errors: [],
    });

    const [fileError, setFileError] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (value: keyof FormState, event: React.ChangeEvent) => {
        setForm((old) => ({
            ...old,
            [value]: (event.target as HTMLInputElement).value
        }));
    }

    const checkError = (value: keyof FormState) => form.errors.indexOf(value) !== -1;

    const handleSubmit = () => {
        let errors: (keyof FormState)[] = []
        Object.keys(form).forEach(key => {
            if (form[key as keyof FormState] === "") {
                errors.push(key as keyof FormState);
            }
        });
        if (errors.length > 0) {
            setForm((f) => ({
                ...f,
                errors,
            }));
            return;
        }

        if (file == null) {
            setFileError(true);
            return;
        }

        setLoading(true);

        fetch(`${API_URL}/attendance/presenter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first: form.first,
                last: form.last,
                email: form.email,
                crn: form.crn,
                p,
            })
        }).then((res) => {
            if (res.status === 200) {
                setSuccessState(SuccessStatePresenter.SUCCESS);
            } else {
                setSuccessState(SuccessStatePresenter.FAILURE);
            }
        }).catch(() => {
            setSuccessState(SuccessStatePresenter.FAILURE);
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <>
            <div className="w-full h-full flex flex-col items-center">
                <div className="flex flex-col items-baseline gap-2 w-full h-max px-3 pt-5">
                    <Typography fontWeight={700} fontSize={24}>
                        Presenter Information
                    </Typography>
                    <TextField label="Email" variant="outlined" error={checkError("email")} value={form.email} onChange={handleChange.bind(null, "email")} required fullWidth />
                    <div className="flex flex-row justify-center gap-1 w-full">
                        <TextField label="First Name" variant="outlined" required error={checkError("first")} value={form.first} onChange={handleChange.bind(null, "first")} />
                        <TextField label="Last Name" variant="outlined" required fullWidth error={checkError("last")} value={form.last} onChange={handleChange.bind(null, "last")} />
                    </div>
                    <TextField label="CRN" defaultValue="SPAN-101" variant="outlined" required error={checkError("crn")} value={form.crn} onChange={handleChange.bind(null, "crn")} />
                    <MuiFileInput
                        clearIconButtonProps={{
                            title: "remove",
                            children: <Close />
                        }}
                        value={file}
                        onChange={setFile}
                        placeholder="Attach a Selfie at the Event *"
                        required
                        error={fileError}
                        InputProps={{
                            startAdornment: <AttachFile />
                        }}
                    />
                    <LoadingButton loading={loading} disabled={loading} variant="contained" size="large" onClick={handleSubmit}>
                        Submit
                    </LoadingButton>
                </div>
            </div>
        </>
    )
}