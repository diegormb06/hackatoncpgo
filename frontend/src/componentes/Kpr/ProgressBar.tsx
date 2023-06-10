import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

type ProgressBarProps = {
  color: string;
};

export default function ProgressBar({ color }: ProgressBarProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress
        sx={{
          backgroundColor: '#d9e0ef',
          '& .MuiLinearProgress-bar': {
            backgroundColor: color,
          },
        }}
        variant="determinate"
        value={100}
      />
    </Box>
  );
}
