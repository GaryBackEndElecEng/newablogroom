import type { Metadata,ResolvingMetadata,MetadataRoute } from 'next';
import {PrismaClient } from '@prisma/client';
import { awsImage, getAllBlogImages, getOnlyBlogImages, getUserImage, getUsersImage } from '@/lib/awsFunctions';
import { blogType, postType, userType } from '../editor/Types';
import { getErrorMessage } from '@/lib/errorBoundaries';

const prisma=new PrismaClient();
export type Props = {
  params: {id:string },
  // searchParams: { [key: string]: string | string[] | undefined }
}
export type getBlogType={
  image: string,
  name: string,
  title:string,
  desc: string | undefined,
  user_id:string
}|null

const baseUrl=process.env.NODE_ENV !== 'production' ? process.env.NEXTURL as string : "http://localhost:3000";

class Meta{
    pages:{page:string,redir:RegExp,match:RegExp}[];
     isExist:boolean=false;
     domain:string;
     url:URL;
    params:string[];
    baseUrl:string;
    savegetblog:string;
    getusers:string;
    getblog:string;
    getposts:string;
    constructor(){
      //BELOW PAGES HELPS REDIRECT THE PAGE TO THE ERROR_PAGE IF THE PAGE DOES NOT EXIST
        this.pages=[
          {page:'/az',redir:/\/[a-z]{1,3}\//,match:/\//},
          {page:'/blog/',redir:/\/(blog)\/[0-9]+[a-z\/]+/,match:/\/(blog)\/[0-9]+/},
          {page:'/blogs',redir:/\/(blogs)[a-zA-Z\/]+/,match:/\/(blogs)/},
          {page:"/register",redir:/\/(register)[a-zA-Z\/]+/,match:/\/(register)/},
          {page:"/editor",redir:/\/(editor)[a-zA-Z\/]+/,match:/\/(editor)/},
          {page:"/policy",redir:/\/(policy)[a-zA-Z\/]+/,match:/\/(policy)/},
          {page:"/termsOfService",redir:/\/(termsOfService)[a-zA-Z\/]+/,match:/\/(termsOfService)/},
          {page:"/admin",redir:/\/(admin)[a-zA-Z\/]+/,match:/\/(admin)/},
          {page:"/error_page",redir:/\/(error_page)[a-zA-Z\/]+/,match:/\/(error_page)/},
          {page:"/posts",redir:/\/(posts)[a-zA-Z\/]+/,match:/\/(posts)/},

        ]
        this.params=["blog_id","misc","intent"];
        this.savegetblog="/api/savegetblog";//needs FULL HTTP PATH!!!
        this.getusers="/api/getusers"; //needs FULL HTTP PATH!!!
        this.baseUrl=baseUrl;
        this.getblog=this.baseUrl + "/api/blog";
        this.getposts="/api/posts";
        
    }
     checkPathname(){
      const url=new URL(window.location.href);
      const pathname=url.pathname;
      this.pages.map(page=>{
        if((page.redir.test(pathname))){
          const newUrl=new URL(`/error_page?misc=${pathname}&intent=${page.page}`,url.origin);
          window.location.replace(newUrl.href);
        }
      });
     
  }

     metaBlogs():Metadata{
        const kwords=[ "comments and messages", "comments", "ask Us something", "helping you connect", " message board"];
        const metadata:Metadata ={
            title: {
                default: "blogs",
                template: `%s | blogs`,
            
            },
           
            
            description: "Comment page",
            keywords:kwords,
            
            alternates: {
                canonical: "/blogs",
                languages: {
                "en-US": "/en-US",
                "fr-CA": "/fr-CA"
                }
            },
            openGraph: {
                title: "Blogs",
                description: 'blogs',
                url: "/blogs",
                images: [
                {
                    url: "/images/gb_logo.png",
                    width: 300,
                    height: 300
                },
                {
                    url: "/images/display/symetric.png",
                    width: 400,
                    height: 300
                },
                {
                    url: "https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/logoLarge.png",
                    width: 600,
                    height: 900
                },
                ],
          }
        }
        return metadata;
    }
     metaPosts():Metadata{
        const kwords=[ "comments and messages", "posts", "Free Posts", "publisize your thoughts", "Happy Posts"];
        const metadata:Metadata ={
            title: {
                default: "posts",
                template: `%s | posts`,
            
            },
            description: "Post page",
            keywords:kwords,
            
            alternates: {
                canonical: "/posts",
                languages: {
                "en-US": "/en-US",
                "fr-CA": "/fr-CA"
                }
            },
            openGraph: {
                title: "Posts",
                description: 'Quick and Free Posts for you',
                url: "/blogs",
                images: [
                {
                    url: "/images/gb_logo.png",
                    width: 300,
                    height: 300
                },
                {
                    url: "/images/display/symetric.png",
                    width: 400,
                    height: 300
                },
                {
                    url: "https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/logoLarge.png",
                    width: 600,
                    height: 900
                },
                ],
          }
        }
        return metadata;
    }
     metaHome(item:{baseUrl:string}):Metadata{
      const {baseUrl}=item;
        return {
            metadataBase:new URL(baseUrl),
            alternates: {
              canonical: '/',
              languages: {
                'en-US': '/en-US',
                'fr-CA': '/fr-CA',
              },
            },
            title: {
              default: "ablogroom",
              template: `%s | ablogroom`,
          
            },
            verification: {
              google: 'S88O7lTinqgyYLB8h1x2fOusiDQY9V68xuDpUZevLQY',
              yandex: 'yandex',
              yahoo: 'yahoo',
              other: {
                name: ['masterconnect919@gmail.com', 'https://www.masterconnect.ca/contact'],
              },
            },
            category:"blog",
            description: 'Generated by www.masterconnect.ca,Free Blog Creation for you. It provides templates that the user can use to become an effective blogger. The Blog Room has all the effective tools for the blogger to fine-tune their skills in blogging.',
            generator: "Next.js",
            applicationName: "ablogroom",
            referrer: "origin-when-cross-origin",
            keywords: ["The Blog Room, Free to use", "blogs for you", "web info", "free blog posts", " The World is Your Oyster", " Create Your Own Blog", "Gary's Blogs"],
            authors: [{ name: "Gary Wallace", url: "https://www.masterconnect.ca" }],
            // colorScheme:"light",
            creator: "Gary Wallace",
            publisher: "Gary Wallace",
            formatDetection: {
              email: true,
              address: false,
              telephone: true
            },
            openGraph: {
              title: "ablogroom",
              description: 'Generated by www.masterconnect.ca,tools for you',
              url: this.baseUrl,
              siteName: "ablogroom",
              images: [
                {
                  url: "/images/gb_logo_600.png",
                  width: 600,
                  height: 600
                },
                {
                  url: "/images/gb_logo_800_400.png",
                  width: 800,
                  height: 400
                },
              ],
              locale: "en-CA",
              type: "website"
          
            },
            robots: {
              index: false,
              follow: true,
              nocache: false,
              googleBot: {
                index: true,
                follow: false,
                noimageindex: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
              },
            },
            icons: {
                icon: '/icon.png',
                shortcut: '/icon.png',
                apple: '/icon.png',
                other: {
                  rel: 'apple-touch-icon-precomposed',
                  url: '/icon.png',
                },
            },
            appleWebApp: {
              title: 'A Blog room',
              statusBarStyle: 'black-translucent',
              startupImage: [
                '/assets/startup/apple-touch-startup-image-768x1025.png',
                {
                  url: '/images/gb_logo768x1025.png',
                  media: '(device-width: 768px) and (device-height: 1024px)',
                },
              ],
            },
          }
    }
     metaBlog():Metadata{
        return {
            title: {
              default: "blog",
              template: `%s | blog`,
          
            },
            
          
            description: ' blog page:Generated by www.masterconnect.ca,Free Blog Creation for you. It provides templates that the user can use to become an effective blogger.',
            generator: "Next.js",
            applicationName: "ablogroom",
            referrer: "origin-when-cross-origin",
            keywords: ["The Blog Room, Free to use", "blogs for you", "web info", "free blog posts", " The World is Your Oyster", " Create Your Own Blog", "Gary's Blogs"],
            authors: [{ name: "Gary Wallace", url: "https://www.masterconnect.ca" }],
            // colorScheme:"light",
            creator: "Gary Wallace",
            publisher: "Gary Wallace",
            formatDetection: {
              email: true,
              address: false,
              telephone: true
            },
            openGraph: {
              title: "ablogroom",
              description: 'Generated by www.masterconnect.ca,tools for you',
              url: "https://www.ablogroom.ca",
              siteName: "ablogroom",
              images: [
                {
                  url: "/images/gb_logo.png",
                  width: 600,
                  height: 600
                },
                {
                  url: "https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/masterUltils800_400.png",
                  width: 800,
                  height: 400
                },
              ],
              locale: "en-CA",
              type: "website"
          
            },
            robots: {
              index: false,
              follow: true,
              nocache: false,
              googleBot: {
                index: true,
                follow: false,
                noimageindex: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
              },
            },
            icons: {
                icon: '/icon.png',
                shortcut: '/icon.png',
                apple: '/icon.png',
                other: {
                  rel: 'apple-touch-icon-precomposed',
                  url: '/icon.png',
                },
            },
            viewport: {
              width: 'device-width',
              initialScale: 1,
              maximumScale: 1,
            },
          
            appleWebApp: {
              title: 'Apple Web App',
              statusBarStyle: 'black-translucent',
              startupImage: [
                '/assets/startup/apple-touch-startup-image-768x1025.png',
                {
                  url: '/assets/startup/apple-touch-startup-image-1536x2051.png',
                  media: '(device-width: 768px) and (device-height: 1024px)',
                },
              ],
            },
          
          
          }
    }
     metaChart():Metadata{
      const kwords=[ "custom charts", "realtime climate change", "make your own graph", "helping you connect", "free Graph making"];
      const metadata:Metadata ={
          title: {
              default: "chart",
              template: `%s | chart`,
          
          },
          description: "create a Chart",
          keywords:kwords,
          
          alternates: {
              canonical: "/chart",
              languages: {
              "en-US": "/en-US",
              "fr-CA": "/fr-CA"
              }
          },
          openGraph: {
              title: "Charts",
              description: 'Customize your chart, free for all',
              url: "/chart",
              images: [
              {
                  url: "/images/gb_logo.png",
                  width: 300,
                  height: 300
              },
              {
                  url: "/images/display/symetric.png",
                  width: 400,
                  height: 300
              },
              {
                  url: "https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/logoLarge.png",
                  width: 600,
                  height: 900
              },
              ],
        }
      }
      return metadata;
    }
     metaEditor():Metadata{
      const kwords=[ "Best Blog Builder in Canada","customize your Blog", "Dynamic Blog/Website editor", "Free Web/Blog builder", "helping you connect through Blogging", "Best in Canada"];
      const metadata:Metadata ={
          title: {
              default: "Editor",
              template: `%s | Editor`,
          
          },
          description: "Build your Blog",
          keywords:kwords,
          
          alternates: {
              canonical: "/editor",
              languages: {
              "en-US": "/en-US",
              "fr-CA": "/fr-CA"
              }
          },
          openGraph: {
              title: "Editor",
              description: 'Customize your Blog, free for all',
              url: "/editor",
              images: [
              {
                  url: "/images/gb_logo.png",
                  width: 300,
                  height: 300
              },
              {
                  url: "/images/display/symetric.png",
                  width: 400,
                  height: 300
              },
              {
                  url: "/images/feature/profile.png",
                  width: 600,
                  height: 900
              },
              ],
        }
      }
      return metadata;
    }
     async genBlogs(): Promise<{keywords: string[],descs: string[],images:string[]}|undefined>{
        const option={
          headers:{"Content-Type":"application/json"},
          method:"GET"
        }
        return fetch(this.savegetblog,option).then(async(res)=>{
          if(res){
            const blogNames= await res.json() as blogType[];
            const constrainBlogs=blogNames ? blogNames.filter(blog=>(blog.rating > 2)) as blogType[]:[] as blogType[];
            const blogsWithimages=constrainBlogs? await getAllBlogImages(constrainBlogs):[] as blogType[];
            const images=blogsWithimages ? blogsWithimages.map(bl=>(bl.img)).filter(img=>(img !=="undefined")) as string[] :["/images/gb_logo.png"];
            const keywords=constrainBlogs ? constrainBlogs.map(name=>(name.title as string)) :["blogs"];
            const descs=constrainBlogs ? constrainBlogs.map(name=>((name.desc as string).slice(0,20))):["blogs"];
            return {keywords,descs,images}
          }
        });
    }
     async genUsers(): Promise<{
      images: (string | undefined)[];
      bios: (string | undefined)[];
      names: (string | undefined)[];
  }>{
    const option={
      headers:{"Content-Type":"application/json"},
      method:"GET"
    };
    return fetch(this.getusers,option).then(async(res)=>{
      if(res){
        const users= await res.json() as userType[]
        const images=users ? users.map(us=>(us.image)).filter(im=>(im !=="undefined")) : [] as string[];
        const bios=users ? users.map(us=>(us.bio)).filter(bi=>(bi !=="undefined")):["users bio"];
        const names=users ? (users.map(us=>(us.name))).filter(name=>(name!==undefined)):["Gary Wallace"];
        return {images,bios,names};
      }else{
        return {images:[] as string[],bios:[] as string[],names:[] as string[]}
      }
    });
      
    }
     async getUser(user_id:string):Promise<{
      image_: string,
      bio: string,
      author:{name: string,url:string},
      email: string
  }>{
    const option={
      headers:{"Content-Type":"application/json"},
      method:"GET"
    };
   
    let author:{ name:string, url:string }={name:"ablogroom",url:"https://www.ablogroom.com"}
    return fetch(`http://localhost:3000/api/getusers?user_id=${user_id}`,option).then(async(res)=>{
      if(res){
        const newUser=await res.json() as userType;
        const image_=newUser.image ? newUser.image :"/images/gb_logo.png";
        const bio=newUser.bio ? newUser.bio :" not included";
         author={name:newUser.name as string,url:"/blog"};
        const email=newUser.showinfo ? newUser.email :"masterconnect919@gmail.com";
        return {image_:image_,bio:bio,author,email:email}
      }else{
        return {image_:"noShow@noShow",bio:"no show user",author,email:""}
      }
    });
    }
     async getBlog(item:{blog_id:number,baseUrl:string}): Promise<getBlogType>{
      const {blog_id,baseUrl}=item;
      console.log("BASEURL",baseUrl)
      if(!blog_id) return {image:"",name:"",desc:"",user_id:"",title:""};
      const option={
        headers:{"Content-Type":"application/json"},
        method:"GET"
      };
      let image:string= "/images/gb_logo.png";
      let name:string= "ablogroom";
      let title:string="no Title";
      let desc:string="no desc";
      let user_id:string="";
      return fetch(`http://localhost:3000/api/blog/${blog_id}`,option).then(async(res)=>{
        if(res){
          const blog= await res.json() as blogType;
          const newBlog=blog ? await getOnlyBlogImages(blog as unknown as blogType): {} as blogType;
          image=newBlog && newBlog.img ? newBlog.img :"/images/gb_logo.png"
          name=newBlog && newBlog.name ? newBlog.name : "ablogroom";
          title=newBlog && newBlog.title ? newBlog.title : "no Title";
          desc=(newBlog && newBlog.desc) ? newBlog.desc : "no desc";
          user_id=(newBlog && newBlog.user_id) ? newBlog.user_id as string: "";
        }
        return {image,name,desc,user_id,title};
      });
    }

    //--------------------------FOR PRISMA POSTS-----------------------------//
     
  
    async retPostsMetadata(item: {parent: ResolvingMetadata}): Promise<Metadata> {
      const { parent } = item;
      const par= await parent ? await parent : undefined;
      const url=par && par.metadataBase ? par.metadataBase.origin :"https://www.ablogroom.com";
      const initKeywords = ["The Blog Room, Free to use", "blogs for you", "web info", "free blog posts", " The World is Your Oyster", " Create Your Own Blog", "Gary's Blogs"];
      const posts =await prisma.post.findMany({where:{published:true},select:{title:true,content:true,imageKey:true}}) as postType[];
      await prisma.$disconnect();
      const images=(posts && posts.length>0) ? await Promise.all(posts.slice(0,2).map(async(post)=>({url:post.imageKey ? await awsImage(post.imageKey) : "/images/gb_logo.png"} ))) : [];
      const keywords=(posts && posts.length>0) ? posts.map(post=>(post.title)) : [];
      const initImgs: { url: string}[] = [
          {
              url: "/images/gb_logo.png"
          },
          {
              url: "https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/masterUltils800_400.png"
          },
      ];
      const initAuthors = [{ name: "Gary Wallace", url: "https://www.masterconnect.ca" }]
  
      const metaReturn: Metadata = {
          title: {
              default: "ablogroom Posts",
              template: `%s | "ablogroom Posts"}`,
  
          },
  
          description: ' Free Blogs by ABLOGROOM -Blogs Creation by Bloggers for You. It provides templates that the user can use to become an effective blogger.',
          generator: "ablogroom using Next.js",
          referrer: "origin-when-cross-origin",
          keywords: keywords ? keywords.concat(initKeywords) : initKeywords,
          authors: initAuthors,
          // colorScheme:"light",
          openGraph: {
              title: "ablogroom",
              description: 'Generated by www.masterconnect.ca,tools for you',
              url: url,
              siteName: "ablogroom",
              images: images ? images.concat(initImgs) : initImgs,
  
          },
          
      }
      return metaReturn;
    }
    //--------------------------FOR PRISMA POSTS-----------------------------//
    
     async genSitemapArray(item:{baseUrl:string}):Promise<MetadataRoute.Sitemap>{
      const {baseUrl}=item;
      let arr:MetadataRoute.Sitemap=[];
      let arr2:MetadataRoute.Sitemap=[];
      const retBaseUrl=this.sitmapCheckUrl({url:baseUrl});
      try {
        arr=[
          {url:`${retBaseUrl}`,lastModified:new Date(),changeFrequency:'weekly',priority:1},
          {url:`${retBaseUrl}/blogs`,lastModified:new Date(),changeFrequency:'daily',priority:1},
          {url:`${retBaseUrl}/posts`,lastModified:new Date(),changeFrequency:'daily',priority:1},
          {url:`${retBaseUrl}/editor`,lastModified:new Date(),changeFrequency:'weekly',priority:1},
          {url:`${retBaseUrl}/policy`,lastModified:new Date(),changeFrequency:'monthly',priority:1},
          {url:`${retBaseUrl}/register`,lastModified:new Date(),changeFrequency:'yearly',priority:1},
          {url:`${retBaseUrl}/termsOfService`,lastModified:new Date(),changeFrequency:'yearly',priority:1},
          {url:`${retBaseUrl}/signin`,lastModified:new Date(),changeFrequency:'yearly',priority:1},
          {url:`${retBaseUrl}/chart`,lastModified:new Date(),changeFrequency:'monthly',priority:1},
        ];
        const option={
          headers:{"Content-Type":"application/json"},
          method:"GET"
        }
        arr2= await fetch(this.savegetblog,option).then(async(res)=>{
          if(res){
            const blogs= await res.json() as blogType[];
            blogs.map(blog=>{
              arr.push({url:`${baseUrl}/blog/${blog.id}`,lastModified:new Date(),changeFrequency:'always',priority:1})
            });
            return arr;
          }
          return arr
        });
       
      } catch (error) {
        const msg=getErrorMessage(error)
        console.log(msg);
        
      }finally{
        return arr2;
      }

    }
    
    sitmapCheckUrl(item:{url:string}){
      const {url}=item;
      //https://main.d2qer3lk2obzqm.amplifyapp.com/
      const reg:RegExp=/(https\:\/\/main\.)/;
      const len=url.length;
      if(reg.test(url)){
        return url.split("").slice(0,len-1).join("");
      }
      return url;
    }
    

    //--------------------------------------PRISMA-FOR BLOGS--------------------------//
    
    async generate_blogs_meta(item: { parent: ResolvingMetadata }): Promise<Metadata> {
      const { parent } = item;
      const logo = "/images/gb_logo.png";
      const par = (await parent) ? (await parent) : undefined;
      const url = par && par.metadataBase && par.metadataBase.origin ? par.metadataBase.origin : "https://www.ablogroom.com";
      const blogs = await prisma.blog.findMany({ where: { show: true } }) as blogType[];
      const users = await prisma.user.findMany({ where: { showinfo: true } }) as userType[];
      await prisma.$disconnect();
      const titles: string[] = blogs.map(blog => (blog.title ? blog.title : "no title"));
      const authors = users.map(user => ({ name: user.name ? user.name : "blogger", url }));
      const imagesOnly = await Promise.all(blogs.map(async (blog) => (blog.imgKey ? await awsImage(blog.imgKey) : `${url}${logo}`)));
      const images = imagesOnly.map(img => {
          return {
              url: img,
              width: 600,
              height: 600
          }
      });
      return await this.retBlogsMetadata({ keywords: titles, images, url, authors })
  };
  
  async  retBlogsMetadata(item: { 
    keywords: string[] | undefined,
     images: { url: string, width: number, height: number }[] | undefined,
     url: string | undefined,
     authors: { name: string, url: string }[] | undefined
   }): Promise<Metadata> {
      const { keywords, images, url, authors } = item;
      const initKeywords = ["The Blog Room, Free to use", "blogs for you", "web info", "free blog posts", " The World is Your Oyster", " Create Your Own Blog", "Gary's Blogs"];
      const initImgs: { url: string, width: number, height: number }[] = [
          {
              url: "/images/gb_logo.png",
              width: 600,
              height: 600
          },
          {
              url: "https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/masterUltils800_400.png",
              width: 800,
              height: 400
          },
      ];
      const initAuthors = [{ name: "Gary Wallace", url: "https://www.masterconnect.ca" }];
  
      const metaReturn: Metadata = {
          title: {
              default: "ablogroom Blogs",
              template: `%s | ablogroom Blog`
            },
          description: ' Free Blogs by ABLOGROOM -Blogs Creation by Bloggers for You. It provides templates that the user can use to become an effective blogger.',
          generator: "ablogroom using Next.js",
          referrer: "origin-when-cross-origin",
          keywords: keywords ? keywords.concat(initKeywords) : initKeywords,
          authors: authors ? authors.concat(initAuthors) : initAuthors,
          // colorScheme:"light",
          openGraph: {
              title: "ablogroom",
              description: 'Generated by www.masterconnect.ca,tools for you',
              url: url ? url : "www.ablogroom.com",
              siteName: "ablogroom",
              images: images ? images.concat(initImgs) : initImgs,
          },
  
      }
      return new Promise((resolve) => {
          resolve(metaReturn)
      }) as Promise<Metadata>;
  }
  //--------------------------------------PRISMA-FOR BLOGS--------------------------//
  //--------------------------------------PRISMA-FOR BLOG/ID--------------------------//
  async genMetadata(item: { id: number, parent: ResolvingMetadata }): Promise<Metadata> {
    const { id, parent } = item;
    const par = (await parent);
    const blog = await prisma.blog.findUnique({
        where: { id }
    }) as blogType;
    const title = blog && blog.title ? blog.title as string : "Ablogroom blogs";
    const keywds = blog && blog.desc ? this.genKeywords({ desc: blog.desc, title }) : [];
    const url = (par && par.metadataBase && par.metadataBase.origin) ? par.metadataBase.origin : "www.ablogroom.com";
    const user = blog ? await prisma.user.findUnique({
        where: { id: blog.user_id }
    }) : null;
    const authors = user ? [{ name: user.name as string, url }] : undefined
    await prisma.$disconnect();
    return this.retMetadata({ title, keywords: keywds, images: undefined, url, authors });

}
  retMetadata(item: { title: string | undefined, keywords: string[] | undefined, images: { url: string, width: number, height: number }[] | undefined, url: string | undefined, authors: { name: string, url: string }[] | undefined }): Promise<Metadata> {
    const { title, keywords, images, url, authors } = item;
    const initKeywords = ["The Blog Room, Free to use", "blogs for you", "web info", "free blog posts", " The World is Your Oyster", " Create Your Own Blog", "Gary's Blogs"]
    const initImgs: { url: string, width: number, height: number }[] = [
        {
            url: "/images/gb_logo.png",
            width: 600,
            height: 600
        },
        {
            url: "https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/masterUltils800_400.png",
            width: 800,
            height: 400
        },
    ];
    const initAuthors = [{ name: "Gary Wallace", url: "https://www.masterconnect.ca" }]

    const metaReturn: Metadata = {
        title: {
            default: title ? title : "ablogroom blog",
            template: `%s | ${title ? title : "ablogroom blog"}`,

        },

        description: ' blog page:Generated by www.masterconnect.ca,Free Blog Creation for you. It provides templates that the user can use to become an effective blogger.',
        generator: "ablogroom using Next.js",
        referrer: "origin-when-cross-origin",
        keywords: keywords ? keywords.concat(initKeywords) : initKeywords,
        authors: authors ? authors.concat(initAuthors) : initAuthors,
        creator: "Gary Wallace",
        publisher: "ablogrrom",
        formatDetection: {
            email: true,
            address: false,
            telephone: true
        },
        openGraph: {
            title: "ablogroom",
            description: 'Generated by www.masterconnect.ca,tools for you',
            url: url ? url : "www.ablogroom.com",
            siteName: "ablogroom",
            images: images ? images.concat(initImgs) : initImgs,
        },
    }
    return new Promise((resolve) => {
        resolve(metaReturn)
    }) as Promise<Metadata>;
}
   genKeywords(item: { desc: string, title: string }):string[] {
    const { desc, title } = item;
    const words_: string[] = [title];
    const words = desc.split(" ");
    let i = 3;
    words.map((word, index) => {
        if (index > i && word.length > 2) {
            i = index - 3;
            const section = words.slice(i, index).join(" ");
            words_.push(section)
            i = index + 3;
        }
    });
    return words_;
}
  //--------------------------------------PRISMA-FOR BLOG/ID--------------------------//
    
}
export default Meta;

