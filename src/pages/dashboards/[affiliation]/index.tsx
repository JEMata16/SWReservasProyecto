import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import AffiliateSidebarLayout from "~/layouts/AffiliateSidebarLayout";
import SidebarLayout from "~/layouts/SidebarLayout";
import { api } from "~/utils/api";




const AffiliationPage = () => {
    const {userId} = useAuth();
    const { data: userAffiliation } = api.affiliation.getByUserId.useQuery({ id: userId ?? '' });
    
    
    return (
        <>
        <AffiliateSidebarLayout>
            
        </AffiliateSidebarLayout>
            
        </>
    )
}




export default AffiliationPage;