import { AnimatePresence, motion } from "framer-motion";
import DoneAll from "@mui/icons-material/DoneAll";
import ErrorIcon from '@mui/icons-material/Error';
import { useEffect, useState } from "react";
import { CircularProgress, Typography } from "@mui/material";
import API_URL from "../API";

const MotionErrorIcon = motion(ErrorIcon);
const MotionDoneAll = motion(DoneAll);

enum GuestSuccessState {
    LOADING = "loading",
    SUCCESS = "success",
    FAILURE = "failure"
}

export default function Guest() {
    const [successState, setSuccessState] = useState<GuestSuccessState>(GuestSuccessState.LOADING);

    useEffect(() => {
        setTimeout(() => {
            fetch(`${API_URL}/attendance/guest`, {
                method: 'POST',
            }).then((res) => {
                if (res.status == 200) {
                    setSuccessState(GuestSuccessState.SUCCESS);
                } else {
                    setSuccessState(GuestSuccessState.FAILURE);
                }
            }).catch(() => {
                setSuccessState(GuestSuccessState.FAILURE);
            });
        }, 1000);
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                {successState == GuestSuccessState.LOADING && <motion.div
                    initial={{ opacity: 0, scale: 0.8, }}
                    animate={{ opacity: 1, scale: 1, }}
                    exit={{ opacity: 0, scale: 0.8, }}
                    style={{
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                    key="loading"
                    className="flex flex-col items-center absolute top-1/2 left-1/2"
                >
                    <Typography fontWeight={700} fontSize={24} className="pb-5">Checking in...</Typography>
                    <CircularProgress size={90} />
                </motion.div>}
                {successState === GuestSuccessState.SUCCESS &&
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, }}
                        animate={{ opacity: 1, scale: 1 }}
                        key="success"
                    >
                        <div className="flex flex-col items-center w-full px-20 pt-5">
                            <MotionDoneAll initial={{ opacity: 0, scale: 0.8, }} animate={{ opacity: 1, scale: 1, animationDelay: "500ms" }} color="success" className="min-w-44 min-h-44" />
                            <Typography component="p">
                                <Typography component="span" fontWeight={700} fontSize={20}>
                                    Success!&nbsp;
                                </Typography>
                                <Typography component="span">
                                    You have successfully been checked in. You may now exit.
                                </Typography>
                            </Typography>
                        </div>
                    </motion.div>
                }
                {successState === GuestSuccessState.FAILURE &&
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, }}
                        animate={{ opacity: 1, scale: 1 }}
                        key="failure"
                    >
                        <div className="flex flex-col items-center w-full px-20 pt-5">
                            <MotionErrorIcon initial={{ opacity: 0, scale: 0.8, }} animate={{ opacity: 1, scale: 1, animationDelay: "500ms" }} color="error" className="min-w-40 min-h-40 p-4" />
                            <Typography component="p">
                                <Typography component="span" fontWeight={700} fontSize={20}>
                                    Oh oh...&nbsp;
                                </Typography>
                                <Typography component="span">
                                    You have&nbsp;
                                </Typography>
                                <Typography component="span" fontWeight={900} color="red">
                                    not&nbsp;
                                </Typography>
                                <Typography component="span">
                                    been checked in. Please try again later. Apologies for the inconvenience.
                                </Typography>
                            </Typography>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    );
}