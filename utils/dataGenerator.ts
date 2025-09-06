import { VisitorLog, DeviceType, BrowserType } from '../types';

const locations = ['New York, USA', 'London, UK', 'Tokyo, JP', 'Sydney, AU', 'Paris, FR', 'Berlin, DE', 'Toronto, CA', 'Moscow, RU', 'Mumbai, IN', 'São Paulo, BR'];
const devices = Object.values(DeviceType);
const browsers = Object.values(BrowserType);

// Fix: Add mock data for missing VisitorLog properties to resolve compilation error.
const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Mobile/15E148 Safari/604.1',
];
const referrers = ['https://www.google.com/', 'https://www.producthunt.com/', '(direct)', 'https://news.ycombinator.com/'];
const organizations = ['Google LLC', 'Cloudflare, Inc.', 'Amazon.com, Inc.'];
const asns = ['AS15169', 'AS13335', 'AS16509'];
const timezones = ['America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney'];
const coordinatesList = ['40.7128, -74.0060', '51.5074, -0.1278', '35.6895, 139.6917', '-33.8688, 151.2093'];

const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateRandomIp = (): string => {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
};

export const generateMockLogs = (count: number): VisitorLog[] => {
    const logs: VisitorLog[] = [];
    const now = Date.now();
    for (let i = 0; i < count; i++) {
        const location = getRandomElement(locations);
        // Fix: Add missing properties to the VisitorLog object to match the type definition.
        logs.push({
            id: `log-${i}-${Date.now()}`,
            ipAddress: generateRandomIp(),
            location: location,
            country: location.split(', ')[1],
            device: getRandomElement(devices),
            browser: getRandomElement(browsers),
            timestamp: new Date(now - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 7)), // within the last week
            userAgent: getRandomElement(userAgents),
            referrer: getRandomElement(referrers),
            organization: getRandomElement(organizations),
            asn: getRandomElement(asns),
            timezone: getRandomElement(timezones),
            coordinates: getRandomElement(coordinatesList),
        });
    }
    return logs;
};
