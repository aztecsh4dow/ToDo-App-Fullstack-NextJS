import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { PlayArrow, Pause, Replay } from '@mui/icons-material';

interface TimerProps {
  initialTime: number; // in minutes
  onComplete: () => void;
}

export default function Timer({ initialTime, onComplete }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false);
            onComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(initialTime * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / (initialTime * 60)) * 283;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <svg width="40" height="40" viewBox="0 0 100 100">
        <circle
          className="timer-circle"
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="8"
        />
        <circle
          className="timer-circle"
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#006400"
          strokeWidth="8"
          strokeDasharray="283"
          strokeDashoffset={283 - progress}
        />
      </svg>
      <Typography variant="h6">{formatTime(timeLeft)}</Typography>
      <IconButton onClick={toggleTimer} color="primary">
        {isRunning ? <Pause /> : <PlayArrow />}
      </IconButton>
      <IconButton onClick={resetTimer} color="secondary">
        <Replay />
      </IconButton>
    </Box>
  );
}