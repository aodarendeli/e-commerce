import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loader() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(5px)' // Bu satır arka planı bulanıklaştıracak
        }}>
            <Spinner animation='border' role='status' style={{ width: '100px', height: '100px', display: 'block' }}>
                <span className='sr-only'>Loading</span>
            </Spinner>
        </div>
    )
}

export default Loader;
