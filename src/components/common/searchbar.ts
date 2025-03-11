
import { blogType, postType } from "../editor/Types";
import Nav from "../nav/headerNav";



class Searchbar{
    _blogs:blogType[];
    _posts:postType[];
    
    constructor(item:{blogs:blogType[]|null,posts:postType[]|null}){
        const {blogs,posts}=item;
        this._blogs=blogs ||[] as blogType[];
        this._posts=posts || [] as postType[];
    };
    // ------------GETTERS SETTERS-------//
    get blogs(){
        return this._blogs
    }
    set blogs(blogs:blogType[]){
        this._blogs=blogs;
    }
    get posts(){
        return this._posts;
    }
    set posts(posts:postType[]){
        this._posts=posts;
    }
    // ------------GETTERS SETTERS-------//

    mainBlog(item:{parent:HTMLElement,funcBlog:({blogs}:{blogs:blogType[]})=>Promise<void> | void}):Promise<blogType[]>{
        const {parent,funcBlog}=item;
        const css_col="display:flex;flex-direction:column;align-items:center;justify-content:center;margin:auto;width:100%;margin-block:1rem;"
        const css_row="display:flex;flex-wrap:nowrap;align-items:center;justify-content:center;margin:auto;gap:2rem;"
        const container=document.createElement("div");
        container.id="searchbar-main-container";
        container.style.cssText=css_col + "border-radius:12px;";
        const row=document.createElement("div");
        row.id="container-row";
        row.style.cssText=css_row;
        const searchBox=document.createElement("div");
        searchBox.id="row-searchBox";
        searchBox.style.cssText=css_col + "margin:auto;width:200px;height:50px;box-shadow:1px 1px 12px 1px lightblue;border-radius:6px;";
        const text=document.createElement("h6");
        text.className="text-primary";
        text.style.cssText="margin-inline:0.5rem;margin-block:auto;";
        text.textContent="Search";
        row.appendChild(text);
        row.appendChild(searchBox);
        container.appendChild(row);
        parent.appendChild(container);
        const blogs=this.searchBlogWord({parent:searchBox,funcBlog});//search word input
        return Promise.resolve(blogs) as Promise<blogType[]> ;
    };
    async mainPost(item:{parent:HTMLElement,funcPost:({posts}:{posts:postType[]})=>Promise<void> | void}):Promise<{posts_:postType[],parent:HTMLElement}> {
        const {parent,funcPost}=item;
        let posts_:postType[]=[];
        posts_=this.posts;
        const css_col="display:flex;flex-direction:column;align-items:center;justify-content:center;margin:auto;width:100%;margin-block:1rem;"
        const css_row="display:flex;flex-wrap:nowrap;align-items:center;justify-content:center;margin:auto;gap:2rem;"
        const container=document.createElement("div");
        container.id="searchbar-main-container";
        container.style.cssText=css_col + "border-radius:12px;";
        parent.appendChild(container);
        if(posts_.length===0){
            const text=document.createElement("h6");
            text.className="text-primary text-center";
            text.innerHTML="No Posts, check back later,,<pre><br>  sorry about this</pre>";
            container.appendChild(text);
        }else{

            const row=document.createElement("div");
            row.id="container-row";
            row.style.cssText=css_row;
            const searchBox=document.createElement("div");
            searchBox.id="row-searchBox";
            searchBox.style.cssText=css_col + "margin:auto;width:200px;height:50px;box-shadow:1px 1px 12px 1px lightblue;border-radius:6px;";
            const text=document.createElement("h6");
            text.className="text-primary";
            text.style.cssText="margin-inline:0.5rem;margin-block:auto;";
            text.textContent="Search";
            row.appendChild(text);
            row.appendChild(searchBox);
            container.appendChild(row);
            const posts=await this.searchPostWord({parent:searchBox,funcPost});//search word input
            return Promise.resolve({posts_:posts,parent}) as Promise<{posts_:postType[],parent:HTMLElement}>;
        };
        return Promise.resolve({posts_,parent}) as Promise<{posts_:postType[],parent:HTMLElement}>;
    };


    getKeyWords(item:{blog:blogType}){
        const {blog}=item;
        let words:string[]=[];
        const title=blog.title || "no title";
        const desc:string[]|undefined= blog.desc?.split(" ") || [];
        words.push(title)
        words= words.concat(desc)
        return words
    }

    searchBlogWord(
        item:{
        parent:HTMLElement,
        funcBlog:({blogs}:{blogs:blogType[]})=>Promise<void> | void
    }

    ){
        const {parent,funcBlog}=item;
        const {input,label,formGrp}=Nav.inputComponent(parent);
        let blog_s:blogType[]=this.blogs;
        label.textContent="title";
        formGrp.className="mx-auto px-0 py-0 my-0";
        formGrp.id="formGrp";
        label.id="searchWord-labe-input";
        input.id="searchWord-input";
        input.name="input";
        input.placeholder="title search";
        label.setAttribute("for",input.id);
        input.oninput=(e:Event)=>{
            if(e){
                const word=(e.currentTarget as HTMLInputElement).value;
                const mainBlogs=this.blogs.toSorted((a,b)=>{if(a.rating > b.rating) return -1;return 1});
                const nameBlogs=mainBlogs.filter(bl=>(bl.title?.toLowerCase().includes(word.toLowerCase())));
                blog_s=nameBlogs;
                funcBlog({blogs:blog_s})
                return blog_s.sort((a,b)=>{if(a.rating > b.rating) return -1;return 1});
                
            }
        };
        funcBlog({blogs:blog_s});
        return blog_s
    };


    async searchPostWord(
        item:{
        parent:HTMLElement,
        funcPost:({posts}:{posts:postType[]})=>Promise<void> | void
    }
    ){
        const {parent,funcPost}=item;
        const {input,label,formGrp}=Nav.inputComponent(parent);
        let post_s:postType[]=this.posts;
        label.textContent="title";
        formGrp.className="mx-auto px-0 py-0 my-0";
        formGrp.id="formGrp";
        label.id="searchWord-labe-input";
        input.id="searchWord-input";
        input.name="input";
        label.setAttribute("for",input.id);
        input.placeholder="title search";
        await funcPost({posts:post_s});
        input.oninput=async(e:Event)=>{
            if(e){
                const word=(e.currentTarget as HTMLInputElement).value;
                const mainBlogs=this.posts.toSorted((a,b)=>{if(a.likes > b.likes) return -1;return 1});
                const nameBlogs=mainBlogs.filter(bl=>(bl.title?.toLowerCase().includes(word.toLowerCase())));
                post_s=nameBlogs;
                await funcPost({posts:post_s})
                return post_s.toSorted((a,b)=>{if(a.likes > b.likes) return -1;return 1});
                
            }
        };
        return post_s
    };
}
export default Searchbar