

export default function Layout ({children}:{children:React.ReactNode}){
    return (
        <div className="flex m-auto gap-6">
        {children}
        </div>
    )
}