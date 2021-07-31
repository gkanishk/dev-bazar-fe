
import { Carousel } from 'antd';
import Link from "next/link"
import { useRouter } from 'next/router';

export default function HomePage() {
    const router = useRouter();
    const redirectPage=()=>{
        
        router.push("/products");
    }
    return <>
        <Carousel autoplay className="mt-10 mb-6 cursor-pointer">
            <img src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/6/17/933bd022-7c11-4ef7-a4b5-39ca2988b6d91623945060390-Weekend-sale_DK-2.jpg" onClick={redirectPage} />
            <img src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/7/21/cf6362a6-6110-442d-a6a0-fa588d3d286c1626860682092-M-H_Desk_Banner.jpg" onClick={redirectPage} />
            <img src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/7/20/5bb839f9-fc66-4b39-955a-456e056dccef1626790178167-Dressberry_Desk.jpg" onClick={redirectPage} /> 
        </Carousel>
        <span className="block p-4 my-6 text-3xl font-medium">
            Deal Of the Day:
        </span>
        <Link href="/products">
        <div className="flex flex-row flex-wrap mt-2 space-x-4 cursor-pointer justify-evenly">
        <img className="w-auto mt-3 rounded h-96" src="https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2021/7/28/eefb920e-f613-46e6-859a-ea61343912661627481545766-Denim.jpg" alt="highlist"/>
        <img className="w-auto h-96" src="https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/14/0524cbd5-f034-4155-9e3b-336c4e530ee41605363272658-Home---Levis.jpg" alt="highlight" />
        <img className="w-auto mt-3 rounded h-96" src="https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2021/7/28/9f3448b5-342a-41a1-bbbc-46af4544d8561627481545731-Men---s-Casual.jpg" alt="highlight" />
        <img className="w-auto h-96" src="https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/14/d5c17859-f366-4a65-ab42-5a066254feaa1605363272474-Home---GAP.jpg" alt="highlight" />
        <img className="w-auto mt-3 rounded h-96" src="https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2021/7/28/6c54e558-5e7d-4edc-909e-49109a0f1d381627481545748-flats---heels.jpg" alt="highlight" />
        </div>
        </Link>
        <span className="block p-4 my-6 text-3xl font-medium">
            BIGGEST DEALS ON TOP BRANDS:
        </span>
        <Link href="/products">
        <div className="flex flex-row flex-wrap mt-2 space-x-4 cursor-pointer justify-evenly">
        <img className="w-auto m-2 h-96" src="https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/14/5544cd64-d95b-461d-802a-8025fdfeb3331605363272844-Home---Nike.jpg" alt="highlist"/>
        <img className="w-auto m-2 h-96" src="https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/31/581e2bf6-6d47-4a4b-a11f-43200dc9c6791598892519362-Puma.jpg" alt="highlight" />
        <img className="w-auto m-2 h-96" src="https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/31/64ecc170-58af-473f-8144-b1639895a8291598892519457-Veromodo.jpg" alt="highlight" />
        <img className="w-auto m-2 h-96" src="https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/retaillabs/2020/9/4/e6c7a718-acc0-4aa6-b04c-470ab139d66c1599230080722-F21--4-.jpg" alt="highlight" />
        <img className="w-auto m-2 h-96" src="https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/31/af31285e-f6a3-426e-bbea-0aedef9da17c1598892377537-Tommy-Hilfiger.jpg" alt="highlight" />
        </div>
        </Link>
    </>
}
