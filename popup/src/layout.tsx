import { PropsWithChildren, ReactNode } from "react";
import Footer from "./components/Footer";
import { VStack } from "@chakra-ui/react";

interface LayoutProps {
  header: ReactNode;
  children: ReactNode;
  includeFooter?: boolean;
}

function Layout({ children, header, includeFooter = true }: LayoutProps) {
  return (
    <VStack width="360px" height="600px" padding="16px">
      {header}
      {children}
      {includeFooter && <Footer />}
    </VStack>
  );
}

export default Layout;
