import Sidebar from "@/components/Sidebar";
import Header from "@/components/ui/header";
const UserPagesLayout = ({children}: {children: React.ReactNode}) => {

return (
    <div className="min-h-screen w-full bg-white text-black flex flex-col flex-col-1">
        <Header />
        <div className="flex flex-row flex-col-1 max-h-screen y-overflow-hidden">
            <Sidebar />
            {children}
        </div>
    </div>
    )

}

export default UserPagesLayout