import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Alert, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ValidationAlert = ({ message, onClose }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            width: '90%',
            maxWidth: '600px'
          }}
        >
          <Alert
            severity="error"
            icon={<ErrorOutlineIcon />}
            onClose={onClose}
            sx={{
              backgroundColor: 'rgba(253, 237, 237, 0.95)',
              backdropFilter: 'blur(8px)',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              '& .MuiAlert-icon': {
                color: '#d32f2f',
                fontSize: '24px'
              },
              '& .MuiAlert-message': {
                padding: '8px 0',
                color: '#d32f2f',
                fontWeight: 500,
                '& ul': {
                  margin: '8px 0 0 0',
                  paddingLeft: '20px',
                  listStyle: 'none',
                  '& li': {
                    margin: '4px 0',
                    display: 'flex',
                    alignItems: 'center',
                    '&:before': {
                      content: '"•"',
                      marginRight: '8px',
                      color: '#d32f2f'
                    }
                  }
                }
              }
            }}
          >
            <Box>
              {typeof message === 'string' ? (
                message
              ) : (
                <ul>
                  {message.split('\n').map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              )}
            </Box>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ValidationAlert;
