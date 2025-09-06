// Fix: Add DeviceType and BrowserType enums to resolve compilation errors in unused components.
export enum DeviceType {
    Desktop = 'Desktop',
    Mobile = 'Mobile',
    Tablet = 'Tablet',
}

export enum BrowserType {
    Chrome = 'Chrome',
    Firefox = 'Firefox',
    Safari = 'Safari',
    Edge = 'Edge',
    Other = 'Other',
}

export interface VisitorLog {
    id: string;
    ipAddress: string;
    location: string;
    country: string;
    timestamp: Date;
    // Fields for detail modal
    userAgent: string;
    referrer: string;
    organization: string;
    asn: string;
    timezone: string;
    coordinates: string;
    // Fix: Add optional device and browser properties to resolve errors in the mock data generator.
    // These are optional because the live API data does not provide them.
    device?: DeviceType;
    browser?: BrowserType;
}

export type SortableField = 'ipAddress' | 'country' | 'location' | 'timestamp';

export type SortDirection = 'ascending' | 'descending';

export interface SortConfig {
    key: SortableField;
    direction: SortDirection;
}