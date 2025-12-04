
import HeaderGlobalComponent from './_components/header-global-component'
import FooterGlobalComponent from './_components/footer-global-component'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <HeaderGlobalComponent />
            <main>
                {children}
            </main>
            <FooterGlobalComponent />
        </div>
    )
}

export default MainLayout