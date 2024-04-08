import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import { Button, Typography } from "@mui/material"
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const goToGuestAttendance = () => navigate('/attendance/guest');
  const gotoPresenterAttendance = () => navigate('/attendance/presenter');

  return (
    <>
      <div className="h-full w-full flex flex-row justify-center content-center">
        <div className="sm:hidden w-max px-20 pt-10">
          <Typography variant='h2' fontWeight={900}>
            {`¡Hola!`}
          </Typography>
          <Typography className="pt-2 pb-3 text-sm" color="GrayText" fontWeight={500}>
            Please check in using one of the options below.
          </Typography>
        </div>
        <div className="hidden sm:block">
          <Typography variant="h1" textAlign="center" fontWeight={900}>
            {`¡Hola!`}
          </Typography>
          <Typography className="pb-3 text-sm" color="GrayText" fontWeight={500}>
            Please check in using one of the options below.
          </Typography>
          <div className="text-nowrap flex flex-row items-center gap-3">
            <Button variant="contained" onClick={goToGuestAttendance}>Guest Attendence</Button>
            <Button onClick={gotoPresenterAttendance}>Presenter Attendence</Button>
          </div>
          <div className="pt-4 flex flex-row justify-center">
            <AppShortcutIcon color="disabled" />
            <Typography color="GrayText">
              This website is optimized for mobile devices!
            </Typography>
          </div>
        </div>
      </div>

      <div className='sm:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <div className="text-nowrap flex flex-col items-center">
          <Button variant="contained" size='large' onClick={goToGuestAttendance}>Guest Attendence</Button>
          <Typography className="w-min" color="GrayText">- or -</Typography>
          <Button onClick={gotoPresenterAttendance}>Presenter Attendence</Button>
        </div>
      </div>
    </>
  )
}

export default App
