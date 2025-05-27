import React from 'react';
import { Box, Typography } from '@mui/material';

interface ProgressBarProps {
  completed: number;
  total: number;
}

export default function ProgressBar({ completed, total }: ProgressBarProps) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Progress: {completed}/{total} tasks completed ({percentage.toFixed(1)}%)
      </Typography>
      <div className="progress-container">
        <div 
          className="progress-bar"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </Box>
  );
}