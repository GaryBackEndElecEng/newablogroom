import Meta from '@/components/meta/meta';
import { MetadataRoute } from 'next';

const meta = new Meta();
const baseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXTAUTH_URL as string : "http://localhost:3000";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const getGenArr = await meta.genSitemapArray({ baseUrl });
    return getGenArr
}