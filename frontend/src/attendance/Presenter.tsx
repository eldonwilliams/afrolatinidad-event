import { Typography } from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PresenterForm from "./PresenterForm";
import { AnimatePresence, motion } from "framer-motion";
import DoneAll from "@mui/icons-material/DoneAll";
import ErrorIcon from '@mui/icons-material/Error';

const MotionErrorIcon = motion(ErrorIcon);
const MotionDoneAll = motion(DoneAll);

export enum SuccessStatePresenter {
    SUCCESS = "success",
    FAILURE = "failure",
    SIGNING = "signing"
}

export default function Presenter() {
    const [searchParams] = useSearchParams();
    const password = searchParams.get('p');

    const state: SuccessStatePresenter | null = searchParams.get('s') as any;

    if (password === null) {
        return <Typography>To mark a presenter as attended, you must find the QR code poster.</Typography>
    }

    const [successState, setSuccessState] = useState<SuccessStatePresenter | undefined>(state ?? SuccessStatePresenter.SIGNING);

    return (<>
        <AnimatePresence mode="wait" initial>
            {successState === SuccessStatePresenter.SIGNING &&
                <motion.div
                    animate={{ opacity: 1, scale: 1, }}
                    exit={{ opacity: 0, scale: 0.8, }}
                    key="signing"
                >
                    <PresenterForm p={password} successState={successState} setSuccessState={setSuccessState} />
                </motion.div>
            }
            {successState === SuccessStatePresenter.SUCCESS &&
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
            {successState === SuccessStatePresenter.FAILURE &&
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, }}
                    animate={{ opacity: 1, scale: 1 }}
                    key="failure"
                >
                    <div className="flex flex-col items-center w-full px-20 pt-5">
                        <MotionErrorIcon initial={{ opacity: 0, scale: 0.8, }} animate={{ opacity: 1, scale: 1, animationDelay: "500ms" }} color="error" className="min-w-40 min-h-40 p-4"/>
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
                                been checked in. Please try again or contact Eldon Williams for assistance.
                            </Typography>
                        </Typography>
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    </>);
}