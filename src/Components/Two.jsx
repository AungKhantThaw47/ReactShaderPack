import { useRef , useEffect } from 'react';
import {sculptToMinimalRenderer} from 'shader-park-core';
import {spCode} from './spCode.js';

export default function Two() {
    const first = useRef()
    useEffect(()=>{
    sculptToMinimalRenderer(first, spCode);

    },[])
    return(
        <div>
            <canvas ref={first}></canvas>
            Two
        </div>
    );
}