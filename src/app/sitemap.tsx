
import { getErrorMessage } from '@/lib/errorBoundaries';
import prisma from '@/prisma/prismaclient';
import { MetadataRoute } from 'next';


const baseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXTAUTH_URL as string : "http://localhost:3000";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const getGenArr = await genSitemapArray({ baseUrl });
    return getGenArr
}
export async function genSitemapArray(item: { baseUrl: string }): Promise<MetadataRoute.Sitemap> {
    const { baseUrl } = item;
    let arr: MetadataRoute.Sitemap = [];
    const retBaseUrl = baseUrl;
    // console.log(retBaseUrl)//works
    try {
        arr = [
            { url: `${retBaseUrl}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
            { url: `${retBaseUrl}/blogs`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
            { url: `${retBaseUrl}/posts`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
            { url: `${retBaseUrl}/editor`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
            { url: `${retBaseUrl}/profile`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
            { url: `${retBaseUrl}/policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
            { url: `${retBaseUrl}/register`, lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
            { url: `${retBaseUrl}/termsOfService`, lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
            { url: `${retBaseUrl}/signin`, lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
            { url: `${retBaseUrl}/chart`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
        ];
        const blogIds = await prisma.blog.findMany({
            where: { show: true },
            select: { id: true }
        }) as { id: number }[];
        const postIds = await prisma.post.findMany({
            where: { published: true },
            select: { id: true }
        }) as { id: number }[];
        await prisma.$disconnect();
        if (blogIds && blogIds.length > 0) {
            blogIds.map(blog => {
                arr.push({ url: `${retBaseUrl}/blog/${blog.id}`, lastModified: new Date(), changeFrequency: 'always', priority: 1 })
            });
        }
        if (postIds && postIds.length > 0) {
            postIds.map(post => {
                arr.push({ url: `${retBaseUrl}/post/${post.id}`, lastModified: new Date(), changeFrequency: 'always', priority: 1 })
            });
        }

    } catch (error) {
        const msg = getErrorMessage(error)
        console.log(msg);

    } finally {
        return arr;
    }

} 