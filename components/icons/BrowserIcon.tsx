
import React from 'react';
import { BrowserType } from '../../types';

interface BrowserIconProps {
  browser: BrowserType;
  className?: string;
}

const GenericBrowserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9" />
    </svg>
);


export const BrowserIcon: React.FC<BrowserIconProps> = ({ browser, className }) => {
    switch(browser) {
        case BrowserType.Chrome:
            return (
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
                    <path d="M12,10.062A2.008,2.008,0,1,0,12,14a2,2,0,0,0,0-3.938Z"/>
                    <path d="M18.3,5.7a9,9,0,0,0-12.6,0,1,1,0,0,0,1.4,1.4,7,7,0,0,1,9.8,0,1,1,0,1,0,1.4-1.4Z"/>
                    <path d="M5.7,18.3a9,9,0,0,0,12.6,0,1,1,0,0,0-1.4-1.4,7,7,0,0,1-9.8,0,1,1,0,1,0-1.4,1.4Z"/>
                    <path d="M5.14,9.12a1,1,0,0,0-1.28,1.52,7,7,0,0,1,0,9.72,1,1,0,0,0,1.28,1.52,9,9,0,0,0,0-12.76Z"/>
                    <path d="M18.86,9.12a9,9,0,0,0,0,12.76,1,1,0,0,0,1.28-1.52,7,7,0,0,1,0-9.72,1,1,0,0,0-1.28-1.52Z"/>
                </svg>
            )
        case BrowserType.Firefox:
            return <GenericBrowserIcon className={className}/> // Placeholder
        case BrowserType.Safari:
             return <GenericBrowserIcon className={className}/> // Placeholder
        case BrowserType.Edge:
             return <GenericBrowserIcon className={className}/> // Placeholder
        default:
            return <GenericBrowserIcon className={className}/>
    }
}
