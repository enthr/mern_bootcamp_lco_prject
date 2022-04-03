import React from 'react';
import Menu from './Menu';

function Base({
    title = 'My Title',
    description = 'My Description',
    className = 'bg-dark text-white p-4',
    children
}) {
    return (
        <div>
            <Menu />
            <div className="container-fluid mt-2 mb-4 py-4">
                <div className="jumbotron bg-dark text-white text-center my-4 pb-4">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            <footer className="footer bg-dark">
                <div className="container-fluid bg-success text-white text-center py-4">
                    <h4>If You Got Any Qustion Feel Free To Reach Out</h4>
                    <button className='btn btn-warning btn-lg mt-2'>Contact Us</button>
                </div>
                <div className="container-fluid text-center">
                    <span className="text-muted">
                        An Amazing Place To <span className='text-white'>iShop</span>
                    </span>
                </div>
            </footer>
        </div>
    );
}

export default Base;
