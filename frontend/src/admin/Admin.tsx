import { Button, TextField, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import API_URL from "../API";
import fileDownload from "js-file-download";

function AdminPanel({ password }: { password: string }) {
    const [guestCount, setGuestCount] = useState<number>(-1);
    const [presenterCount, setPresenterCount] = useState<number>(-1);
    const [presenters, setPresenters] = useState<string[]>([]);

    const reloadCounts = () => {
        fetch(`${API_URL}/admin/attendance/count`, {
            headers: {
                'X-Authentication': password,
            }
        }).then((res) => {
            if (res.status == 200) {
                return res.json();
            }
        }).then((res) => {
            setGuestCount(res.guests);
            setPresenterCount(res.presenters);
        }).catch(() => { });
    }

    const loadPresenters = () => {
        fetch(`${API_URL}/admin/attendance/presenters`, {
            headers: {
                'X-Authentication': password,
            }
        }).then((res) => {
            if (res.status == 200) {
                return res.json();
            }
        }).then((res) => {
            setPresenters(res)
        }).catch(() => { });
    }

    const downloadReport = () => {
        fetch(`${API_URL}/admin/report`, {
            headers: {
                'X-Authentication': password,
            }
        }).then(async (res) => {
            fileDownload(await res.text(), 'report.txt')
        }).catch(() => {});
    }

    useEffect(() => {
        reloadCounts();
    }, [])

    return (
        <div className="flex flex-col w-full items-center gap-3">
            <div className="flex flex-row w-full justify-evenly">
                <Typography>
                    Guest Count: {guestCount}
                </Typography>
                <Typography>
                    Presenter Count: {presenterCount}
                </Typography>
            </div>
            <Button onClick={reloadCounts} variant='contained'>
                Reload
            </Button>

            <Button onClick={loadPresenters} variant='contained'>
                Load Presenters
            </Button>

            {presenters.length == 0 && <Typography>No presenters loaded...</Typography>}
            {presenters.length > 0 && <ul>
                {presenters?.map((v, i) => <li key={i}>{v}</li>)}
            </ul>}

            <Button onClick={downloadReport}>
                Download Report
            </Button>
        </div>
    )
}

export default function Admin() {
    const [password, setPassword] = useState<string | null>(null);
    const [auth, setAuth] = useState<boolean>(false);

    const handleSubmit = () => {
        if (password == null) return;

        fetch(`${API_URL}/admin/auth`, {
            headers: {
                'X-Authentication': password,
            }
        }).then((res) => {
            if (res.status != 200) {
                setAuth(false);
                return;
            }
            setAuth(true);
        }).catch(() => setAuth(false))
    }

    return (
        <>
            <AnimatePresence mode="wait">
                {
                    auth == false && <motion.div
                        key="login"
                        style={{
                            translateX: "-50%",
                            translateY: "-50%"
                        }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute left-1/2 top-1/2 flex flex-col gap-2 justify-start"
                    >
                        <TextField label="Admin Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Button type="submit" variant="contained" onClick={handleSubmit}>Submit</Button>
                    </motion.div>
                }
                {
                    auth && <motion.div
                        initial={{ opacity: 0, scale: 0.8, }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-2"
                    >
                        <AdminPanel password={password!} />
                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}