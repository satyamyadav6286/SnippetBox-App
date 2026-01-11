import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const getPastesFromLocalStorage = () => {
  try {
    const storedPastes = localStorage.getItem('pastes');
    return storedPastes ? JSON.parse(storedPastes) : [];
  } catch (e) {
    console.error('Error reading pastes from localStorage:', e);
    return [];
  }
};

const initialState = {
  pastes: getPastesFromLocalStorage(),
};

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    Addpaste: (state, action) => {
      const paste = action.payload;
      // Ensure language is set (default to 'text' if not provided)
      if (!paste.language) {
        paste.language = 'text';
      }
      state.pastes.push(paste);
      try {
        localStorage.setItem('pastes', JSON.stringify(state.pastes));
        toast.success('Paste created successfully');
      } catch (e) {
        console.error('Error saving paste to localStorage:', e);
        toast.error('Failed to save paste');
      }
    },

    Updatepaste: (state, action) => {
      const { id, newPaste } = action.payload;
      const index = state.pastes.findIndex(paste => paste.id === id);
      if (index !== -1) {
        // Ensure language is set (default to 'text' if not provided)
        if (!newPaste.language) {
          newPaste.language = 'text';
        }
        state.pastes[index] = { 
          ...newPaste, 
          updatedAt: new Date().toISOString() 
        };
        try {
          localStorage.setItem('pastes', JSON.stringify(state.pastes));
          toast.success('Paste updated successfully');
        } catch (e) {
          console.error('Error updating paste in localStorage:', e);
          toast.error('Failed to update paste');
        }
      }
    },

    Removefrompaste: (state, action) => {
      const id = action.payload;
      state.pastes = state.pastes.filter(paste => paste.id !== id);
      try {
        localStorage.setItem('pastes', JSON.stringify(state.pastes));
        toast.success('Paste removed successfully');
      } catch (e) {
        console.error('Error removing paste from localStorage:', e);
        toast.error('Failed to remove paste');
      }
    },

    Resetpaste: (state) => {
      state.pastes = []; // Reset Redux state
      try {
        localStorage.removeItem('pastes'); // Remove pastes from localStorage
        toast.success('All pastes have been reset');
      } catch (e) {
        console.error('Error resetting pastes in localStorage:', e);
        toast.error('Failed to reset pastes');
      }
    }
  }
});

export const { Addpaste, Updatepaste, Removefrompaste, Resetpaste } = pasteSlice.actions;
export default pasteSlice.reducer;
