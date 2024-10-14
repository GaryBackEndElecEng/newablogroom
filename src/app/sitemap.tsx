import Meta from '@/components/meta/meta';
import { MetadataRoute } from 'next';


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const getGenArr = await Meta.genSitemapArray();
    return getGenArr
}