import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubheadingState {
  subheadings: { id: string; name: string }[];
}

const initialState: SubheadingState = {
  subheadings: [],
};

const subheadingSlice = createSlice({
  name: "subheading",
  initialState,
  reducers: {
    addSubheading: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.subheadings.push(action.payload);
    },
    updateSubheading: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const { id, name } = action.payload;
      const subheading = state.subheadings.find((item) => item.id === id);
      if (subheading) {
        subheading.name = name;
      }
    },
  },
});

export const { addSubheading, updateSubheading } = subheadingSlice.actions;

export default subheadingSlice.reducer;