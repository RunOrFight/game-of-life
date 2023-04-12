import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GenerationsState {
    generations: string[][];
    currentGeneration: {
        id: number;
        value: string[];
    } | null;
    inputValue: string;
    isInputValid: boolean;
    runInterval: number | null;
}

const initialState: GenerationsState = {
    currentGeneration: null,
    generations: [],
    inputValue: "",
    isInputValid: true,
    runInterval: null
};

export const generationsSlice = createSlice({
    name: "generations",
    initialState,
    reducers: {
        init(state, action: PayloadAction<string>) {
            state.inputValue = action.payload;
            if (isInputValid(action.payload)) {
                state.currentGeneration = {
                    id: 0,
                    value: action.payload.split("_")
                };
                state.generations = [action.payload.split("_")];
                state.isInputValid = true;
            } else {
                state.isInputValid = false;
            }
        },
        next(state) {
            const nextGenerationId = state.currentGeneration!.id + 1;
            if (state.generations[nextGenerationId]) {
                state.currentGeneration = {
                    id: nextGenerationId,
                    value: state.generations[nextGenerationId]
                };
                return;
            }

            const newGeneration = createGeneration(
                state.currentGeneration!.value
            );

            const haveDifferences =
                newGeneration.join() !== state.currentGeneration!.value.join();

            if (!haveDifferences) {
                if (state.runInterval) {
                    clearInterval(state.runInterval);
                    state.runInterval = null;
                }
                return;
            }

            state.currentGeneration = {
                id: nextGenerationId,
                value: newGeneration
            };
            state.generations.push(newGeneration);
        },
        prev(state) {
            const prevGenerationId = state.currentGeneration!.id - 1;
            if (state.generations[prevGenerationId]) {
                state.currentGeneration = {
                    id: prevGenerationId,
                    value: state.generations[prevGenerationId]
                };
            }
        },
        clear(state) {
            state.runInterval && clearInterval(state.runInterval);
            return initialState;
        },
        setRunInterval(state, action: PayloadAction<number | null>) {
            state.runInterval = action.payload;
        }
    }
});

export const generationsReducer = generationsSlice.reducer;

function createGeneration(matrix: string[]) {
    return [...matrix].map((row, rowIdx) => {
        return row.replace(/[01]/g, (cell, cellIdx) => {
            let aliveNeighbors = 0;

            const rowAbove = matrix[rowIdx - 1];
            if (rowAbove) {
                rowAbove?.[cellIdx - 1] === "1" && aliveNeighbors++;
                rowAbove?.[cellIdx] === "1" && aliveNeighbors++;
                rowAbove?.[cellIdx + 1] === "1" && aliveNeighbors++;
            }

            row[cellIdx - 1] === "1" && aliveNeighbors++;
            row[cellIdx + 1] === "1" && aliveNeighbors++;

            const rowBelow = matrix[rowIdx + 1];
            if (rowBelow) {
                rowBelow?.[cellIdx - 1] === "1" && aliveNeighbors++;
                rowBelow?.[cellIdx] === "1" && aliveNeighbors++;
                rowBelow?.[cellIdx + 1] === "1" && aliveNeighbors++;
            }
            if (cell === "1") {
                return aliveNeighbors > 3 || aliveNeighbors < 2 ? "0" : cell;
            } else {
                return aliveNeighbors === 3 ? "1" : cell;
            }
        });
    });
}

function isInputValid(value: string) {
    const regex = /^([01]+_)*[01]*_?$/g;
    return !!value.match(regex);
}
