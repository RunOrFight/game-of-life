import Row from "./Row";
import uuid from "react-uuid";
import { useAppDispatch, useAppSelector } from "./hooks";
import { generationsSlice } from "./store";
import Button from "./Button";
import Input from "./Input";

function App() {
    const { currentGeneration, inputValue, isInputValid, runInterval } =
        useAppSelector((state) => state.generationsReducer);
    const { init, next, prev, clear, setRunInterval } =
        generationsSlice.actions;
    const dispatch = useAppDispatch();

    const run = () => {
        if (runInterval) {
            clearInterval(runInterval);
            dispatch(setRunInterval(null));
        } else {
            const interval = setInterval(() => {
                dispatch(next());
            }, 1000);
            dispatch(setRunInterval(interval));
        }
    };

    return (
        <div className='flex flex-col items-center font-sans p-10'>
            <div className='text-center font-semibold text-3xl mb-10'>
                Game Of Life
            </div>

            <div className='flex mb-6 flex-col sm:flex-row items-center'>
                <div className='mr-0 sm:mr-4 mb-4 sm:mb-0 w-80 '>
                    <Input
                        value={inputValue}
                        onChange={(e) => dispatch(init(e.target.value))}
                        placeholder='1111_0000_1111'
                    />
                </div>
                <div className='flex gap-2'>
                    <Button
                        onClick={() => {
                            dispatch(clear());
                        }}>
                        Clear
                    </Button>

                    <Button
                        disabled={
                            !isInputValid || inputValue === "" || !!runInterval
                        }
                        onClick={() => {
                            dispatch(prev());
                        }}>
                        {"<"}
                    </Button>
                    <Button
                        disabled={
                            !isInputValid || inputValue === "" || !!runInterval
                        }
                        onClick={() => {
                            dispatch(next());
                        }}>
                        {">"}
                    </Button>

                    <Button
                        variant='long'
                        disabled={!isInputValid || inputValue === ""}
                        onClick={run}>
                        {runInterval ? "Stop" : "Run"}
                    </Button>
                </div>
            </div>
            {currentGeneration && (
                <div className='text-center font-semibold text-xl mb-6'>
                    Generation: {currentGeneration?.id}
                </div>
            )}
            {isInputValid ? (
                <div>
                    {currentGeneration?.value.map((row) => (
                        <Row
                            key={uuid()}
                            row={row}
                        />
                    ))}
                </div>
            ) : (
                <div className='text-red-400'>Invalid Generation</div>
            )}
        </div>
    );
}

export default App;
