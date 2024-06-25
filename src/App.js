import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Welcome } from "./Welcome";
import TheoryPart1 from "./TheoryPart1";
import TheoryPart2 from "./TheoryPart2";
import Test1 from "./test1";
import Test2 from "./test2";
import RepetTheory from "./RepetTheory";
import RepetTest from "./RepetTest";
import Final from "./final";





function NotFound() {
    return (
        <div>
            <h1>Page Not Found</h1>
            <p>The requested page could not be found.</p>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Welcome />} />
                <Route path='/welcome' element={<Welcome />} />
                <Route path='/theory-part-1' element={<TheoryPart1 />} />
                <Route path='/test1' element={<Test1 />}/>
                <Route path='/theory-part-2' element={<TheoryPart2 />} />
                <Route path='/test2' element={<Test2 />}/>
                <Route path='/repet-theory' element={<RepetTheory />}/>
                <Route path='/repet-test' element={<RepetTest />}/>
                <Route path='/final' element={<Final />}/>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
